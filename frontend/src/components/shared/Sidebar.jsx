import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

function SidebarIcon({ children, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      {children}
    </svg>
  );
}

const navItems = {
  owner: [
    { path: '/owner', label: 'Dashboard', icon: (<SidebarIcon><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></SidebarIcon>) },
    { path: '/owner/members', label: 'Members', icon: (<SidebarIcon><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></SidebarIcon>) },
    { path: '/owner/attendance', label: 'Attendance', icon: (<SidebarIcon><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></SidebarIcon>) },
    { path: '/owner/payments', label: 'Payments', icon: (<SidebarIcon><rect x="1" y="4" width="22" height="16" rx="2" /><path d="M1 10h22" /></SidebarIcon>) },
    { path: '/owner/trainers', label: 'Trainers', icon: (<SidebarIcon><path d="M14.5 22l-3-6-4 2 2-11 3 6 4-2-2 11z" /></SidebarIcon>) },
    { path: '/owner/community', label: 'Community', icon: (<SidebarIcon><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></SidebarIcon>) },
    { path: '/owner/analytics', label: 'Analytics', icon: (<SidebarIcon><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /><path d="M8 17v-5M12 17v-8M16 17v-3" /></SidebarIcon>) },
    { path: '/owner/settings', label: 'Settings', icon: (<SidebarIcon><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" /></SidebarIcon>) },
  ],
  trainer: [
    { path: '/trainer', label: 'Dashboard', icon: (<SidebarIcon><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></SidebarIcon>) },
    { path: '/trainer/members', label: 'My Members', icon: (<SidebarIcon><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></SidebarIcon>) },
    { path: '/trainer/workouts', label: 'Workout Plans', icon: (<SidebarIcon><path d="M14.5 22l-3-6-4 2 2-11 3 6 4-2-2 11z" /></SidebarIcon>) },
    { path: '/trainer/schedule', label: 'Schedule', icon: (<SidebarIcon><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></SidebarIcon>) },
    { path: '/trainer/attendance', label: 'Attendance', icon: (<SidebarIcon><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></SidebarIcon>) },
    { path: '/trainer/messages', label: 'Messages', badge: 3, icon: (<SidebarIcon><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></SidebarIcon>) },
    { path: '/trainer/reports', label: 'Reports', icon: (<SidebarIcon><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /><path d="M8 17v-5M12 17v-8M16 17v-3" /></SidebarIcon>) },
    { path: '/trainer/profile', label: 'Profile', icon: (<SidebarIcon><path d="M20 21a8 8 0 10-16 0" /><circle cx="12" cy="7" r="4" /></SidebarIcon>) },
  ],
  member: [
    { path: '/member', label: 'Dashboard', icon: (<SidebarIcon><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></SidebarIcon>) },
    { path: '/member/workouts', label: 'My Workouts', icon: (<SidebarIcon><path d="M14.5 22l-3-6-4 2 2-11 3 6 4-2-2 11z" /></SidebarIcon>) },
    { path: '/member/progress', label: 'Progress', icon: (<SidebarIcon><path d="M3 17l4-8 4 4 4-6 4 3" /><path d="M3 21h18" /></SidebarIcon>) },
    { path: '/member/nutrition', label: 'Nutrition', icon: (<SidebarIcon><path d="M12 2a10 10 0 1010 10" /><path d="M12 6v6l4 2" /></SidebarIcon>) },
    { path: '/member/payments', label: 'Payments', icon: (<SidebarIcon><rect x="1" y="4" width="22" height="16" rx="2" /><path d="M1 10h22" /></SidebarIcon>) },
    { path: '/member/community', label: 'Community', icon: (<SidebarIcon><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></SidebarIcon>) },
    { path: '/member/challenges', label: 'Challenges', icon: (<SidebarIcon><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></SidebarIcon>) },
    { path: '/member/profile', label: 'Profile', icon: (<SidebarIcon><path d="M20 21a8 8 0 10-16 0" /><circle cx="12" cy="7" r="4" /></SidebarIcon>) },
  ],
};

const roleLabels = { owner: 'Owner Dashboard', trainer: 'Trainer Dashboard', member: 'Member Dashboard' };

function SidebarContent({ role, collapsed, onClose }) {
  const location = useLocation();
  const items = navItems[role] || [];
  const { user } = useAuthStore();

  return (
    <>
      {/* Logo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        padding: collapsed ? '0 12px' : '0 16px',
        height: 56,
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        flexShrink: 0,
      }}>
        {!collapsed && (
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span className="font-display" style={{ fontSize: 15, fontWeight: 800, letterSpacing: '0.22em', color: '#F0EDE8' }}>
              ONE <span style={{ color: '#F97316' }}>GYM</span>
            </span>
          </Link>
        )}
        {collapsed && (
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span className="font-display" style={{ fontSize: 14, fontWeight: 800, color: '#F97316', letterSpacing: '0.05em' }}>OG</span>
          </Link>
        )}
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', display: 'none', padding: 4 }}
          className="lg:hidden"
        >
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px 8px', overflowY: 'auto' }}>
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`sidebar-link${isActive ? ' active' : ''}`}
              style={{
                justifyContent: collapsed ? 'center' : 'flex-start',
                padding: collapsed ? '10px' : '8px 14px',
                marginBottom: 2,
                position: 'relative',
              }}
              title={collapsed ? item.label : undefined}
            >
              {item.icon}
              {!collapsed && <span style={{ flex: 1 }}>{item.label}</span>}
              {!collapsed && item.badge && (
                <span style={{
                  background: '#F97316',
                  color: '#0F0F0F',
                  fontSize: 10,
                  fontWeight: 700,
                  borderRadius: 99,
                  padding: '1px 6px',
                  lineHeight: '16px',
                }}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User profile */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: collapsed ? '12px 8px' : '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div className="avatar" style={{ width: 34, height: 34, background: '#F97316', color: '#0F0F0F', fontSize: 13 }}>
          {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'}
        </div>
        {!collapsed && (
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#F0EDE8', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.name || 'User'}
            </div>
            <div style={{ fontSize: 11, color: '#22C55E', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
              Online
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function Sidebar({ role, isOpen, onClose, collapsed, onToggleCollapse }) {
  return (
    <>
      {/* Desktop */}
      <aside
        className="sidebar-desktop"
        style={{
          width: collapsed ? 60 : 220,
          minWidth: collapsed ? 60 : 220,
          transition: 'width 0.25s ease, min-width 0.25s ease',
          background: '#141414',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'relative',
          zIndex: 10,
          overflow: 'hidden',
        }}
      >
        <SidebarContent role={role} collapsed={collapsed} onClose={onClose} />
        {/* Collapse toggle */}
        <button
          onClick={onToggleCollapse}
          style={{
            position: 'absolute',
            top: 16,
            right: collapsed ? '50%' : 12,
            transform: collapsed ? 'translateX(50%)' : 'none',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 6,
            padding: '3px 5px',
            cursor: 'pointer',
            color: '#6B7280',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            {collapsed ? <path d="M9 18l6-6-6-6" /> : <path d="M15 18l-6-6 6-6" />}
          </svg>
        </button>
      </aside>

      {/* Mobile drawer */}
      <aside
        style={{
          position: 'fixed',
          inset: '0 auto 0 0',
          width: 240,
          background: '#141414',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
        }}
        className="lg:hidden"
      >
        <SidebarContent role={role} collapsed={false} onClose={onClose} />
      </aside>
    </>
  );
}
