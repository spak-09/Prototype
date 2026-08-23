import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export default function TopBar({ onMenuClick, role }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(false);

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <header
      style={{
        height: 56,
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: '#0F0F0F',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: 16,
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', display: 'none', padding: 4 }}
        className="mobile-menu-btn"
      >
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Greeting */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span className="font-display" style={{ fontSize: 16, fontWeight: 700, color: '#F0EDE8' }}>
            {greeting}, {user?.name?.split(' ')[0] || 'User'} 👋
          </span>
        </div>
        <div style={{ fontSize: 11.5, color: '#6B7280', marginTop: 1 }}>{dateStr}</div>
      </div>

      {/* Search */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: '#1A1A1A',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 8,
          padding: '6px 12px',
          width: 220,
        }}
        className="search-bar"
      >
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ color: '#6B7280', flexShrink: 0 }}>
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          placeholder="Search members, sessions..."
          style={{
            background: 'none',
            border: 'none',
            outline: 'none',
            fontSize: 13,
            color: '#F0EDE8',
            width: '100%',
            padding: 0,
          }}
        />
      </div>

      {/* Notifications */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowNotif(!showNotif)}
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '6px 8px', cursor: 'pointer', color: '#A8A29E', position: 'relative' }}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <span style={{ position: 'absolute', top: 5, right: 5, width: 7, height: 7, background: '#F97316', borderRadius: '50%', border: '1.5px solid #0F0F0F' }} />
        </button>

        {showNotif && (
          <>
            <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setShowNotif(false)} />
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: 300,
                background: '#1A1A1A',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                zIndex: 100,
              }}
            >
              <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#F0EDE8' }}>Notifications</span>
                <span style={{ fontSize: 11, color: '#F97316', cursor: 'pointer' }}>Mark all read</span>
              </div>
              {[
                { text: 'New member registration pending review', time: '5m', dot: '#F97316' },
                { text: 'Payment received from Aarav Gupta', time: '1h', dot: '#22C55E' },
                { text: 'Membership expiring for 3 members', time: '2h', dot: '#EF4444' },
              ].map((n, i) => (
                <div key={i} style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ width: 7, height: 7, background: n.dot, borderRadius: '50%', marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12.5, color: '#F0EDE8', lineHeight: 1.4 }}>{n.text}</div>
                    <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>{n.time} ago</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* User menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ textAlign: 'right' }} className="trainer-name">
          <div style={{ fontSize: 13, fontWeight: 600, color: '#F0EDE8', lineHeight: 1.3 }}>{user?.name || 'User'}</div>
          <div style={{ fontSize: 11, color: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
            Available
          </div>
        </div>
        <div className="avatar" style={{ width: 34, height: 34, background: '#F97316', color: '#0F0F0F', fontSize: 13, cursor: 'pointer' }} onClick={handleLogout}>
          {initials}
        </div>
      </div>
    </header>
  );
}
