const testimonials = [
  { name: 'Aarav Reddy', text: 'Lost 12kg in 3 months! The trainers here are amazing and the community keeps me motivated.', rating: 5, points: 920 },
  { name: 'Rohit Kumar', text: 'Best gym in Kukatpally. Clean, modern, and motivating environment. Love the group classes.', rating: 5, points: 890 },
  { name: 'Vivek Nair', text: 'The community challenges keep me motivated. The gamification system is brilliant!', rating: 5, points: 865 },
  { name: 'Sneha Iyer', text: 'Personal training sessions transformed my fitness. Down 8kg and feeling stronger than ever.', rating: 5, points: 840 },
  { name: 'Priya Sharma', text: 'The nutrition guidance combined with regular workouts gave me results I never thought possible.', rating: 5, points: 810 },
  { name: 'Vikram Reddy', text: 'State-of-the-art equipment and expert coaches. This gym has everything you need.', rating: 4, points: 780 },
];

export default function Testimonials() {
  return (
    <div>
      <section style={{ padding: '96px 24px', background: 'linear-gradient(135deg, #0F0F0F, #1a1a1a)', textAlign: 'center' }}>
        <h1 className="font-display" style={{ fontSize: 40, fontWeight: 800, color: '#F0EDE8', marginBottom: 12 }}>What Our Members Say</h1>
        <p style={{ fontSize: 16, color: '#6B7280', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>Real stories from real members at King Fitness Gym.</p>
      </section>

      <section style={{ padding: '80px 24px', background: '#0F0F0F' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {testimonials.map((t, i) => (
              <div key={i} className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} style={{ color: '#F59E0B', fontSize: 16 }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: 14, color: '#A8A29E', lineHeight: 1.7, marginBottom: 16, fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="avatar" style={{ width: 40, height: 40, background: '#F97316', color: '#0F0F0F', fontSize: 14 }}>
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#F0EDE8', margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: 11, color: '#6B7280', margin: 0 }}>{t.points} FitPoints</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
