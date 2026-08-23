export default function Community() {
  return (
    <div>
      <section style={{ padding: '96px 24px', background: 'linear-gradient(135deg, #0F0F0F, #1a1a1a)', textAlign: 'center' }}>
        <h1 className="font-display" style={{ fontSize: 40, fontWeight: 800, color: '#F0EDE8', marginBottom: 12 }}>Community</h1>
        <p style={{ fontSize: 16, color: '#6B7280', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>Join 2.4K+ members training together at King Fitness Gym.</p>
      </section>

      <section style={{ padding: '80px 24px', background: '#0F0F0F' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { title: 'Workout of the Week', desc: 'Full-body strength circuit. 45 min, all levels.', badge: 'Featured', color: '#F97316' },
              { title: 'Nutrition Tips', desc: 'High-protein meal prep ideas for busy schedules.', badge: 'Nutrition', color: '#22C55E' },
              { title: 'Member Spotlight', desc: 'Aarav lost 12kg in 3 months. Read his story.', badge: 'Success', color: '#F59E0B' },
              { title: '30-Day Challenge', desc: 'Complete 24 sessions in 30 days and earn 500 points.', badge: 'Challenge', color: '#A78BFA' },
              { title: 'Recovery Guide', desc: 'Best practices for rest days and active recovery.', badge: 'Health', color: '#38BDF8' },
              { title: 'Group Class Schedule', desc: 'New morning yoga sessions starting next Monday.', badge: 'Schedule', color: '#F472B6' },
            ].map((post, i) => (
              <div key={i} className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span className="badge" style={{ background: `${post.color}18`, color: post.color, width: 'fit-content' }}>{post.badge}</span>
                <h3 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: '#F0EDE8', margin: 0 }}>{post.title}</h3>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, margin: 0 }}>{post.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 'auto', paddingTop: 8 }}>
                  <span style={{ fontSize: 12, color: '#4B5563' }}>❤️ {Math.floor(Math.random() * 50 + 10)}</span>
                  <span style={{ fontSize: 12, color: '#4B5563' }}>💬 {Math.floor(Math.random() * 20 + 3)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
