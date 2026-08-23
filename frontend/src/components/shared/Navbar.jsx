import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/membership', label: 'Membership' },
  { path: '/trainers', label: 'Trainers' },
  { path: '/community', label: 'Community' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'rgba(15,15,15,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 38, height: 38, background: 'linear-gradient(135deg, #F97316, #EA580C)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6.5 6.5h11M6.5 17.5h11M3 12h3M18 12h3M4.5 6.5a2 2 0 00-2 2v1a2 2 0 002 2M4.5 17.5a2 2 0 01-2-2v-1a2 2 0 012-2M19.5 6.5a2 2 0 012 2v1a2 2 0 01-2 2M19.5 17.5a2 2 0 002-2v-1a2 2 0 00-2-2" />
                </svg>
              </div>
              <span className="font-display" style={{ fontSize: 18, fontWeight: 800, letterSpacing: '0.15em', color: '#F0EDE8' }}>
                KING <span style={{ color: '#F97316' }}>FITNESS</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'background 0.15s, color 0.15s',
                    background: location.pathname === link.path ? 'rgba(249,115,22,0.12)' : 'transparent',
                    color: location.pathname === link.path ? '#F97316' : '#A8A29E',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="hidden lg:flex">
              <Link
                to="/login"
                style={{
                  padding: '8px 20px',
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#A8A29E',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  transition: 'color 0.15s',
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{
                  padding: '8px 20px',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#0F0F0F',
                  textDecoration: 'none',
                  background: '#F97316',
                  borderRadius: 8,
                  transition: 'opacity 0.15s',
                }}
              >
                Join Now
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A8A29E', padding: 4, display: 'none' }}
              className="lg:hidden mobile-menu-btn"
            >
              {isOpen ? (
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              ) : (
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 64,
            left: 0,
            right: 0,
            background: '#141414',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            zIndex: 49,
            padding: '16px 24px',
          }}
          className="lg:hidden"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '12px 14px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: location.pathname === link.path ? '#F97316' : '#A8A29E',
                  background: location.pathname === link.path ? 'rgba(249,115,22,0.08)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ display: 'flex', gap: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 8 }}>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                style={{ flex: 1, textAlign: 'center', padding: '12px', fontSize: 14, fontWeight: 500, color: '#A8A29E', background: 'rgba(255,255,255,0.04)', borderRadius: 8, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                style={{ flex: 1, textAlign: 'center', padding: '12px', fontSize: 14, fontWeight: 600, color: '#0F0F0F', background: '#F97316', borderRadius: 8, textDecoration: 'none' }}
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div style={{ height: 64 }} />
    </>
  );
}
