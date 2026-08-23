import { Outlet } from 'react-router-dom';
import Sidebar from '../shared/Sidebar';
import TopBar from '../shared/TopBar';
import { useState } from 'react';

export default function DashboardLayout({ role }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const sidebarWidth = sidebarCollapsed ? 60 : 220;

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#0F0F0F', color: '#F0EDE8', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        role={role}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(c => !c)}
      />

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <TopBar onMenuClick={() => setSidebarOpen(true)} role={role} collapsed={sidebarCollapsed} />
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          <div style={{ animation: 'trainerPageIn 220ms ease both' }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
