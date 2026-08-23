import { useState, useEffect } from 'react';
import { Users, UserCheck, IndianRupee, CalendarCheck, RefreshCw, Dumbbell, TrendingUp, ArrowUpRight, Activity } from 'lucide-react';
import { StatCard, PageHeader, LoadingSkeleton } from '../../components/shared/UIComponents';
import { api } from '../../services/api';

export default function OwnerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.analytics.getDashboard();
        setData(res.dashboard);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div><PageHeader title="Dashboard" /><LoadingSkeleton rows={4} /></div>;

  const stats = [
    { icon: Users, label: 'Total Members', value: data?.totalMembers || 120, change: '+12 this month', changeType: 'up', color: 'primary' },
    { icon: UserCheck, label: 'Active Members', value: data?.activeMembers || 98, change: '82% active', changeType: 'up', color: 'green' },
    { icon: IndianRupee, label: 'Revenue This Month', value: `₹${((data?.revenueThisMonth || 380000) / 1000).toFixed(0)}K`, change: '+18% vs last month', changeType: 'up', color: 'blue' },
    { icon: CalendarCheck, label: 'Attendance Today', value: data?.attendanceToday || 67, change: '56% of members', changeType: 'up', color: 'purple' },
    { icon: RefreshCw, label: 'Renewals Due', value: data?.renewalsDue || 8, change: 'Next 7 days', changeType: 'down', color: 'yellow' },
    { icon: Dumbbell, label: 'Trainers Active', value: data?.activeTrainers || 8, change: 'All active', changeType: 'up', color: 'primary' },
  ];

  const revenueData = [
    { month: 'Jul', current: 320000, prev: 280000 }, { month: 'Aug', current: 340000, prev: 300000 },
    { month: 'Sep', current: 355000, prev: 315000 }, { month: 'Oct', current: 365000, prev: 325000 },
    { month: 'Nov', current: 375000, prev: 340000 }, { month: 'Dec', current: 380000, prev: 350000 },
  ];

  const attendanceData = [
    { day: 'Mon', count: 72 }, { day: 'Tue', count: 68 }, { day: 'Wed', count: 75 },
    { day: 'Thu', count: 65 }, { day: 'Fri', count: 80 }, { day: 'Sat', count: 85 }, { day: 'Sun', count: 45 },
  ];

  const recentActivity = [
    { action: 'New member joined', detail: 'Yamini Sharma - Monthly Plan', time: '2 min ago', type: 'member' },
    { action: 'Payment received', detail: '₹4,000 from Aarav Gupta', time: '15 min ago', type: 'payment' },
    { action: 'Attendance check-in', detail: 'Vikram Singh checked in', time: '30 min ago', type: 'attendance' },
    { action: 'Challenge completed', detail: 'Priya Sharma - Push-up Challenge', time: '1 hour ago', type: 'challenge' },
    { action: 'Membership renewed', detail: 'Suresh Patel - Annual Plan', time: '2 hours ago', type: 'renewal' },
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.current));
  const maxAttendance = Math.max(...attendanceData.map(d => d.count));

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Welcome back! Here's your gym overview." />

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Revenue Chart */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <h3 className="font-display" style={{ fontSize: 15, fontWeight: 700, color: '#F0EDE8', margin: '0 0 4px' }}>Revenue Trend</h3>
              <div style={{ fontSize: 11, color: '#6B7280' }}>Last 6 months</div>
            </div>
            <span className="badge badge-green">+18%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 160 }}>
            {revenueData.map((d) => (
              <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', gap: 4, height: 140 }}>
                  <div style={{ flex: 1, height: `${(d.current / maxRevenue) * 100}%`, background: '#F97316', borderRadius: '4px 4px 0 0', minHeight: 4, opacity: 0.9 }} />
                  <div style={{ flex: 1, height: `${(d.prev / maxRevenue) * 100}%`, background: 'rgba(255,255,255,0.08)', borderRadius: '4px 4px 0 0', minHeight: 4 }} />
                </div>
                <span style={{ fontSize: 10, color: '#6B7280' }}>{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Chart */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <h3 className="font-display" style={{ fontSize: 15, fontWeight: 700, color: '#F0EDE8', margin: '0 0 4px' }}>Weekly Attendance</h3>
              <div style={{ fontSize: 11, color: '#6B7280' }}>This week</div>
            </div>
            <span className="badge badge-green">+6.4%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 160 }}>
            {attendanceData.map((d) => (
              <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: '100%', height: `${(d.count / maxAttendance) * 100}%`, background: '#F97316', borderRadius: '4px 4px 0 0', minHeight: 4, opacity: 0.85 }} />
                <span style={{ fontSize: 10, color: '#6B7280' }}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity & Recent */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
        {/* Quick Actions */}
        <div className="card" style={{ padding: '20px' }}>
          <h3 className="font-display" style={{ fontSize: 15, fontWeight: 700, color: '#F0EDE8', margin: '0 0 14px' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'Add New Member', page: '/owner/members' },
              { label: 'Mark Attendance', page: '/owner/attendance' },
              { label: 'View Payments', page: '/owner/payments' },
              { label: 'Manage Trainers', page: '/owner/trainers' },
              { label: 'Post Announcement', page: '/owner/community' },
            ].map((action) => (
              <a
                key={action.label}
                href={action.page}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 12px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 8,
                  fontSize: 13,
                  color: '#A8A29E',
                  textDecoration: 'none',
                  transition: 'background 0.12s, color 0.12s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(249,115,22,0.08)'; e.currentTarget.style.color = '#F97316'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#A8A29E'; }}
              >
                <span style={{ flex: 1 }}>{action.label}</span>
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M9 18l6-6-6-6" /></svg>
              </a>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card" style={{ padding: '20px' }}>
          <h3 className="font-display" style={{ fontSize: 15, fontWeight: 700, color: '#F0EDE8', margin: '0 0 14px' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {recentActivity.map((activity, i) => {
              const iconMap = { member: '#38BDF8', payment: '#22C55E', attendance: '#F97316', challenge: '#A78BFA', renewal: '#F59E0B' };
              return (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: i < recentActivity.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: `${iconMap[activity.type]}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>
                    {activity.type === 'member' ? '👤' : activity.type === 'payment' ? '💳' : activity.type === 'attendance' ? '✅' : activity.type === 'challenge' ? '🏆' : '🔄'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#F0EDE8' }}>{activity.action}</div>
                    <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{activity.detail}</div>
                  </div>
                  <span style={{ fontSize: 11, color: '#4B5563', flexShrink: 0 }}>{activity.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
