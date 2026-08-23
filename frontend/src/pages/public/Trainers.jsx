const trainers = [
  { name: 'Rahul Sharma', specialty: 'Strength Coach', experience: '12 years', rating: 4.9, certs: ['NSCA-CPT', 'Powerlifting'], availability: 'Mon-Sat 6AM-2PM', photo: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80' },
  { name: 'Meghana Rao', specialty: 'Fat Loss Expert', experience: '8 years', rating: 4.8, certs: ['ACE-CPT', 'Nutrition'], availability: 'Mon-Sat 7AM-3PM', photo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80' },
  { name: 'Vikram Reddy', specialty: 'HIIT & Conditioning', experience: '7 years', rating: 4.7, certs: ['ACE-CPT', 'CrossFit L1'], availability: 'Mon-Sat 5AM-1PM', photo: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80' },
  { name: 'Neha Iyer', specialty: 'Mobility Coach', experience: '6 years', rating: 4.8, certs: ['RYT-200', 'Yoga Alliance'], availability: 'Mon-Sat 8AM-4PM', photo: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80' },
  { name: 'Suresh Patel', specialty: 'Bodybuilding', experience: '10 years', rating: 4.9, certs: ['IFBB Certified', 'NSCA-CSCS'], availability: 'Mon-Sat 5AM-11AM', photo: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80' },
  { name: 'Deepika Nair', specialty: 'Pilates & Core', experience: '5 years', rating: 4.6, certs: ['PMA-CPT', 'ACE-GFI'], availability: 'Mon-Sat 8AM-4PM', photo: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80' },
  { name: 'Arjun Mehta', specialty: 'Functional Training', experience: '6 years', rating: 4.7, certs: ['ACE-CPT', 'TRX'], availability: 'Mon-Sat 6AM-2PM', photo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80' },
  { name: 'Kavitha Iyer', specialty: 'Kickboxing', experience: '5 years', rating: 4.8, certs: ['ISSA-CPT', 'Kickboxing'], availability: 'Mon-Sat 7AM-3PM', photo: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80' },
];

export default function Trainers() {
  return (
    <div>
      <section style={{ padding: '96px 24px', background: 'linear-gradient(135deg, #0F0F0F, #1a1a1a)', textAlign: 'center' }}>
        <h1 className="font-display" style={{ fontSize: 40, fontWeight: 800, color: '#F0EDE8', marginBottom: 12 }}>Our Trainers</h1>
        <p style={{ fontSize: 16, color: '#6B7280', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>Expert certified trainers dedicated to your fitness journey.</p>
      </section>

      <section style={{ padding: '80px 24px', background: '#0F0F0F' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {trainers.map((trainer, i) => (
              <div key={i} className="card" style={{ overflow: 'hidden' }}>
                <div style={{ height: 180, backgroundImage: `url(${trainer.photo})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {!trainer.photo && <span style={{ fontSize: 48, fontWeight: 700, color: 'rgba(255,255,255,0.3)' }}>{trainer.name.charAt(0)}</span>}
                </div>
                <div style={{ padding: '16px 18px' }}>
                  <span className="badge badge-orange" style={{ marginBottom: 8, display: 'inline-flex' }}>{trainer.specialty}</span>
                  <h3 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: '#F0EDE8', margin: '6px 0 4px' }}>{trainer.name}</h3>
                  <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#6B7280', marginBottom: 8 }}>
                    <span>⭐ {trainer.rating}</span>
                    <span>{trainer.experience}</span>
                  </div>
                  <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 8 }}>🕐 {trainer.availability}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {trainer.certs.map((cert, j) => (
                      <span key={j} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 99, background: 'rgba(249,115,22,0.1)', color: '#F97316' }}>{cert}</span>
                    ))}
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
