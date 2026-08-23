import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Award, CalendarCheck, TrendingUp, Heart, Zap, Trophy, Target, Dumbbell, ArrowRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StatCard, PageHeader, Badge } from '../../components/shared/UIComponents';
import { useAuthStore } from '../../stores/authStore';
import { api } from '../../services/api';

const weeklyActivity = [
  { day: 'Mon', calories: 450, steps: 8500 },
  { day: 'Tue', calories: 380, steps: 7200 },
  { day: 'Wed', calories: 520, steps: 9800 },
  { day: 'Thu', calories: 300, steps: 6500 },
  { day: 'Fri', calories: 480, steps: 8900 },
  { day: 'Sat', calories: 550, steps: 10200 },
  { day: 'Sun', calories: 200, steps: 4500 },
];

export default function MemberDashboard() {
  const { user } = useAuthStore();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.leaderboard.get();
        setLeaderboard(res.leaderboard);
      } catch (error) { console.error(error); }
    };
    fetchData();
  }, []);

  const stats = [
    { icon: Flame, label: 'Calories Burned', value: '2,880', change: '+12% this week', changeType: 'up', color: 'primary' },
    { icon: Zap, label: 'Current Streak', value: `${user?.streak || 12} days`, color: 'green' },
    { icon: CalendarCheck, label: 'Attendance', value: `${user?.attendanceCount || 156}`, change: 'This month: 18', changeType: 'up', color: 'blue' },
    { icon: Award, label: 'Reward Points', value: `${user?.rewardPoints || 1250}`, color: 'purple' },
    { icon: TrendingUp, label: 'BMI', value: user?.weight && user?.height ? (user.weight / ((user.height/100) ** 2)).toFixed(1) : '22.5', color: 'yellow' },
    { icon: Heart, label: 'Progress', value: '78%', change: '+5% this month', changeType: 'up', color: 'primary' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title={`Welcome, ${user?.name?.split(' ')[0] || 'Member'}! 👋`} subtitle="Here's your fitness overview for today." />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Activity Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 bg-[#181818] rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#F0EDE8]">Weekly Activity</h3>
            <Badge variant="primary">This Week</Badge>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={weeklyActivity}>
              <defs>
                <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip />
              <Area type="monotone" dataKey="calories" stroke="#F97316" strokeWidth={2} fillOpacity={1} fill="url(#colorCal)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Upcoming Class */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
          <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Upcoming Class</h3>
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-5 text-white">
            <Dumbbell className="w-8 h-8 mb-3 opacity-80" />
            <h4 className="text-lg font-bold mb-1">Morning HIIT</h4>
            <p className="text-sm text-primary-100">Today at 6:00 AM</p>
            <p className="text-sm text-primary-100">Trainer: Rajesh Kumar</p>
            <p className="text-sm text-primary-100 mt-2">45 min • ~400 cal</p>
          </div>

          <h3 className="text-lg font-semibold text-[#F0EDE8] mt-6 mb-3">Active Challenge</h3>
          <div className="bg-[#1A1A1A] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium text-[#F0EDE8]">30-Day Transformation</span>
            </div>
            <div className="w-full bg-[#2A2A2A] rounded-full h-2 mb-1">
              <div className="bg-primary-500 h-2 rounded-full" style={{ width: '65%' }} />
            </div>
            <p className="text-xs text-[#6B7280]">18/30 days completed</p>
          </div>
        </motion.div>
      </div>

      {/* Leaderboard Preview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#F0EDE8]">Leaderboard</h3>
          <Badge variant="primary">Top 5</Badge>
        </div>
        <div className="space-y-2">
          {leaderboard.slice(0, 5).map((member, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-[#1A1A1A] rounded-xl">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i === 0 ? 'bg-amber-100 text-amber-700' : i === 1 ? 'bg-[#2A2A2A] text-gray-600' : i === 2 ? 'bg-orange-100 text-orange-700' : 'bg-[#222] text-[#6B7280]'
              }`}>{i + 1}</span>
              <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold">{member.name?.charAt(0)}</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#F0EDE8]">{member.name}</p>
              </div>
              <span className="text-sm font-semibold text-[#F0EDE8]">{member.rewardPoints} pts</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
