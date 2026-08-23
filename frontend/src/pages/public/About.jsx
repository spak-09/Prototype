const facilities = [
  { name: 'Modern Equipment', desc: 'Latest machines from Technogym and Life Fitness', icon: '🏋️' },
  { name: 'Yoga Studio', desc: 'Dedicated space for yoga and meditation sessions', icon: '🧘' },
  { name: 'HIIT Zone', desc: 'Specialized area for high-intensity interval training', icon: '⚡' },
  { name: 'Locker Rooms', desc: 'Clean, secure locker rooms with shower facilities', icon: '🚿' },
  { name: 'Group Classes', desc: '35+ weekly classes including Zumba, Spin, and more', icon: '👥' },
  { name: 'Recovery Zone', desc: 'Sauna, steam room, and massage services', icon: '💆' },
];

const team = [
  { name: 'Kiran Kumar', role: 'Founder & Owner', desc: '15+ years in fitness industry. Passionate about building community.' },
  { name: 'Rajesh Kumar', role: 'Head Trainer', desc: 'NSCA-CPT certified. 8 years experience in strength training.' },
  { name: 'Priya Sharma', role: 'Yoga Instructor', desc: 'RYT-200 certified. Expert in yoga and flexibility training.' },
  { name: 'Vikram Singh', role: 'Cardio Specialist', desc: 'ACE-CPT certified. HIIT and endurance training expert.' },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section style={{ padding: '96px 24px', background: 'linear-gradient(135deg, #0F0F0F, #1a1a1a)', textAlign: 'center' }}>
        <h1 className="font-display" style={{ fontSize: 40, fontWeight: 800, color: '#F0EDE8', marginBottom: 12 }}>About King Fitness Gym</h1>
        <p style={{ fontSize: 16, color: '#6B7280', maxWidth: 640, margin: '0 auto', lineHeight: 1.7 }}>Your premier fitness destination in Kukatpally, Hyderabad.</p>
      </section>

      {/* Story */}
      <section style={{ padding: '80px 24px', background: '#0F0F0F' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }} className="lg:grid-cols-2">
            <div>
              <h2 className="font-display" style={{ fontSize: 32, fontWeight: 800, color: '#F0EDE8', marginBottom: 24 }}>Our Story</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: 15, color: '#A8A29E', lineHeight: 1.8 }}>
                <p>Founded in 2019, King Fitness Gym started with a simple mission: to make fitness accessible, enjoyable, and transformative for everyone in Kukatpally and surrounding areas.</p>
                <p>What began as a small 2,000 sq ft gym has grown into a 10,000 sq ft state-of-the-art fitness facility serving over 2,400 active members with 18 certified trainers.</p>
                <p>Our community-driven approach, combined with cutting-edge equipment and personalized training programs, has helped hundreds of members achieve their fitness goals.</p>
              </div>
            </div>
            <div style={{ borderRadius: 24, padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(249,115,22,0.1), rgba(249,115,22,0.03))', border: '1px solid rgba(249,115,22,0.15)' }}>
              <span style={{ fontSize: 120 }}>💪</span>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section style={{ padding: '80px 24px', background: '#141414' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 32, fontWeight: 800, color: '#F0EDE8', textAlign: 'center', marginBottom: 48 }}>Our Facilities</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {facilities.map((f, i) => (
              <div key={i} className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
                <h3 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: '#F0EDE8', marginBottom: 8 }}>{f.name}</h3>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '80px 24px', background: '#0F0F0F' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 32, fontWeight: 800, color: '#F0EDE8', textAlign: 'center', marginBottom: 48 }}>Meet Our Team</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {team.map((member, i) => (
              <div key={i} className="card" style={{ padding: 24, textAlign: 'center' }}>
                <div className="avatar" style={{ width: 72, height: 72, background: '#F97316', color: '#0F0F0F', fontSize: 24, margin: '0 auto 16px' }}>
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: '#F0EDE8', marginBottom: 4 }}>{member.name}</h3>
                <p style={{ fontSize: 13, color: '#F97316', fontWeight: 500, marginBottom: 8 }}>{member.role}</p>
                <p style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.6 }}>{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
