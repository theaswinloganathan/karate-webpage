import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User as UserIcon } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  const handleDemoLogin = (role) => {
    // Set demo credentials for instant access
    localStorage.setItem('token', 'demo_token_bypassed');
    localStorage.setItem('role', role);
    
    if (role === 'master') {
      navigate('/master');
    } else {
      navigate('/student');
    }
  };

  return (
    <section className="section bg-black" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="bg-dark p-4 border-radius-8 login-card" style={{ borderRadius: '15px', border: '1px solid var(--color-red)', padding: '3rem' }}>
          <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1rem', left: 0, transform: 'none' }}>
            Demo <span className="text-red">Access</span>
          </h2>
          <p className="text-gray" style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.1rem' }}>
            Select a portal to enter directly (No password required for demo)
          </p>
          
          <div className="demo-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <div 
              className="premium-card card-3d card-glass animate-slide-up" 
              onClick={() => handleDemoLogin('master')}
              style={{ cursor: 'pointer', textAlign: 'center' }}
            >
              <div className="stat-icon-glow" style={{ marginBottom: '1.5rem' }}>
                <Shield size={50} />
              </div>
              <h3 className="text-white" style={{ fontSize: '1.5rem' }}>Master Portal</h3>
              <p className="text-gray" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Management & Admin Tools</p>
            </div>

            <div 
              className="premium-card card-3d card-gradient-border animate-slide-up" 
              onClick={() => handleDemoLogin('student')}
              style={{ cursor: 'pointer', textAlign: 'center', animationDelay: '0.1s' }}
            >
              <div className="stat-icon-glow" style={{ marginBottom: '1.5rem', filter: 'drop-shadow(0 0 10px var(--color-gold))' }}>
                <UserIcon size={50} className="text-gold" />
              </div>
              <h3 className="text-white" style={{ fontSize: '1.5rem' }}>Student Portal</h3>
              <p className="text-gray" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Personal Profile & Progress</p>
            </div>
          </div>
          
          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <button onClick={() => navigate('/')} className="text-gray" style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
              ← Return to Main Website
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
