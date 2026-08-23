import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.07)', color: '#A8A29E' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div className="font-display" style={{ fontSize: 18, fontWeight: 800, letterSpacing: '0.15em', color: '#F0EDE8', marginBottom: 12 }}>
              KING <span style={{ color: '#F97316' }}>FITNESS</span>
            </div>
            <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7, maxWidth: 280 }}>
              Premium training, expert coaching, and a community built for real transformation in Kukatpally, Hyderabad.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {['Instagram', 'YouTube', 'Twitter'].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6B7280',
                    textDecoration: 'none',
                    fontSize: 12,
                    transition: 'background 0.15s, color 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(249,115,22,0.12)'; e.currentTarget.style.color = '#F97316'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#6B7280'; }}
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* The Club */}
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>The Club</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { to: '/about', label: 'About Us' },
                { to: '/membership', label: 'Membership Plans' },
                { to: '/trainers', label: 'Our Trainers' },
                { to: '/community', label: 'Community' },
                { to: '/gallery', label: 'Gallery' },
              ].map((link) => (
                <Link key={link.to} to={link.to} style={{ fontSize: 13, color: '#6B7280', textDecoration: 'none', transition: 'color 0.15s' }} onMouseEnter={e => e.currentTarget.style.color = '#F97316'} onMouseLeave={e => e.currentTarget.style.color = '#6B7280'}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Programs</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Strength Training', 'Fat Loss', 'Functional Fitness', 'Group Coaching', 'Yoga & Recovery'].map((item) => (
                <span key={item} style={{ fontSize: 13, color: '#6B7280' }}>{item}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Gym Hours</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: '#6B7280' }}>
              <span>6:00 AM – 11:00 PM Daily</span>
              <div style={{ width: 48, height: 1, background: '#F97316' }} />
              <span style={{ color: '#A8A29E' }}>T: +91 77024 82325</span>
              <span style={{ color: '#A8A29E' }}>info@kingfitnessgym.in</span>
              <span>Kukatpally, Hyderabad</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: '#4B5563', margin: 0 }}>© 2026 King Fitness Gym, Kukatpally. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Terms & Conditions', 'Privacy Policy'].map((link) => (
              <a key={link} href="#" style={{ fontSize: 12, color: '#4B5563', textDecoration: 'none', transition: 'color 0.15s' }} onMouseEnter={e => e.currentTarget.style.color = '#6B7280'} onMouseLeave={e => e.currentTarget.style.color = '#4B5563'}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
