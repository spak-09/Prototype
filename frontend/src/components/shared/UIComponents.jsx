// Dark theme UI components matching king-fitness-demo design

// Stat Card
export function StatCard({ icon: Icon, label, value, change, changeType, color = 'primary' }) {
  const colorMap = {
    primary: '#F97316',
    blue: '#38BDF8',
    green: '#22C55E',
    purple: '#A78BFA',
    red: '#EF4444',
    yellow: '#F59E0B',
  };
  const c = colorMap[color] || colorMap.primary;

  return (
    <div className="card" style={{ padding: '16px 18px', cursor: 'default' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div style={{ color: c, opacity: 0.9 }}>
          {Icon && <Icon />}
        </div>
      </div>
      <div className="font-mono-data" style={{ fontSize: 28, fontWeight: 600, color: '#F0EDE8', lineHeight: 1, marginBottom: 4 }}>
        {value}
      </div>
      <div style={{ fontSize: 12.5, fontWeight: 500, color: '#A8A29E', marginBottom: 4 }}>{label}</div>
      {change && (
        <div style={{ fontSize: 11.5, color: changeType === 'up' ? '#22C55E' : changeType === 'down' ? '#EF4444' : c }}>
          {change}
        </div>
      )}
    </div>
  );
}

// Modal
export function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null;
  const sizeMap = { sm: '420px', md: '520px', lg: '680px', xl: '800px' };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
      <div style={{ position: 'relative', background: '#181818', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, width: '100%', maxWidth: sizeMap[size], maxHeight: '90vh', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#F0EDE8', margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 8, padding: '6px 8px', cursor: 'pointer', color: '#6B7280', display: 'flex', alignItems: 'center' }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        <div style={{ padding: 20, overflowY: 'auto', maxHeight: 'calc(90vh - 60px)' }}>{children}</div>
      </div>
    </div>
  );
}

// Badge
export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'badge-gray',
    primary: 'badge-orange',
    success: 'badge-green',
    warning: 'badge-amber',
    danger: 'badge-red',
    info: 'badge-gray',
  };
  return <span className={`badge ${variants[variant] || 'badge-gray'} ${className}`}>{children}</span>;
}

// Empty State
export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 16px', textAlign: 'center' }}>
      <div style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        {Icon ? <Icon /> : <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={1.5}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>}
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#F0EDE8', marginBottom: 4 }}>{title}</h3>
      <p style={{ fontSize: 13, color: '#6B7280', maxWidth: 320 }}>{description}</p>
      {action && <div style={{ marginTop: 16 }}>{action}</div>}
    </div>
  );
}

// Loading Skeleton
export function LoadingSkeleton({ rows = 5 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.04)', animation: 'fadeIn 1s ease infinite alternate' }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ height: 12, width: '30%', borderRadius: 4, background: 'rgba(255,255,255,0.04)' }} />
            <div style={{ height: 10, width: '50%', borderRadius: 4, background: 'rgba(255,255,255,0.03)' }} />
          </div>
          <div style={{ height: 28, width: 80, borderRadius: 6, background: 'rgba(255,255,255,0.04)' }} />
        </div>
      ))}
    </div>
  );
}

// Page Header
export function PageHeader({ title, subtitle, actions }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start', marginBottom: 20 }}>
      <div>
        <h1 className="font-display" style={{ fontSize: 22, fontWeight: 800, color: '#F0EDE8', margin: '0 0 4px' }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>{subtitle}</p>}
      </div>
      {actions && <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>{actions}</div>}
    </div>
  );
}

// Button
export function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-ghost',
    danger: 'btn-danger',
    outline: 'btn-ghost',
    ghost: 'btn-ghost',
    success: 'btn-success',
  };
  return (
    <button className={`${variants[variant] || 'btn-primary'} ${className}`} {...props}>
      {children}
    </button>
  );
}

// Search Input
export function SearchInput({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#222', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 7, padding: '6px 10px', flex: 1 }}>
      <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ background: 'none', border: 'none', outline: 'none', fontSize: 13, color: '#F0EDE8', width: '100%', padding: 0 }}
      />
    </div>
  );
}
