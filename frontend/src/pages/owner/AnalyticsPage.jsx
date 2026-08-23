import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, IndianRupee, Calendar, Dumbbell } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PageHeader } from '../../components/shared/UIComponents';

const COLORS = ['#F97316', '#3B82F6', '#10B981', '#8B5CF6', '#EF4444', '#F59E0B'];

const revenueData = [
  { month: 'Jul', revenue: 320000, expenses: 180000 }, { month: 'Aug', revenue: 340000, expenses: 190000 },
  { month: 'Sep', revenue: 355000, expenses: 185000 }, { month: 'Oct', revenue: 365000, expenses: 195000 },
  { month: 'Nov', revenue: 375000, expenses: 200000 }, { month: 'Dec', revenue: 380000, expenses: 205000 },
];

const memberGrowthData = [
  { month: 'Jul', members: 85 }, { month: 'Aug', members: 92 }, { month: 'Sep', members: 98 },
  { month: 'Oct', members: 105 }, { month: 'Nov', members: 112 }, { month: 'Dec', members: 120 },
];

const attendanceTrend = [
  { month: 'Jul', rate: 65 }, { month: 'Aug', rate: 68 }, { month: 'Sep', rate: 72 },
  { month: 'Oct', rate: 70 }, { month: 'Nov', rate: 75 }, { month: 'Dec', rate: 78 },
];

const membershipDist = [
  { name: 'Monthly', value: 35, color: '#F97316' },
  { name: 'Quarterly', value: 42, color: '#3B82F6' },
  { name: 'Half-Yearly', value: 28, color: '#10B981' },
  { name: 'Annual', value: 15, color: '#8B5CF6' },
];

const popularWorkouts = [
  { name: 'Strength Training', sessions: 245 },
  { name: 'HIIT', sessions: 198 },
  { name: 'Yoga', sessions: 176 },
  { name: 'Cardio', sessions: 165 },
  { name: 'Kickboxing', sessions: 120 },
];

const churnData = [
  { month: 'Jul', churned: 3, joined: 8 }, { month: 'Aug', churned: 2, joined: 9 },
  { month: 'Sep', churned: 4, joined: 10 }, { month: 'Oct', churned: 3, joined: 10 },
  { month: 'Nov', churned: 2, joined: 9 }, { month: 'Dec', churned: 1, joined: 9 },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('6months');

  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" subtitle="Comprehensive gym performance metrics"
        actions={
          <select value={period} onChange={(e) => setPeriod(e.target.value)} className="bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm">
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
        } />

      {/* Revenue & Expenses */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Revenue vs Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
            <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}K`} />
            <Tooltip formatter={(v) => [`₹${(v/1000).toFixed(0)}K`, '']} />
            <Legend />
            <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
            <Area type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExpenses)" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Member Growth */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
          <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Member Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={memberGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="members" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6' }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Attendance Rate */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
          <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Attendance Rate (%)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip formatter={(v) => [`${v}%`, 'Rate']} />
              <Bar dataKey="rate" fill="#F97316" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Membership Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
          <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Membership Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={membershipDist} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {membershipDist.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Churn Analysis */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
          <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Churn Analysis</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={churnData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="joined" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="churned" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Popular Workouts */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Popular Workouts</h3>
        <div className="space-y-3">
          {popularWorkouts.map((w, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-sm font-medium text-[#A8A29E] w-32">{w.name}</span>
              <div className="flex-1 bg-[#222] rounded-full h-3">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-1000" style={{ width: `${(w.sessions / 245) * 100}%` }} />
              </div>
              <span className="text-sm font-semibold text-[#F0EDE8] w-12 text-right">{w.sessions}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
