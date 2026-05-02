import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  TrendingUp, User, CalendarCheck, IndianRupee, Award, Clock, Bell, 
  FileBadge, MessageCircle, LogOut, CheckCircle, XCircle, Download, FileText,
  AlertCircle, ChevronRight, Trophy, MapPin, Calendar, Clock as ClockIcon
} from 'lucide-react';
import myPhoto from '../assets/me.jpg';

const API_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.port === '5173') ? `http://${window.location.hostname}:5000` : '';

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [profile, setProfile] = useState(null);
  const [payments, setPayments] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [myRegistrations, setMyRegistrations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || localStorage.getItem('role') !== 'student') {
      navigate('/login');
      return;
    }
    fetchData(token);
  }, [navigate]);

  const fetchData = async (token) => {
    try {
      const profRes = await axios.get(`${API_URL}/api/student/profile`, { headers: { Authorization: token } });
      const payRes = await axios.get(`${API_URL}/api/student/payments`, { headers: { Authorization: token } });
      setProfile(profRes.data);
      setPayments(payRes.data);
      
      const storedComps = JSON.parse(localStorage.getItem('competitions') || '[]');
      setCompetitions(storedComps);
    } catch (err) {
      console.warn('Backend unavailable, using demo data');
      setProfile({
        name: "Demo Student",
        belt_level: "Orange Belt",
        program: "Advanced Karate",
        join_date: "2024-01-15",
        fee: { amount: 1500, status: 'pending' }
      });
      setPayments([
        { id: 1, date: '2024-04-01', program: 'Advanced Karate', transaction_id: 'TXN_DEMO_123', amount: 1500 }
      ]);
      setCompetitions(JSON.parse(localStorage.getItem('competitions') || '[]'));
      setMyRegistrations([]);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handlePayment = async () => {
    const res = await loadRazorpay();
    if (!res) {
      alert('Razorpay SDK failed to load');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const order = await axios.post(`${API_URL}/api/create-order`, 
        { amount: profile.fee.amount }, 
        { headers: { Authorization: token } }
      );

      const options = {
        key: 'rzp_test_gT0eX1ZqHn9kPj',
        amount: order.data.amount,
        currency: order.data.currency,
        name: "Elite Karate Academy",
        description: "Monthly Fee Payment",
        order_id: order.data.id,
        handler: async function (response) {
          try {
            await axios.post(`${API_URL}/api/verify-payment`, {
              ...response,
              amount: profile.fee.amount,
              program: profile.program
            }, { headers: { Authorization: token } });
            
            alert('Payment Successful!');
            fetchData(token);
          } catch (err) {
            alert('Payment verification failed');
          }
        },
        prefill: { name: profile.name },
        theme: { color: "#e60000" }
      };
      
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      alert('Error creating order');
    }
  };

  const handleCompRegister = (compId) => {
    if (myRegistrations.includes(compId)) return;
    const regs = JSON.parse(localStorage.getItem('comp_regs_' + compId) || '[]');
    regs.push(profile.name);
    localStorage.setItem('comp_regs_' + compId, JSON.stringify(regs));
    setMyRegistrations([...myRegistrations, compId]);
    alert('Successfully registered for competition!');
  };

  const Countdown = ({ deadline }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
      const interval = setInterval(() => {
        const diff = new Date(deadline) - new Date();
        if (diff <= 0) {
          setTimeLeft('Closed');
          clearInterval(interval);
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const mins = Math.floor((diff / (1000 * 60)) % 60);
          setTimeLeft(`${days}d ${hours}h ${mins}m`);
        }
      }, 1000);
      return () => clearInterval(interval);
    }, [deadline]);

    return <span className="text-red font-bold">{timeLeft}</span>;
  };

  if (!profile) return <div className="section bg-black text-white text-center">Loading Student Data...</div>;

  // RENDER SECTIONS
  const renderOverview = () => (
    <div className="dash-content-area">
      <h3 className="text-gold mb-4" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Welcome, {profile.name}!</h3>
      <div className="dash-grid-4">
        <div className="dash-card stat-card">
          <div className="stat-icon"><CalendarCheck size={30} /></div>
          <div><h4>Classes Attended</h4><h2>45</h2></div>
        </div>
        <div className="dash-card stat-card">
          <div className="stat-icon text-green"><TrendingUp size={30} color="#00cc00"/></div>
          <div><h4>Attendance %</h4><h2>92%</h2></div>
        </div>
        <div className="dash-card stat-card">
          <div className="stat-icon text-gold"><Award size={30} /></div>
          <div><h4>Current Belt</h4><h2 style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>{profile.belt_level}</h2></div>
        </div>
        <div className="dash-card stat-card" style={{ border: profile.fee?.status === 'paid' ? '1px solid #00cc00' : '1px solid var(--color-red)'}}>
          <div className="stat-icon text-red"><IndianRupee size={30} /></div>
          <div><h4>Fees Status</h4><h2 style={{ fontSize: '1.2rem', marginTop: '0.5rem', color: profile.fee?.status === 'paid' ? '#00cc00' : 'var(--color-red)' }}>{profile.fee?.status?.toUpperCase() || 'UNKNOWN'}</h2></div>
        </div>
      </div>
      
      <div className="dash-card mt-4" style={{ marginTop: '2rem' }}>
        <h4 className="mb-3 text-gold" style={{ marginBottom: '1rem' }}>Next Class Schedule</h4>
        <p className="text-gray" style={{ fontSize: '1.1rem' }}>
          <Clock size={18} style={{ display: 'inline', marginRight: '8px' }}/>
          Your next <strong>{profile.program}</strong> session is today at <strong>5:00 PM</strong>.
        </p>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="dash-content-area">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <h3 className="text-gold" style={{ fontSize: '1.8rem', margin: 0 }}>My Attendance</h3>
        <span className="btn btn-outline" style={{ borderColor: '#00cc00', color: '#00cc00' }}>Overall: 92%</span>
      </div>

      <div className="dash-card" style={{ marginBottom: '2rem' }}>
        <h4 style={{ marginBottom: '1rem' }}>Progress Tracker</h4>
        <div style={{ width: '100%', height: '10px', background: '#333', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{ width: '92%', height: '100%', background: 'linear-gradient(90deg, #e60000, #ff4d4d)' }}></div>
        </div>
        <p className="text-gray mt-2" style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Excellent! You are maintaining a great attendance record.</p>
      </div>

      <div className="dash-card">
        <h4 style={{ marginBottom: '1.5rem' }}>Monthly History (May)</h4>
        <div className="table-responsive">
          <table className="dash-table">
            <thead>
              <tr><th>Date</th><th>Session</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr><td>May 1, 2026</td><td>{profile.program}</td><td><span className="text-green font-bold" style={{ color: '#00cc00' }}>Present</span></td></tr>
              <tr><td>April 28, 2026</td><td>{profile.program}</td><td><span className="text-green font-bold" style={{ color: '#00cc00' }}>Present</span></td></tr>
              <tr><td>April 25, 2026</td><td>{profile.program}</td><td><span className="text-red font-bold">Absent</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBeltProgress = () => {
    const belts = ['White Belt', 'Yellow Belt', 'Orange Belt', 'Green Belt', 'Blue Belt', 'Brown Belt', 'Black Belt'];
    const currentBelt = profile?.belt_level || 'White Belt';
    const currentIndex = belts.indexOf(currentBelt);
    const nextBelt = (currentIndex !== -1 && currentIndex < belts.length - 1) ? belts[currentIndex + 1] : 'Mastery Level';
    const progressPercent = (currentIndex !== -1 && currentIndex < belts.length - 1) ? 65 : 100;

    return (
      <div className="dash-content-area">
        <h3 className="text-gold mb-4" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Belt Progress</h3>
        
        <div className="dash-grid-4 grid-cols-2" style={{ marginBottom: '2rem' }}>
          <div className="dash-card text-center" style={{ padding: '3rem 1rem', background: 'rgba(255,255,255,0.03)' }}>
            <h4 className="text-gray" style={{ marginBottom: '1rem' }}>Current Belt</h4>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className={`belt-badge belt-${(profile?.belt_level || 'White').split(' ')[0].toLowerCase()}`} style={{ fontSize: '1.2rem', padding: '0.5rem 1.5rem', marginBottom: '1rem' }}>
                {profile?.belt_level || 'White Belt'}
              </div>
              <h2 style={{ fontSize: '2.5rem', color: '#fff' }}>{profile?.belt_level || 'White Belt'}</h2>
            </div>
          </div>
          <div className="dash-card text-center" style={{ padding: '3rem 1rem', border: '1px solid var(--color-gold)' }}>
            <h4 className="text-gold">Next Belt Target</h4>
            <h2 style={{ fontSize: '2.5rem', marginTop: '1rem', color: 'var(--color-gold)' }}>{nextBelt}</h2>
            <p className="mt-2 text-gray" style={{ marginTop: '0.5rem' }}>Estimated Exam: May 25, 2026</p>
          </div>
        </div>

        <div className="dash-card" style={{ marginBottom: '2rem' }}>
          <h4 style={{ marginBottom: '1rem' }}>Progress to {nextBelt}</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            <span>Technique Mastery</span>
            <span className="text-gold">{progressPercent}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#333', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--color-gold)' }}></div>
          </div>
        </div>

        <div className="dash-card">
          <h4 style={{ marginBottom: '1rem' }}>Trainer Remarks</h4>
          <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '4px solid var(--color-red)' }}>
            <p style={{ fontStyle: 'italic', lineHeight: 1.6 }}>"Excellent focus during Katas. Needs slightly more power in roundhouse kicks. Keep practicing the defensive stances at home." - Sensei Rajat</p>
          </div>
        </div>
      </div>
    );
  };

  const renderFees = () => (
    <div className="dash-content-area">
      <h3 className="text-gold" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Fees & Payments</h3>
      
      <div className="dash-card" style={{ marginBottom: '2rem' }}>
        {profile.fee ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p className="text-gray" style={{ marginBottom: '0.5rem' }}>Current Monthly Fee</p>
              <h2 style={{ fontSize: '2.5rem' }}>₹{profile.fee.amount}</h2>
              <p style={{ marginTop: '0.5rem' }}>
                Status: <span className={`status-badge ${profile.fee.status === 'paid' ? 'status-paid' : 'status-pending'}`}>{profile.fee.status.toUpperCase()}</span>
              </p>
              <p className="text-gray" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Due Date: 5th of every month</p>
            </div>
            {profile.fee.status !== 'paid' && (
              <button onClick={handlePayment} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Pay Online Now</button>
            )}
          </div>
        ) : (
          <p>No fee records found.</p>
        )}
      </div>

      <div className="dash-card">
        <h4 style={{ marginBottom: '1.5rem' }}>Payment History</h4>
        <div className="table-responsive">
          <table className="dash-table">
            <thead>
              <tr><th>Date</th><th>Program</th><th>Transaction ID</th><th>Amount</th><th>Receipt</th></tr>
            </thead>
            <tbody>
              {Array.isArray(payments) && payments.map(p => (
                <tr key={p.id}>
                  <td>{new Date(p.date).toLocaleDateString()}</td>
                  <td>{p.program}</td>
                  <td className="text-gray" style={{ fontSize: '0.85rem' }}>{p.transaction_id}</td>
                  <td className="font-bold">₹{p.amount}</td>
                  <td>
                    <button onClick={() => alert('Downloading Receipt for TXN: ' + p.transaction_id)} style={{ background: 'none', border: 'none', color: 'var(--color-red)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Download size={16} /> Download
                    </button>
                  </td>
                </tr>
              ))}
              {(!Array.isArray(payments) || payments.length === 0) && <tr><td colSpan="5" className="text-center text-gray py-4">No payments found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="dash-content-area">
      <h3 className="text-gold mb-4" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Class Schedule</h3>
      <div className="dash-card" style={{ marginBottom: '2rem', background: 'linear-gradient(45deg, #1a1a1a, #000)', borderLeft: '4px solid var(--color-red)' }}>
        <h4 className="text-red mb-2">Today's Class</h4>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>5:00 PM - 6:00 PM</h2>
        <p className="text-gray">Focus: Sparring & Stamina Building</p>
      </div>

      <div className="dash-card">
        <h4 style={{ marginBottom: '1.5rem' }}>Weekly Schedule ({profile.program})</h4>
        <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}><strong>Monday:</strong> 5:00 PM - Katas</div>
          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}><strong>Wednesday:</strong> 5:00 PM - Fitness</div>
          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}><strong>Friday:</strong> 5:00 PM - Sparring</div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => {
    const recentComps = Array.isArray(competitions) ? competitions.filter(c => {
      const created = new Date(c.created_at);
      const now = new Date();
      return (now - created) < (24 * 60 * 60 * 1000); // Last 24 hours
    }) : [];

    return (
      <div className="dash-content-area">
        <h3 className="text-gold mb-4" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Notifications</h3>
        <div className="dash-card">
          <ul style={{ listStyle: 'none' }}>
            {recentComps.map(c => (
              <li key={`notif-${c.id}`} style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '1rem' }}>
                <Trophy className="text-gold" size={24} style={{ flexShrink: 0 }} />
                <div>
                  <strong className="text-red">New Competition Published!</strong>
                  <p className="text-gray mt-1">"{c.name}" is now open for registration. Check the Competitions tab for details.</p>
                  <span className="text-sm text-gold" style={{ fontSize: '0.8rem', marginTop: '0.5rem', display: 'block' }}>Just Now</span>
                </div>
              </li>
            ))}
            <li style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '1rem' }}>
              <AlertCircle className="text-red" size={24} style={{ flexShrink: 0 }} />
              <div>
                <strong>Belt Exam Upcoming!</strong>
                <p className="text-gray mt-1">Make sure you are prepared for the grading exam on May 25th.</p>
                <span className="text-sm text-gold" style={{ fontSize: '0.8rem', marginTop: '0.5rem', display: 'block' }}>2 Days Ago</span>
              </div>
            </li>
            <li style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '1rem' }}>
              <Award className="text-gold" size={24} style={{ flexShrink: 0 }} />
              <div>
                <strong>State Level Tournament</strong>
                <p className="text-gray mt-1">Registrations are open for the Bangalore Open Karate Championship.</p>
                <span className="text-sm text-gold" style={{ fontSize: '0.8rem', marginTop: '0.5rem', display: 'block' }}>1 Week Ago</span>
              </div>
            </li>
            <li style={{ padding: '1rem 0', display: 'flex', gap: '1rem' }}>
              <Bell className="text-white" size={24} style={{ flexShrink: 0 }} />
              <div>
                <strong>Holiday Notice</strong>
                <p className="text-gray mt-1">Academy will remain closed tomorrow due to public holiday.</p>
                <span className="text-sm text-gold" style={{ fontSize: '0.8rem', marginTop: '0.5rem', display: 'block' }}>2 Weeks Ago</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const renderCompetitions = () => (
    <div className="dash-content-area">
      <h3 className="text-gold mb-4" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Upcoming Competitions</h3>
      <div className="dash-grid-4 grid-cols-2">
        {Array.isArray(competitions) && competitions.map(c => (
          <div key={c.id} className="dash-card competition-card animate-fade-in" style={{ borderTop: '4px solid var(--color-red)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '1.3rem' }}>{c.name}</h4>
              <span className={`status-badge ${c.status === 'Upcoming' ? 'status-paid' : 'status-pending'}`} style={{ height: 'fit-content' }}>
                {c.status}
              </span>
            </div>
            
            <div className="comp-info" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="info-item-small" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-gray)' }}>
                <Calendar size={14} className="text-gold" /> {c.date}
              </div>
              <div className="info-item-small" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-gray)' }}>
                <MapPin size={14} className="text-gold" /> {c.location}
              </div>
              <div className="info-item-small" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-gray)' }}>
                <Award size={14} className="text-gold" /> {c.category}
              </div>
              <div className="info-item-small" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-gray)' }}>
                <IndianRupee size={14} className="text-gold" /> ₹{c.fee}
              </div>
            </div>

            <p className="text-gray mb-4" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{c.description}</p>
            
            <div className="deadline-box" style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.85rem' }}>
                <p className="text-gray">Registration Ends:</p>
                <Countdown deadline={c.deadline} />
              </div>
              <button className="btn-icon" onClick={() => alert('Downloading circular PDF...')} title="Download Circular">
                <Download size={20} className="text-gold" />
              </button>
            </div>

            {myRegistrations.includes(c.id) ? (
              <button className="btn btn-outline w-100" disabled style={{ borderColor: '#00cc00', color: '#00cc00', opacity: 0.8 }}>
                <CheckCircle size={18} /> Registered
              </button>
            ) : (
              <button 
                className="btn btn-primary w-100" 
                onClick={() => handleCompRegister(c.id)}
                disabled={c.status !== 'Upcoming' || new Date(c.deadline) < new Date()}
              >
                Register Now
              </button>
            )}
          </div>
        ))}
        {(!Array.isArray(competitions) || competitions.length === 0) && <p className="text-gray">No new competition circulars available at the moment.</p>}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="dash-content-area">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <h3 className="text-gold" style={{ fontSize: '1.8rem', margin: 0 }}>My Profile</h3>
        <button className="btn btn-outline" onClick={() => alert('Edit profile functionality')}><FileText size={18} /> Edit Profile</button>
      </div>

      <div className="dash-grid-4 grid-cols-2 profile-grid" style={{ gap: '2rem', marginBottom: '2rem' }}>
        <div className="dash-card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--color-dark)', border: '2px solid var(--color-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: '1rem' }}>
            <img src={myPhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <button className="btn btn-outline btn-sm">Upload Photo</button>
        </div>
        <div className="dash-card">
          <div className="grid grid-cols-2 profile-details-grid" style={{ gap: '1rem', lineHeight: '1.8' }}>
            <div><strong className="text-gray">Full Name:</strong><br/>{profile.name}</div>
            <div><strong className="text-gray">Joined Date:</strong><br/>{profile.join_date}</div>
            <div><strong className="text-gray">Age:</strong><br/>18 (Example)</div>
            <div><strong className="text-gray">Phone:</strong><br/>+91 98765 43210</div>
            <div><strong className="text-gray">Program:</strong><br/>{profile.program}</div>
            <div><strong className="text-gray">Belt Level:</strong><br/>{profile.belt_level}</div>
          </div>
        </div>
      </div>

      <h3 className="text-gold mb-4" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Performance & Skill Notes</h3>
      <div className="dash-card">
        <ul style={{ listStyle: 'none', lineHeight: '1.8' }}>
          <li><CheckCircle size={16} className="text-green" style={{ display: 'inline', marginRight: '8px', color: '#00cc00' }}/> Excellent flexibility and high kicks.</li>
          <li><CheckCircle size={16} className="text-green" style={{ display: 'inline', marginRight: '8px', color: '#00cc00' }}/> Strong discipline and respect during classes.</li>
          <li><XCircle size={16} className="text-red" style={{ display: 'inline', marginRight: '8px' }}/> Needs improvement in breathing techniques during Katas.</li>
        </ul>
      </div>
    </div>
  );

  const renderCertificates = () => (
    <div className="dash-content-area">
      <h3 className="text-gold mb-4" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>My Certificates</h3>
      <div className="dash-grid-4 grid-cols-3">
        <div className="dash-card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <FileBadge size={50} className="text-gold" />
          <h4>Yellow Belt Certificate</h4>
          <p className="text-gray text-sm">Awarded: Jan 2026</p>
          <button className="btn btn-outline w-100 btn-sm" onClick={() => alert('Downloading Certificate...')}>Download</button>
        </div>
        <div className="dash-card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <FileBadge size={50} className="text-gray" />
          <h4>Orange Belt Certificate</h4>
          <p className="text-gray text-sm">Target: May 2026</p>
          <button className="btn btn-outline w-100 btn-sm" disabled style={{ opacity: 0.5 }}>Locked</button>
        </div>
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="dash-content-area">
      <h3 className="text-gold mb-4" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Support & Contact</h3>
      <div className="dash-grid-4 grid-cols-2">
        <div className="dash-card">
          <h4 style={{ marginBottom: '1rem' }}>Raise a Query</h4>
          <form onSubmit={e => { e.preventDefault(); alert('Query submitted successfully!'); }}>
            <input type="text" placeholder="Subject" required style={{ marginBottom: '1rem', width: '100%' }} />
            <textarea placeholder="Describe your issue or question..." required rows="5" style={{ marginBottom: '1rem', width: '100%' }}></textarea>
            <button type="submit" className="btn btn-primary w-100">Submit Query</button>
          </form>
        </div>
        <div className="dash-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <MessageCircle size={50} className="text-green mb-3" style={{ color: '#25D366', marginBottom: '1rem' }} />
          <h4>Chat with Master</h4>
          <p className="text-gray mt-2 mb-4" style={{ margin: '1rem 0' }}>Need immediate assistance? Reach out directly via WhatsApp.</p>
          <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ borderColor: '#25D366', color: '#25D366' }}>
            Open WhatsApp
          </a>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <TrendingUp size={20} /> },
    { id: 'profile', name: 'My Profile', icon: <User size={20} /> },
    { id: 'attendance', name: 'Attendance', icon: <CalendarCheck size={20} /> },
    { id: 'belt', name: 'Belt Progress', icon: <Award size={20} /> },
    { id: 'fees', name: 'Fees & Payments', icon: <IndianRupee size={20} /> },
    { id: 'schedule', name: 'Class Schedule', icon: <Clock size={20} /> },
    { id: 'competitions', name: 'Competitions', icon: <Trophy size={20} /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell size={20} /> },
    { id: 'certificates', name: 'Certificates', icon: <FileBadge size={20} /> },
    { id: 'support', name: 'Support', icon: <MessageCircle size={20} /> }
  ];

  return (
    <section className="section bg-black" style={{ minHeight: '100vh', padding: '6rem 0' }}>
      <div className="container">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className="section-title" style={{ margin: 0, left: 0, transform: 'none' }}>Student <span className="text-red">Portal</span></h2>
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
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'attendance' && renderAttendance()}
            {activeTab === 'belt' && renderBeltProgress()}
            {activeTab === 'fees' && renderFees()}
            {activeTab === 'schedule' && renderSchedule()}
            {activeTab === 'competitions' && renderCompetitions()}
            {activeTab === 'notifications' && renderNotifications()}
            {activeTab === 'certificates' && renderCertificates()}
            {activeTab === 'support' && renderSupport()}
          </div>
        </div>

      </div>
    </section>
  );
};

export default StudentDashboard;
