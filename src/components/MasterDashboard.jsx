import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Users, IndianRupee, CalendarCheck, TrendingUp, Bell, FileText, 
  Search, Filter, CheckCircle, XCircle, MessageCircle, Download, 
  UserPlus, Edit, Trash2, LogOut, Award, Clock, Trophy, Upload
} from 'lucide-react';

const API_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.port === '5173') ? `http://${window.location.hostname}:5000` : '';

const MasterDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [students, setStudents] = useState([]);
  const [fees, setFees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProgram, setFilterProgram] = useState('');
  const navigate = useNavigate();
  
  // Form state
  const [name, setName] = useState('');
  const [belt, setBelt] = useState('White Belt');
  const [program, setProgram] = useState('Kids Program');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Competitions state
  const [competitions, setCompetitions] = useState([]);
  const [showAddComp, setShowAddComp] = useState(false);
  const [compForm, setCompForm] = useState({ id: null, name: '', date: '', location: '', category: 'Beginner', deadline: '', fee: 0, description: '', status: 'Upcoming', eligible_programs: 'All' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || localStorage.getItem('role') !== 'master') {
      navigate('/login');
      return;
    }
    fetchData(token);
  }, [navigate]);

  const fetchData = async (token) => {
    try {
      const stuRes = await axios.get(`${API_URL}/api/students`, { headers: { Authorization: token } });
      const feeRes = await axios.get(`${API_URL}/api/fees/all`, { headers: { Authorization: token } });
      setStudents(stuRes.data);
      setFees(feeRes.data);
      
      const storedComps = JSON.parse(localStorage.getItem('competitions') || '[]');
      setCompetitions(storedComps);
    } catch (err) {
      console.warn('Backend unavailable, using demo data');
      const demoStudents = [
        { id: 1, name: "Rahul Singh", username: "rahul", belt_level: "Yellow Belt", program: "Beginner", join_date: "2024-02-10" },
        { id: 2, name: "Priya Sharma", username: "priya", belt_level: "Green Belt", program: "Advanced", join_date: "2023-11-05" },
        { id: 3, name: "Student Demo", username: "student", belt_level: "Orange Belt", program: "Kids Program", join_date: "2024-01-15" }
      ];
      setStudents(demoStudents);
      setFees([
        { id: 1, name: "Rahul Singh", amount: 1200, status: 'pending', due_date: '2024-05-05' },
        { id: 2, name: "Priya Sharma", amount: 1500, status: 'paid', due_date: '2024-05-05' },
        { id: 3, name: "Student Demo", amount: 1500, status: 'pending', due_date: '2024-05-05' }
      ]);
      setCompetitions(JSON.parse(localStorage.getItem('competitions') || '[]'));
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/api/students`, 
        { name, belt_level: belt, program, username: cleanUsername, password: cleanPassword },
        { headers: { Authorization: token } }
      );
      setShowAdd(false);
      fetchData(token);
      setName(''); setUsername(''); setPassword('');
      alert('Student added successfully!');
    } catch (err) {
      alert('Error adding student');
    }
  };

  const updateBelt = async (id, newBelt) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/api/students/${id}/belt`, 
        { belt_level: newBelt },
        { headers: { Authorization: token } }
      );
      fetchData(token);
    } catch (err) {
      alert('Error updating belt');
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this student?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/students/${id}`, { headers: { Authorization: token } });
      fetchData(token);
    } catch (err) {
      alert('Error deleting student');
    }
  };

  // Filter students based on search and program
  const filteredStudents = Array.isArray(students) ? students.filter(s => {
    const nameMatch = s.name ? s.name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const matchProgram = filterProgram ? s.program === filterProgram : true;
    return nameMatch && matchProgram;
  }) : [];

  const handleSaveCompetition = (e) => {
    e.preventDefault();
    let updatedComps;
    if (compForm.id) {
      updatedComps = Array.isArray(competitions) ? competitions.map(c => c.id === compForm.id ? { ...compForm } : c) : [];
    } else {
      updatedComps = [{ ...compForm, id: Date.now(), created_at: new Date().toISOString() }, ...(Array.isArray(competitions) ? competitions : [])];
    }
    setCompetitions(updatedComps);
    localStorage.setItem('competitions', JSON.stringify(updatedComps));
    setShowAddComp(false);
    setCompForm({ id: null, name: '', date: '', location: '', category: 'Beginner', deadline: '', fee: 0, description: '', status: 'Upcoming', eligible_programs: 'All' });
    alert('Competition saved successfully!');
  };

  const handleDeleteComp = (id) => {
    if (!window.confirm('Delete this competition?')) return;
    const updatedComps = Array.isArray(competitions) ? competitions.filter(c => c.id !== id) : [];
    setCompetitions(updatedComps);
    localStorage.setItem('competitions', JSON.stringify(updatedComps));
  };

  // Render Functions for Tabs
  const renderOverview = () => (
    <div className="dash-content-area">
      <h3 className="text-gold mb-4" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Overview</h3>
      <div className="dash-grid-4">
      <div className="dash-grid-4">
        <div className="dash-card-premium card-3d animate-slide-up">
          <div className="stat-icon-glow"><Users size={30} /></div>
          <div>
            <h4>Total Students</h4>
            <h2>{students.length}</h2>
          </div>
        </div>
        <div className="dash-card-premium card-3d animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="stat-icon-glow" style={{ filter: 'drop-shadow(0 0 10px #00cc00)' }}><IndianRupee size={30} style={{ color: '#00cc00' }}/></div>
          <div>
            <h4>Fees Paid</h4>
            <h2>{Array.isArray(fees) ? fees.filter(f => f.status === 'paid').length : 0}</h2>
          </div>
        </div>
        <div className="dash-card-premium card-3d glow-red-neon animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="stat-icon-glow"><XCircle size={30} /></div>
          <div>
            <h4>Fees Pending</h4>
            <h2>{Array.isArray(fees) ? fees.filter(f => f.status !== 'paid').length : 0}</h2>
          </div>
        </div>
        <div className="dash-card-premium card-3d animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="stat-icon-glow" style={{ filter: 'drop-shadow(0 0 10px var(--color-gold))' }}><CalendarCheck size={30} className="text-gold" /></div>
          <div>
            <h4>Today Attendance</h4>
            <h2>85%</h2>
          </div>
        </div>
      </div>
      </div>
      
      <div className="premium-card card-gradient-border mt-4 animate-slide-up" style={{ marginTop: '2rem', animationDelay: '0.4s' }}>
        <h4 className="mb-3 text-gold" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Award size={20} /> Upcoming Belt Test
        </h4>
        <p className="text-gray" style={{ lineHeight: '1.6' }}>Next grading examination is scheduled for <strong>25th May 2026</strong>. 12 students have met the training hours criteria.</p>
        <button className="btn btn-primary btn-sm mt-3" style={{ marginTop: '1.5rem' }}>View Eligible Students</button>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="dash-content-area">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h3 className="text-gold" style={{ fontSize: '1.8rem', margin: 0 }}>Student Management</h3>
        <button onClick={() => setShowAdd(!showAdd)} className="btn btn-primary">
          <UserPlus size={18} /> {showAdd ? 'Close Form' : 'Add Student'}
        </button>
      </div>

      {showAdd && (
        <div className="dash-card" style={{ marginBottom: '2rem', border: '1px solid var(--color-red)' }}>
          <h4 className="mb-3">New Student Registration</h4>
          <form onSubmit={handleAddStudent} className="grid grid-cols-2" style={{ gap: '1rem' }}>
            <input type="text" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} required />
            <input type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
            <select value={program} onChange={e=>setProgram(e.target.value)}>
              <option>Kids Program</option>
              <option>Beginner</option>
              <option>Advanced</option>
              <option>Private Sessions</option>
            </select>
            <select value={belt} onChange={e=>setBelt(e.target.value)} style={{ gridColumn: 'span 2' }}>
              <option>White Belt</option>
              <option>Yellow Belt</option>
              <option>Orange Belt</option>
              <option>Green Belt</option>
              <option>Blue Belt</option>
              <option>Brown Belt</option>
              <option>Black Belt</option>
            </select>
            <button type="submit" className="btn btn-primary w-100" style={{ gridColumn: 'span 2' }}>Register Student</button>
          </form>
        </div>
      )}

      <div className="dash-card">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="search-box" style={{ display: 'flex', flexGrow: 1, position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--color-gray)' }} />
            <input 
              type="text" 
              placeholder="Search students..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '3rem', margin: 0 }}
            />
          </div>
          <button className={`btn ${showFilter ? 'btn-primary' : 'btn-outline'}`} style={{ padding: '0 1rem' }} onClick={() => setShowFilter(!showFilter)}>
            <Filter size={20} />
          </button>
        </div>

        {showFilter && (
          <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span className="text-gray">Filter by Program:</span>
            <select value={filterProgram} onChange={e => setFilterProgram(e.target.value)} style={{ width: 'auto', margin: 0 }}>
              <option value="">All Programs</option>
              <option value="Kids Program">Kids Program</option>
              <option value="Beginner">Beginner</option>
              <option value="Advanced">Advanced</option>
              <option value="Private Sessions">Private Sessions</option>
            </select>
            {filterProgram && (
              <button className="btn btn-outline btn-sm" onClick={() => setFilterProgram('')}>Clear Filter</button>
            )}
          </div>
        )}

        <div className="table-responsive">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Program</th>
                <th>Belt Level</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filteredStudents) && filteredStudents.map(s => (
                <tr key={s.id}>
                  <td className="font-bold">{s.name}</td>
                  <td>{s.username || 'N/A'}</td>
                  <td>{s.program}</td>
                  <td>
                    <span className={`belt-badge belt-${(s.belt_level || 'White').split(' ')[0].toLowerCase()}`}>
                      {s.belt_level}
                    </span>
                  </td>
                  <td>{s.join_date}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-icon" title="View Profile" onClick={() => alert(`Profile:\nName: ${s.name}\nBelt: ${s.belt_level}\nProgram: ${s.program}\nJoined: ${s.join_date}`)}>
                        <FileText size={18} />
                      </button>
                      <button className="btn-icon text-gold" title="Edit" onClick={() => {
                        setName(s.name); setProgram(s.program); setBelt(s.belt_level); setShowAdd(true); window.scrollTo(0, 0);
                        alert('Edit mode activated. Form pre-filled above (Note: Updating will create a new entry currently as Edit route is a future feature).');
                      }}>
                        <Edit size={18} />
                      </button>
                      <button className="btn-icon text-red" title="Delete" onClick={() => handleDeleteStudent(s.id)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr><td colSpan="6" className="text-center text-gray py-4">No students found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="dash-content-area">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <h3 className="text-gold" style={{ fontSize: '1.8rem', margin: 0 }}>Daily Attendance</h3>
        <button className="btn btn-outline"><Download size={18} /> Export Report</button>
      </div>

      <div className="dash-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
          <h4>Date: {new Date().toLocaleDateString()}</h4>
          <select style={{ width: '200px', margin: 0 }}>
            <option>Kids Program</option>
            <option>Beginner</option>
            <option>Advanced</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Belt</th>
                <th>Monthly %</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(students) && students.map(s => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.belt_level}</td>
                  <td className="text-gold">85%</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-outline btn-sm" style={{ borderColor: '#00cc00', color: '#00cc00' }} onClick={() => alert('Marked Present')}><CheckCircle size={16} /> Present</button>
                      <button className="btn btn-outline btn-sm text-red" onClick={() => alert('Marked Absent')}><XCircle size={16} /> Absent</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFees = () => (
    <div className="dash-content-area">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <h3 className="text-gold" style={{ fontSize: '1.8rem', margin: 0 }}>Fees Management</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline"><Download size={18} /> Download Report</button>
        </div>
      </div>

      <div className="dash-card">
        <div className="table-responsive">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(fees) && fees.map(f => (
                <tr key={f.id}>
                  <td className="font-bold">{f.name}</td>
                  <td>₹{f.amount}</td>
                  <td>{f.due_date}</td>
                  <td>
                    <span className={`status-badge ${f.status === 'paid' ? 'status-paid' : 'status-pending'}`}>
                      {f.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {f.status !== 'paid' && (
                        <>
                          <button className="btn btn-primary btn-sm" onClick={() => alert('Fee marked as paid manually.')}>Mark Paid</button>
                          <a href={`https://wa.me/?text=Reminder: Fee of ₹${f.amount} is due for ${f.name}`} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm text-gold">
                            <MessageCircle size={16} /> Remind
                          </a>
                        </>
                      )}
                      {f.status === 'paid' && <span className="text-gray">No action needed</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBeltProgress = () => (
    <div className="dash-content-area">
      <h3 className="text-gold mb-4" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Belt Progress</h3>
      <div className="dash-card">
        <div className="table-responsive">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Current Belt</th>
                <th>Update Belt</th>
                <th>Exam Date</th>
                <th>Performance Notes</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(students) && students.map(s => (
                <tr key={s.id}>
                  <td className="font-bold">{s.name}</td>
                  <td>
                    <span className={`belt-badge belt-${(s.belt_level || 'White').split(' ')[0].toLowerCase()}`}>
                      {s.belt_level}
                    </span>
                  </td>
                  <td>
                    <select value={s.belt_level} onChange={(e) => updateBelt(s.id, e.target.value)} style={{ padding: '0.4rem', margin: 0 }}>
                      <option>White Belt</option>
                      <option>Yellow Belt</option>
                      <option>Orange Belt</option>
                      <option>Green Belt</option>
                      <option>Blue Belt</option>
                      <option>Brown Belt</option>
                      <option>Black Belt</option>
                    </select>
                  </td>
                  <td><input type="date" style={{ padding: '0.4rem', margin: 0 }} /></td>
                  <td>
                    <button className="btn btn-outline btn-sm" onClick={() => prompt('Enter performance notes:')}><FileText size={16}/> Add Notes</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="dash-content-area">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 className="text-gold" style={{ fontSize: '1.8rem', margin: 0 }}>Class Schedule</h3>
        <button className="btn btn-primary" onClick={() => alert('Add Holiday Notice')}><Bell size={18}/> Add Holiday</button>
      </div>
      <div className="dash-grid-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <div className="dash-card">
          <h4>Kids Program</h4>
          <p className="text-red font-bold mt-2">Mon - Wed - Fri</p>
          <p className="text-gray mb-3">5:00 PM - 6:00 PM</p>
          <button className="btn btn-outline w-100 btn-sm">Edit Timing</button>
        </div>
        <div className="dash-card">
          <h4>Beginner Batch</h4>
          <p className="text-red font-bold mt-2">Tue - Thu - Sat</p>
          <p className="text-gray mb-3">6:00 PM - 7:30 PM</p>
          <button className="btn btn-outline w-100 btn-sm">Edit Timing</button>
        </div>
        <div className="dash-card">
          <h4>Advanced Batch</h4>
          <p className="text-red font-bold mt-2">Mon - Wed - Fri</p>
          <p className="text-gray mb-3">7:00 PM - 9:00 PM</p>
          <button className="btn btn-outline w-100 btn-sm">Edit Timing</button>
        </div>
        <div className="dash-card">
          <h4>Private Training</h4>
          <p className="text-red font-bold mt-2">Custom Schedule</p>
          <p className="text-gray mb-3">By Appointment</p>
          <button className="btn btn-outline w-100 btn-sm">Manage Slots</button>
        </div>
      </div>
    </div>
  );

  const renderCompetitions = () => (
    <div className="dash-content-area">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h3 className="text-gold" style={{ fontSize: '1.8rem', margin: 0 }}>Manage Competitions</h3>
        <button onClick={() => { setShowAddComp(!showAddComp); setCompForm({ id: null, name: '', date: '', location: '', category: 'Beginner', deadline: '', fee: 0, description: '', status: 'Upcoming', eligible_programs: 'All' }); }} className="btn btn-primary">
          <Trophy size={18} /> {showAddComp ? 'Close Form' : 'Add Competition'}
        </button>
      </div>

      {showAddComp && (
        <div className="dash-card" style={{ marginBottom: '2rem', border: '1px solid var(--color-gold)' }}>
          <h4 className="mb-3">{compForm.id ? 'Edit Competition' : 'New Competition Circular'}</h4>
          <form onSubmit={handleSaveCompetition} className="grid grid-cols-2" style={{ gap: '1rem' }}>
            <input type="text" placeholder="Competition Name" value={compForm.name} onChange={e=>setCompForm({...compForm, name: e.target.value})} required />
            <input type="date" placeholder="Date" value={compForm.date} onChange={e=>setCompForm({...compForm, date: e.target.value})} required />
            <input type="text" placeholder="Location" value={compForm.location} onChange={e=>setCompForm({...compForm, location: e.target.value})} required />
            <select value={compForm.category} onChange={e=>setCompForm({...compForm, category: e.target.value})}>
              <option>Beginner</option>
              <option>Advanced</option>
              <option>All Levels</option>
            </select>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--color-gray)' }}>Registration Deadline</label>
              <input type="datetime-local" value={compForm.deadline} onChange={e=>setCompForm({...compForm, deadline: e.target.value})} required />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--color-gray)' }}>Registration Fee (₹)</label>
              <input type="number" placeholder="Fee Amount" value={compForm.fee} onChange={e=>setCompForm({...compForm, fee: e.target.value})} required />
            </div>
            <textarea placeholder="Description / Rules" value={compForm.description} onChange={e=>setCompForm({...compForm, description: e.target.value})} required style={{ gridColumn: 'span 2' }} rows="3"></textarea>
            <select value={compForm.status} onChange={e=>setCompForm({...compForm, status: e.target.value})}>
              <option>Upcoming</option>
              <option>Closed</option>
              <option>Completed</option>
            </select>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '4px' }}>
              <Upload size={20} className="text-gray" />
              <input type="file" style={{ border: 'none', background: 'transparent', padding: 0 }} accept=".pdf,.jpg,.png" />
            </div>
            <button type="submit" className="btn btn-gold w-100" style={{ gridColumn: 'span 2' }}>{compForm.id ? 'Update Circular' : 'Publish Circular'}</button>
          </form>
        </div>
      )}

      <div className="dash-grid-4 grid-cols-2">
        {Array.isArray(competitions) && competitions.map(c => {
          const registered = JSON.parse(localStorage.getItem('comp_regs_' + c.id) || '[]');
          return (
            <div key={c.id} className={`premium-card card-gradient-border animate-slide-up ${c.status === 'Upcoming' ? 'glow-gold-neon' : ''}`} style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <span className={`badge-pill ${c.status === 'Upcoming' ? 'badge-upcoming' : 'badge-popular'}`} style={{ marginBottom: '0.5rem' }}>{c.status}</span>
                  <h4 style={{ fontSize: '1.4rem', marginTop: '0.5rem' }}>{c.name}</h4>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn-icon" onClick={() => { setCompForm(c); setShowAddComp(true); window.scrollTo(0, 0); }}><Edit size={18} /></button>
                  <button className="btn-icon text-red" onClick={() => handleDeleteComp(c.id)}><Trash2 size={18} /></button>
                </div>
              </div>
              
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <p className="text-gray" style={{ fontSize: '0.85rem' }}><Calendar size={14} className="text-red" /> {c.date}</p>
                <p className="text-gray" style={{ fontSize: '0.85rem' }}><MapPin size={14} className="text-red" /> {c.location}</p>
                <p className="text-gray" style={{ fontSize: '0.85rem' }}><Award size={14} className="text-red" /> {c.category}</p>
                <p className="text-gold" style={{ fontSize: '0.85rem' }}>₹{c.fee}</p>
              </div>

              <p className="text-gray mb-4" style={{ fontSize: '0.9rem', lineHeight: 1.6, height: '3rem', overflow: 'hidden' }}>{c.description}</p>
              
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   <div className="stat-icon-glow" style={{ fontSize: '1.2rem' }}><Users size={16} /></div>
                   <span className="text-white font-bold">{registered.length} Registered</span>
                </div>
                <button className="btn btn-outline btn-sm" onClick={() => alert(`Registered Students: \n${registered.length > 0 ? registered.join(', ') : 'None yet'}`)}>View Full List</button>
              </div>
            </div>
          );
        })}
        {competitions.length === 0 && <p className="text-gray">No competitions found. Add one above.</p>}
      </div>
    </div>
  );

  const renderAnnouncements = () => (
    <div className="dash-content-area">
      <h3 className="text-gold mb-4" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Announcements</h3>
      <div className="dash-card" style={{ marginBottom: '2rem' }}>
        <h4>Send New Notice</h4>
        <form className="mt-3" onSubmit={(e) => { e.preventDefault(); alert('Announcement sent!'); }}>
          <select style={{ marginBottom: '1rem' }} required>
            <option value="">Select Topic</option>
            <option>Tournament Update</option>
            <option>Fee Due Reminder</option>
            <option>Belt Exam Announcement</option>
            <option>Holiday Notice</option>
          </select>
          <textarea rows="4" placeholder="Type your announcement message here..." required style={{ marginBottom: '1rem' }}></textarea>
          <button type="submit" className="btn btn-primary">Send to All Students</button>
        </form>
      </div>
      <div className="dash-card">
        <h4>Recent Announcements</h4>
        <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
          <li style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <strong>Upcoming District Tournament</strong>
            <p className="text-gray text-sm">Sent on: May 1st, 2026</p>
          </li>
          <li style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <strong>Belt Exam Registration Open</strong>
            <p className="text-gray text-sm">Sent on: April 25th, 2026</p>
          </li>
        </ul>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="dash-content-area">
      <h3 className="text-gold mb-4" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Generate Reports</h3>
      <div className="dash-grid-4">
        <div className="premium-card card-3d text-center">
          <div className="stat-icon-glow" style={{ marginBottom: '1rem' }}><Users size={40} /></div>
          <h4 style={{ marginBottom: '1rem' }}>Student Roster</h4>
          <button className="btn btn-outline w-100 btn-sm" onClick={() => alert('Downloading Student Report...')}>Download PDF</button>
        </div>
        <div className="premium-card card-3d text-center">
          <div className="stat-icon-glow" style={{ marginBottom: '1rem', filter: 'drop-shadow(0 0 10px #00cc00)' }}><CalendarCheck size={40} style={{ color: '#00cc00' }} /></div>
          <h4 style={{ marginBottom: '1rem' }}>Attendance Stats</h4>
          <button className="btn btn-outline w-100 btn-sm" onClick={() => alert('Downloading Attendance Report...')}>Download Excel</button>
        </div>
        <div className="premium-card card-3d text-center">
          <div className="stat-icon-glow" style={{ marginBottom: '1rem', filter: 'drop-shadow(0 0 10px var(--color-gold))' }}><IndianRupee size={40} className="text-gold" /></div>
          <h4 style={{ marginBottom: '1rem' }}>Finance Ledger</h4>
          <button className="btn btn-outline w-100 btn-sm" onClick={() => alert('Downloading Fees Report...')}>Download Excel</button>
        </div>
        <div className="premium-card card-3d text-center">
          <div className="stat-icon-glow" style={{ marginBottom: '1rem' }}><Award size={40} /></div>
          <h4 style={{ marginBottom: '1rem' }}>Grading Log</h4>
          <button className="btn btn-outline w-100 btn-sm" onClick={() => alert('Downloading Progress Report...')}>Download PDF</button>
        </div>
      </div>
    </div>
  );

  // Tab mapping
  const tabs = [
    { id: 'overview', name: 'Overview', icon: <TrendingUp size={20} /> },
    { id: 'students', name: 'Students', icon: <Users size={20} /> },
    { id: 'attendance', name: 'Attendance', icon: <CalendarCheck size={20} /> },
    { id: 'fees', name: 'Fees', icon: <IndianRupee size={20} /> },
    { id: 'belts', name: 'Belt Progress', icon: <Award size={20} /> },
    { id: 'schedule', name: 'Schedule', icon: <Clock size={20} /> },
    { id: 'competitions', name: 'Competitions', icon: <Trophy size={20} /> },
    { id: 'announcements', name: 'Announcements', icon: <Bell size={20} /> },
    { id: 'reports', name: 'Reports', icon: <FileText size={20} /> }
  ];

  return (
    <section className="section bg-black" style={{ minHeight: '100vh', padding: '6rem 0' }}>
      <div className="container">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className="section-title" style={{ margin: 0, left: 0, transform: 'none' }}>Master <span className="text-red">Portal</span></h2>
          <button onClick={handleLogout} className="btn btn-outline text-gray" style={{ borderColor: 'var(--color-gray)' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="dashboard-layout">
          {/* Sidebar Navigation */}
          <div className="dashboard-sidebar">
            {tabs.map(tab => (
              <div 
                key={tab.id}
                className={`dash-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon} <span>{tab.name}</span>
              </div>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="dashboard-content">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'students' && renderStudents()}
            {activeTab === 'attendance' && renderAttendance()}
            {activeTab === 'fees' && renderFees()}
            {activeTab === 'belts' && renderBeltProgress()}
            {activeTab === 'schedule' && renderSchedule()}
            {activeTab === 'competitions' && renderCompetitions()}
            {activeTab === 'announcements' && renderAnnouncements()}
            {activeTab === 'reports' && renderReports()}
          </div>
        </div>

      </div>
    </section>
  );
};

export default MasterDashboard;
