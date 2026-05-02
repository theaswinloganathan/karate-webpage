require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Razorpay = require('razorpay');

const app = express();
app.use(cors({
  origin: true, // Allow all origins in dev
  credentials: true
}));
app.use(express.json());

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummykey',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummysecret'
});

// Database setup
const db = new sqlite3.Database('./academy.db', (err) => {
  if (err) console.error(err.message);
  else console.log('Connected to SQLite database.');
});

db.serialize(() => {
  // Create tables
  db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    belt_level TEXT,
    program TEXT,
    join_date TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT,
    student_id INTEGER,
    FOREIGN KEY(student_id) REFERENCES students(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    date TEXT,
    status TEXT,
    FOREIGN KEY(student_id) REFERENCES students(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS fees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    amount INTEGER,
    due_date TEXT,
    status TEXT,
    FOREIGN KEY(student_id) REFERENCES students(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_id TEXT,
    student_id INTEGER,
    amount INTEGER,
    date TEXT,
    program TEXT,
    FOREIGN KEY(student_id) REFERENCES students(id)
  )`);

  // Force reset/ensure default accounts
  const masterHash = bcrypt.hashSync('master123', 10);
  db.run("INSERT OR REPLACE INTO users (id, username, password, role) VALUES (1, 'master', ?, 'master')", [masterHash]);
  
  const meeHash = bcrypt.hashSync('123456', 10);
  db.run("INSERT OR REPLACE INTO users (id, username, password, role, student_id) VALUES (3, 'mee', ?, 'student', 3)", [meeHash]);
});

// Middleware
const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'secret');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

const isMaster = (req, res, next) => {
  if (req.user.role !== 'master') return res.status(403).json({ error: 'Requires master role' });
  next();
};

// --- AUTH ROUTES ---
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt for username:', username);
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) {
      console.error('DB Error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    if (!user) {
      console.log('User not found:', username);
      return res.status(400).json({ error: 'User not found' });
    }
    
    const validPass = bcrypt.compareSync(password, user.password);
    if (!validPass) {
      console.log('Invalid password for user:', username);
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role, student_id: user.student_id }, process.env.JWT_SECRET || 'secret');
    res.json({ token, role: user.role, student_id: user.student_id });
  });
});

// --- MASTER ROUTES ---
app.get('/api/students', auth, isMaster, (req, res) => {
  db.all("SELECT students.*, users.username FROM students LEFT JOIN users ON students.id = users.student_id", [], (err, rows) => {
    res.json(rows);
  });
});

app.post('/api/students', auth, isMaster, (req, res) => {
  const { name, belt_level, program, username, password } = req.body;
  const join_date = new Date().toISOString().split('T')[0];
  
  db.run("INSERT INTO students (name, belt_level, program, join_date) VALUES (?, ?, ?, ?)", 
    [name, belt_level, program, join_date], 
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      const student_id = this.lastID;
      
      const hash = bcrypt.hashSync(password, 10);
      db.run("INSERT INTO users (username, password, role, student_id) VALUES (?, ?, 'student', ?)", 
        [username, hash, student_id]);
      
      // Default fee entry
      let amount = 1000;
      if (program === 'Beginner') amount = 1200;
      else if (program === 'Advanced') amount = 1500;
      
      db.run("INSERT INTO fees (student_id, amount, due_date, status) VALUES (?, ?, ?, 'pending')", 
        [student_id, amount, join_date]);

      res.json({ id: student_id, name });
    });
});

app.put('/api/students/:id/belt', auth, isMaster, (req, res) => {
  db.run("UPDATE students SET belt_level = ? WHERE id = ?", [req.body.belt_level, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.delete('/api/students/:id', auth, isMaster, (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM users WHERE student_id = ?", [id]);
  db.run("DELETE FROM fees WHERE student_id = ?", [id]);
  db.run("DELETE FROM attendance WHERE student_id = ?", [id]);
  db.run("DELETE FROM payments WHERE student_id = ?", [id]);
  db.run("DELETE FROM students WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.get('/api/fees/all', auth, isMaster, (req, res) => {
  db.all(`SELECT fees.*, students.name FROM fees JOIN students ON fees.student_id = students.id`, [], (err, rows) => {
    res.json(rows);
  });
});

// --- STUDENT ROUTES ---
app.get('/api/student/profile', auth, (req, res) => {
  if (req.user.role !== 'student') return res.status(403).json({ error: 'Student only' });
  db.get("SELECT * FROM students WHERE id = ?", [req.user.student_id], (err, student) => {
    if (err || !student) return res.status(404).json({ error: 'Not found' });
    
    db.get("SELECT * FROM fees WHERE student_id = ? ORDER BY id DESC LIMIT 1", [req.user.student_id], (err, fee) => {
      res.json({ ...student, fee });
    });
  });
});

app.get('/api/student/payments', auth, (req, res) => {
  db.all("SELECT * FROM payments WHERE student_id = ? ORDER BY id DESC", [req.user.student_id], (err, rows) => {
    res.json(rows);
  });
});

// --- PAYMENT ROUTES ---
app.post('/api/create-order', auth, async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // amount in paisa
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/verify-payment', auth, (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, program } = req.body;
  // In a real app, verify signature using crypto here
  
  db.run("INSERT INTO payments (transaction_id, student_id, amount, date, program) VALUES (?, ?, ?, ?, ?)", 
    [razorpay_payment_id, req.user.student_id, amount, new Date().toISOString(), program], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      
      db.run("UPDATE fees SET status = 'paid' WHERE student_id = ?", [req.user.student_id]);
      res.json({ success: true, payment_id: this.lastID });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
