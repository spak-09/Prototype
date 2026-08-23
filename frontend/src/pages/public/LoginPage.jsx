import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login({ email, password });
      toast.success(`Welcome back, ${user.name}!`);
      const path = user.role === 'owner' ? '/owner' : user.role === 'trainer' ? '/trainer' : '/member';
      navigate(path);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = async (email) => {
    setLoading(true);
    try {
      const user = await login({ email, password: 'password123' });
      toast.success(`Welcome, ${user.name}!`);
      const path = user.role === 'owner' ? '/owner' : user.role === 'trainer' ? '/trainer' : '/member';
      navigate(path);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left Panel */}
      <div
        style={{
          flex: '0 0 50%',
          background: 'linear-gradient(135deg, #0F0F0F, #1a1a1a)',
          padding: 48,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="hidden lg:flex"
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
          <div style={{ position: 'absolute', top: 80, left: 80, width: 288, height: 288, background: '#F97316', borderRadius: '50%', filter: 'blur(120px)' }} />
          <div style={{ position: 'absolute', bottom: 80, right: 80, width: 384, height: 384, background: '#EA580C', borderRadius: '50%', filter: 'blur(150px)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #F97316, #EA580C)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}><path d="M6.5 6.5h11M6.5 17.5h11M3 12h3M18 12h3" /></svg>
            </div>
            <span className="font-display" style={{ fontSize: 18, fontWeight: 800, letterSpacing: '0.15em', color: '#F0EDE8' }}>KING <span style={{ color: '#F97316' }}>FITNESS</span></span>
          </Link>
        </div>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h1 className="font-display" style={{ fontSize: 36, fontWeight: 800, color: '#F0EDE8', marginBottom: 12 }}>Welcome Back!</h1>
          <p style={{ fontSize: 16, color: '#6B7280', maxWidth: 400, lineHeight: 1.7 }}>
            Log in to access your dashboard, track your progress, and stay connected with the King Fitness community.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, background: '#0F0F0F' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          {/* Mobile logo */}
          <div className="lg:hidden" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #F97316, #EA580C)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}><path d="M6.5 6.5h11M6.5 17.5h11M3 12h3M18 12h3" /></svg>
            </div>
            <span className="font-display" style={{ fontSize: 18, fontWeight: 800, letterSpacing: '0.15em', color: '#F0EDE8' }}>KING <span style={{ color: '#F97316' }}>FITNESS</span></span>
          </div>

          <h2 className="font-display" style={{ fontSize: 24, fontWeight: 800, color: '#F0EDE8', marginBottom: 4 }}>Sign In</h2>
          <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 32 }}>Enter your credentials to access your account.</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, color: '#A8A29E', marginBottom: 6, display: 'block' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 7L2 7" />
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  style={{ width: '100%', padding: '12px 14px 12px 40px', background: '#181818', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#F0EDE8', fontSize: 14, outline: 'none' }}
                />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, color: '#A8A29E', marginBottom: 6, display: 'block' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '12px 44px 12px 40px', background: '#181818', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#F0EDE8', fontSize: 14, outline: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', padding: 4 }}
                >
                  {showPassword ? (
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                  ) : (
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '13px 24px',
                fontSize: 14,
                borderRadius: 10,
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? (
                <span style={{ width: 18, height: 18, border: '2px solid rgba(15,15,15,0.3)', borderTopColor: '#0F0F0F', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }} />
              ) : 'Sign In'}
            </button>
          </form>

          {/* Quick Login */}
          <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <p style={{ fontSize: 11, color: '#6B7280', textAlign: 'center', marginBottom: 12 }}>Quick Login (Demo Accounts)</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {[
                { label: 'Owner', email: 'owner@elevatefit.com' },
                { label: 'Trainer', email: 'rajesh@elevatefit.com' },
                { label: 'Member', email: 'aarav.gupta@gmail.com' },
              ].map((acc) => (
                <button
                  key={acc.label}
                  onClick={() => { setEmail(acc.email); setPassword('password123'); quickLogin(acc.email); }}
                  style={{
                    padding: '10px 12px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#A8A29E',
                    cursor: 'pointer',
                    transition: 'background 0.15s, color 0.15s',
                  }}
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>

          <p style={{ fontSize: 13, color: '#6B7280', textAlign: 'center', marginTop: 24 }}>
            Don't have an account? <Link to="/register" style={{ color: '#F97316', fontWeight: 500, textDecoration: 'none' }}>Sign Up</Link>
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
