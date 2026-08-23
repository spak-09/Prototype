export default function Contact() {
  return (
    <div>
      <section style={{ padding: '96px 24px', background: 'linear-gradient(135deg, #0F0F0F, #1a1a1a)', textAlign: 'center' }}>
        <h1 className="font-display" style={{ fontSize: 40, fontWeight: 800, color: '#F0EDE8', marginBottom: 12 }}>Contact Us</h1>
        <p style={{ fontSize: 16, color: '#6B7280', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>Have questions? We'd love to hear from you.</p>
      </section>

      <section style={{ padding: '80px 24px', background: '#0F0F0F' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }} className="lg:grid-cols-2">
          {/* Contact Info */}
          <div>
            <h2 className="font-display" style={{ fontSize: 24, fontWeight: 800, color: '#F0EDE8', marginBottom: 24 }}>Get in Touch</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { label: 'Address', value: 'Kukatpally, Hyderabad, Telangana 500072', icon: '📍' },
                { label: 'Phone', value: '+91 77024 82325', icon: '📞' },
                { label: 'Email', value: 'demo@kingfitnessgym.in', icon: '✉️' },
                { label: 'Hours', value: '6:00 AM – 11:00 PM Daily', icon: '🕐' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(249,115,22,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#F0EDE8', marginBottom: 2 }}>{item.label}</p>
                    <p style={{ fontSize: 13, color: '#6B7280' }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="card" style={{ padding: 32 }}>
            <h2 className="font-display" style={{ fontSize: 24, fontWeight: 800, color: '#F0EDE8', marginBottom: 24 }}>Send a Message</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }} onSubmit={(e) => e.preventDefault()}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <input type="text" placeholder="First Name" style={{ width: '100%', padding: '12px 14px', background: '#181818', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#F0EDE8', fontSize: 14, outline: 'none' }} />
                <input type="text" placeholder="Last Name" style={{ width: '100%', padding: '12px 14px', background: '#181818', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#F0EDE8', fontSize: 14, outline: 'none' }} />
              </div>
              <input type="email" placeholder="Email" style={{ width: '100%', padding: '12px 14px', background: '#181818', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#F0EDE8', fontSize: 14, outline: 'none' }} />
              <input type="tel" placeholder="Phone" style={{ width: '100%', padding: '12px 14px', background: '#181818', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#F0EDE8', fontSize: 14, outline: 'none' }} />
              <textarea rows={4} placeholder="Tell us how we can help..." style={{ width: '100%', padding: '12px 14px', background: '#181818', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#F0EDE8', fontSize: 14, outline: 'none', resize: 'none' }} />
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px 24px', fontSize: 14, borderRadius: 10 }}>Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
