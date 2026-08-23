import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, CalendarCheck, ClipboardList, Dumbbell, TrendingUp, Clock, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StatCard, PageHeader, LoadingSkeleton } from '../../components/shared/UIComponents';
import { api } from '../../services/api';

export default function TrainerDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.trainer.getDashboard();
        setDashboard(res.dashboard);
      } catch (error) { console.error(error); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  if (loading) return <div className="space-y-6"><PageHeader title="Trainer Dashboard" /><LoadingSkeleton rows={4} /></div>;

  const stats = [
    { icon: Users, label: 'Assigned Members', value: dashboard?.assignedMembers || 15, color: 'primary' },
    { icon: CalendarCheck, label: "Today's Sessions", value: dashboard?.todaySessions || 8, color: 'green' },
    { icon: ClipboardList, label: 'Pending Plans', value: dashboard?.pendingPlans || 3, color: 'yellow' },
    { icon: Dumbbell, label: 'Attendance Today', value: dashboard?.attendanceToday || 12, color: 'blue' },
  ];

  const weeklyPerformance = [
    { day: 'Mon', sessions: 8 }, { day: 'Tue', sessions: 7 }, { day: 'Wed', sessions: 9 },
    { day: 'Thu', sessions: 6 }, { day: 'Fri', sessions: 10 }, { day: 'Sat', sessions: 11 },
  ];

  const members = dashboard?.members || [];

  return (
    <div className="space-y-6">
      <PageHeader title="Trainer Dashboard" subtitle="Your coaching overview" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
          <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Weekly Sessions</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip />
              <Bar dataKey="sessions" fill="#3B82F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
          <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">My Members</h3>
          <div className="space-y-3 max-h-[250px] overflow-y-auto scrollbar-thin">
            {members.length > 0 ? members.map((m, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-[#1A1A1A] rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">{m.name.charAt(0)}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#F0EDE8]">{m.name}</p>
                  <p className="text-xs text-[#6B7280]">{m.fitnessGoal || 'General Fitness'}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#6B7280]">{m.weight}kg</p>
                  <p className="text-xs text-emerald-500 font-medium">{m.streak}d streak</p>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-[#6B7280] text-sm">No members assigned yet</div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: ClipboardList, label: 'Create Workout Plan', color: 'bg-primary-100 text-primary-600' },
            { icon: CalendarCheck, label: 'Mark Attendance', color: 'bg-emerald-100 text-emerald-600' },
            { icon: TrendingUp, label: 'Update Progress', color: 'bg-blue-100 text-blue-600' },
            { icon: Award, label: 'View Reports', color: 'bg-purple-100 text-purple-600' },
          ].map((action, i) => (
            <button key={i} className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-[#1A1A1A] transition-colors">
              <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center`}>
                <action.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-[#A8A29E]">{action.label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
