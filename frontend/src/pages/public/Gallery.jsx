export default function Gallery() {
  const images = [
    { url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80', label: 'Gym Equipment' },
    { url: 'https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&fit=crop&w=700&q=80', label: 'Fitness Training' },
    { url: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=700&q=80', label: 'Trainer Coaching' },
    { url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80', label: 'Gym Interior' },
    { url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80', label: 'Group Class' },
    { url: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=700&q=80', label: 'HIIT Session' },
  ];

  return (
    <div>
      <section style={{ padding: '96px 24px', background: 'linear-gradient(135deg, #0F0F0F, #1a1a1a)', textAlign: 'center' }}>
        <h1 className="font-display" style={{ fontSize: 40, fontWeight: 800, color: '#F0EDE8', marginBottom: 12 }}>Gallery</h1>
        <p style={{ fontSize: 16, color: '#6B7280', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>Results, energy and community.</p>
      </section>

      <section style={{ padding: '80px 24px', background: '#0F0F0F' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {images.map((img, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  borderRadius: 14,
                  overflow: 'hidden',
                  height: i === 0 ? 320 : 240,
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <img src={img.url} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 18px', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#F0EDE8' }}>{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
