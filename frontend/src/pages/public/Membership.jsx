import { Link } from 'react-router-dom';

const plans = [
  { name: 'Basic', price: '₹1,499', period: '/mo', features: ['Gym floor access', '1 group class per week', 'Basic fitness assessment', 'Locker access'] },
  { name: 'Pro', price: '₹2,799', period: '/mo', popular: true, features: ['Unlimited gym access', 'All group classes', '1 trainer consultation', 'Nutrition guidance', 'Community challenges'] },
  { name: 'Half-Yearly', price: '₹7,500', period: '/6 months', features: ['Full gym access', 'All classes', 'Dedicated trainer', 'Advanced analytics', 'Custom meal plans', 'Priority support', 'Guest passes'] },
  { name: 'Annual', price: '₹14,000', period: '/year', features: ['Full gym access', 'All classes & programs', 'Dedicated trainer', 'Full analytics dashboard', 'Custom meal plans', 'Priority support', 'Guest passes', 'Free merchandise'] },
];

export default function Membership() {
  return (
    <div>
      <section style={{ padding: '96px 24px', background: 'linear-gradient(135deg, #0F0F0F, #1a1a1a)', textAlign: 'center' }}>
        <h1 className="font-display" style={{ fontSize: 40, fontWeight: 800, color: '#F0EDE8', marginBottom: 12 }}>Membership Plans</h1>
        <p style={{ fontSize: 16, color: '#6B7280', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>Choose the plan that fits your fitness goals. All plans include full gym access.</p>
      </section>

      <section style={{ padding: '80px 24px', background: '#0F0F0F' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {plans.map((plan, i) => (
              <div
                key={i}
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
                    Popular
                  </span>
                )}
                <div>
                  <h3 className="font-display" style={{ fontSize: 18, fontWeight: 800, color: '#F0EDE8', marginBottom: 8 }}>{plan.name}</h3>
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
                    background: plan.popular ? '#F97316' : 'rgba(255,255,255,0.06)',
                    color: plan.popular ? '#0F0F0F' : '#A8A29E',
                    border: plan.popular ? 'none' : '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
