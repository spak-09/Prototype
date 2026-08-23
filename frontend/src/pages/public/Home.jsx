import { Link } from 'react-router-dom';

const programs = [
  { title: 'Strength', desc: 'High-intensity muscle-building cycles designed for visible performance gains.', bg: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80' },
  { title: 'Fat Loss', desc: 'Smart cardio and mobility routines tailored for sustainable body recomposition.', bg: 'https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&fit=crop&w=800&q=80' },
  { title: 'Functional Fitness', desc: 'Improve athleticism, endurance and movement quality for daily life and sport.', bg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80' },
  { title: 'Group Coaching', desc: 'Motivating community-based classes led by expert trainers in a premium environment.', bg: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80' },
];

const trainers = [
  { name: 'Rahul Sharma', role: 'Strength Coach', desc: '12+ years experience in powerlifting and hypertrophy.', photo: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80' },
  { name: 'Meghana Rao', role: 'Fat Loss Expert', desc: 'Specializes in body transformation and workout adherence.', photo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80' },
  { name: 'Vikram Reddy', role: 'HIIT & Conditioning', desc: 'Helps members improve endurance and conditioning with dynamic sessions.', photo: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80' },
  { name: 'Neha Iyer', role: 'Mobility Coach', desc: 'Focuses on posture, recovery routines and sustainable movement.', photo: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80' },
];

const plans = [
  { name: 'Basic', price: '₹1,499', period: '/mo', features: ['Gym floor access', '1 group class per week', 'Basic fitness assessment', 'Locker access'] },
  { name: 'Pro', price: '₹2,799', period: '/mo', popular: true, features: ['Unlimited gym access', 'All group classes', '1 trainer consultation', 'Nutrition guidance'] },
  { name: 'Elite Transformation', price: '₹4,499', period: '/mo', features: ['Dedicated personal training', 'Custom plan & check-ins', 'Progress tracking', 'Priority class booking'] },
];

const classes = [
  { name: 'Strength Training', time: 'Mon • 6:00 AM', trainer: 'Rahul Sharma' },
  { name: 'HIIT', time: 'Tue • 7:30 PM', trainer: 'Vikram Reddy' },
  { name: 'Functional Training', time: 'Wed • 6:30 AM', trainer: 'Neha Iyer' },
  { name: 'Fat Loss Circuit', time: 'Sat • 8:00 AM', trainer: 'Meghana Rao' },
];

const leaderboard = [
  { rank: 1, name: 'Aarav Reddy', lift: 'Deadlift 180 kg', points: 920, streak: 21 },
  { rank: 2, name: 'Rohit Kumar', lift: 'Bench 140 kg', points: 890, streak: 18 },
  { rank: 3, name: 'Vivek Nair', lift: 'Squat 165 kg', points: 865, streak: 15 },
  { rank: 4, name: 'Sneha Iyer', lift: 'Leg Press 220 kg', points: 840, streak: 14 },
];

const rankColors = { 1: '#F97316', 2: '#A8A29E', 3: '#C9A84C' };

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #0F0F0F 0%, #1a1a1a 50%, #0F0F0F 100%)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
          <div style={{ position: 'absolute', top: 80, left: 80, width: 288, height: 288, background: '#F97316', borderRadius: '50%', filter: 'blur(120px)' }} />
          <div style={{ position: 'absolute', bottom: 80, right: 80, width: 384, height: 384, background: '#EA580C', borderRadius: '50%', filter: 'blur(150px)' }} />
        </div>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px', position: 'relative', zIndex: 10, width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48, alignItems: 'center' }} className="lg:grid-cols-2">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 99, padding: '6px 16px', marginBottom: 24 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#FB923C' }}>⭐ 4.9/5 rating</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#F0EDE8', lineHeight: 1.1, marginBottom: 24, fontFamily: "'Outfit', sans-serif" }}>
                TRAIN HARDER.<br />
                <span style={{ color: '#F97316' }}>FEEL STRONGER.</span>
              </h1>
              <p style={{ fontSize: 17, color: '#6B7280', lineHeight: 1.7, maxWidth: 520, marginBottom: 32 }}>
                King Fitness Gym in Kukatpally, Hyderabad helps members build strength, lose fat, and stay consistent with expert coaching and motivating group classes.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
                <Link to="/register" className="btn-primary" style={{ padding: '14px 32px', fontSize: 15, borderRadius: 12 }}>
                  Join Now →
                </Link>
                <Link to="/membership" className="btn-ghost" style={{ padding: '14px 32px', fontSize: 15, borderRadius: 12 }}>
                  Explore Plans
                </Link>
              </div>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {['✅ Personal Training', '✅ 6 AM – 11 PM', '✅ Results Driven'].map((item) => (
                  <span key={item} style={{ fontSize: 13, color: '#A8A29E' }}>{item}</span>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative' }} className="hidden lg:block">
              <div style={{ width: '100%', height: 384, background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(249,115,22,0.05))', borderRadius: 24, border: '1px solid rgba(249,115,22,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width={120} height={120} viewBox="0 0 24 24" fill="none" stroke="rgba(249,115,22,0.3)" strokeWidth={1.5}>
                  <path d="M6.5 6.5h11M6.5 17.5h11M3 12h3M18 12h3M4.5 6.5a2 2 0 00-2 2v1a2 2 0 002 2M4.5 17.5a2 2 0 01-2-2v-1a2 2 0 012-2M19.5 6.5a2 2 0 012 2v1a2 2 0 01-2 2M19.5 17.5a2 2 0 002-2v-1a2 2 0 00-2-2" />
                </svg>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24, padding: '12px 16px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 10, width: 'fit-content' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
                <span style={{ fontSize: 13, color: '#22C55E' }}>Now welcoming new members — 2.4K+ already training with us</span>
              </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '64px 24px', background: '#0A0A0A' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
            {[
              { value: '2.4K+', label: 'Happy Members' },
              { value: '18+', label: 'Expert Trainers' },
              { value: '12+', label: 'Group Classes' },
              { value: '85%', label: 'Retention Rate' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display" style={{ fontSize: 36, fontWeight: 800, color: '#F97316', marginBottom: 4 }}>{stat.value}</div>
                <div style={{ fontSize: 13, color: '#6B7280' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section style={{ padding: '80px 24px', background: '#0F0F0F' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40 }}>
            <div>
              <div className="font-display" style={{ fontSize: 11, fontWeight: 600, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Programs</div>
              <h2 className="font-display" style={{ fontSize: 32, fontWeight: 800, color: '#F0EDE8', margin: 0 }}>Built for real transformation.</h2>
            </div>
            <Link to="/membership" className="btn-ghost" style={{ flexShrink: 0 }}>View Plans →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {programs.map((p) => (
              <div
                key={p.title}
                style={{
                  position: 'relative',
                  borderRadius: 14,
                  overflow: 'hidden',
                  height: 320,
                  border: '1px solid rgba(255,255,255,0.07)',
                  backgroundImage: `url(${p.bg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 20px' }}>
                  <h3 className="font-display" style={{ fontSize: 18, fontWeight: 800, color: '#F0EDE8', margin: '0 0 6px' }}>{p.title}</h3>
                  <p style={{ fontSize: 12, color: '#A8A29E', lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section style={{ padding: '80px 24px', background: '#141414' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 40 }}>
            <div className="font-display" style={{ fontSize: 11, fontWeight: 600, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Coaches</div>
            <h2 className="font-display" style={{ fontSize: 32, fontWeight: 800, color: '#F0EDE8', margin: 0 }}>Meet your transformation team.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {trainers.map((t) => (
              <div key={t.name} className="card" style={{ overflow: 'hidden' }}>
                <div style={{ height: 180, backgroundImage: `url(${t.photo})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ padding: '16px 18px' }}>
                  <span className="badge badge-orange" style={{ marginBottom: 8, display: 'inline-flex' }}>{t.role}</span>
                  <h3 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: '#F0EDE8', margin: '6px 0 4px' }}>{t.name}</h3>
                  <p style={{ fontSize: 12, color: '#6B7280', margin: 0, lineHeight: 1.5 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section style={{ padding: '80px 24px', background: '#0F0F0F' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="font-display" style={{ fontSize: 11, fontWeight: 600, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Memberships</div>
            <h2 className="font-display" style={{ fontSize: 32, fontWeight: 800, color: '#F0EDE8', margin: 0 }}>Flexible plans for every goal.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, maxWidth: 960, margin: '0 auto' }}>
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="card"
                style={{
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  borderColor: plan.popular ? 'rgba(249,115,22,0.3)' : undefined,
                  background: plan.popular ? 'linear-gradient(135deg, #181818, rgba(249,115,22,0.06))' : undefined,
                }}
              >
                {plan.popular && (
                  <span style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#F97316', color: '#0F0F0F', fontSize: 11, fontWeight: 700, padding: '3px 14px', borderRadius: 99 }}>
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="font-display" style={{ fontSize: 18, fontWeight: 800, color: '#F0EDE8', margin: '0 0 12px' }}>{plan.name}</h3>
                  <div style={{ marginBottom: 20 }}>
                    <span className="font-mono-data" style={{ fontSize: 32, fontWeight: 700, color: '#F0EDE8' }}>{plan.price}</span>
                    <span style={{ fontSize: 13, color: '#6B7280' }}>{plan.period}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                    {plan.features.map((f) => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#A8A29E' }}>
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth={2.5}><polyline points="20 6 9 17 4 12" /></svg>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
                <Link
                  to="/register"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '12px 24px',
                    borderRadius: 10,
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'opacity 0.15s',
                    background: plan.popular ? '#F97316' : 'rgba(255,255,255,0.06)',
                    color: plan.popular ? '#0F0F0F' : '#A8A29E',
                    border: plan.popular ? 'none' : '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  Choose Plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Classes */}
      <section style={{ padding: '80px 24px', background: '#141414' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 40 }}>
            <div className="font-display" style={{ fontSize: 11, fontWeight: 600, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Classes</div>
            <h2 className="font-display" style={{ fontSize: 32, fontWeight: 800, color: '#F0EDE8', margin: 0 }}>High-energy group sessions.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {classes.map((c) => (
              <div key={c.name} className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <h3 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: '#F0EDE8', margin: 0 }}>{c.name}</h3>
                <p style={{ fontSize: 12, color: '#6B7280', margin: 0 }}>Trainer: {c.trainer}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#A8A29E' }}>
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                  {c.time}
                </div>
                <Link to="/register" className="btn-ghost" style={{ textAlign: 'center', marginTop: 'auto', padding: '10px 16px' }}>Book Free Trial</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section style={{ padding: '80px 24px', background: '#0F0F0F' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32 }}>
            <div>
              <div className="font-display" style={{ fontSize: 11, fontWeight: 600, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Member Challenge</div>
              <h2 className="font-display" style={{ fontSize: 32, fontWeight: 800, color: '#F0EDE8', margin: 0 }}>Top performers this month.</h2>
            </div>
            <div className="badge badge-orange" style={{ padding: '6px 14px', fontSize: 12 }}>
              🏆 Community leaderboard
            </div>
          </div>

          {/* Table Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr 120px 120px', gap: 16, padding: '12px 20px', fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <span>Rank</span><span>Member</span><span>Best Lift</span><span>Points</span><span>Streak</span>
          </div>

          {leaderboard.map((m) => (
            <div
              key={m.rank}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 1fr 120px 120px',
                gap: 16,
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                transition: 'background 0.12s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 700,
                  background: rankColors[m.rank] ? `${rankColors[m.rank]}22` : 'rgba(255,255,255,0.04)',
                  color: rankColors[m.rank] || '#A8A29E',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {m.rank}
              </div>
              <div className="font-display" style={{ fontSize: 14, fontWeight: 600, color: '#F0EDE8' }}>{m.name}</div>
              <div style={{ fontSize: 13, color: '#A8A29E' }}>{m.lift}</div>
              <div className="font-mono-data" style={{ fontSize: 14, fontWeight: 600, color: '#F97316' }}>{m.points} pts</div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>{m.streak} day streak</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: 'linear-gradient(135deg, #F97316, #C2410C)', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="font-display" style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Start Today</div>
          <h2 className="font-display" style={{ fontSize: 36, fontWeight: 800, color: 'white', margin: '0 0 16px' }}>
            YOUR TRANSFORMATION <span style={{ color: '#0F0F0F' }}>STARTS HERE.</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: 32, maxWidth: 560, margin: '0 auto 32px' }}>
            Join 2.4K+ members training smarter at King Fitness Gym, Kukatpally. Book a free trial class and see the difference expert coaching makes.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn-primary" style={{ background: 'white', color: '#F97316', padding: '14px 32px', fontSize: 15, borderRadius: 12 }}>
              Book Free Trial
            </Link>
            <Link to="/membership" className="btn-ghost" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white', padding: '14px 32px', fontSize: 15, borderRadius: 12 }}>
              View Memberships
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
