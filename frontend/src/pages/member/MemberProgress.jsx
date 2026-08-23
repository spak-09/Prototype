import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Scale, Camera, Ruler } from 'lucide-react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PageHeader, Badge, StatCard } from '../../components/shared/UIComponents';
import { useAuthStore } from '../../stores/authStore';

const weightData = [
  { month: 'Jul', weight: 78 }, { month: 'Aug', weight: 76.5 }, { month: 'Sep', weight: 75 },
  { month: 'Oct', weight: 74 }, { month: 'Nov', weight: 73 }, { month: 'Dec', weight: 72 },
];

const bmiData = [
  { month: 'Jul', bmi: 26.2 }, { month: 'Aug', bmi: 25.7 }, { month: 'Sep', bmi: 25.2 },
  { month: 'Oct', bmi: 24.8 }, { month: 'Nov', bmi: 24.5 }, { month: 'Dec', bmi: 24.2 },
];

const strengthData = [
  { month: 'Jul', bench: 60, squat: 80, deadlift: 100 },
  { month: 'Aug', bench: 65, squat: 85, deadlift: 110 },
  { month: 'Sep', bench: 70, squat: 90, deadlift: 120 },
  { month: 'Oct', bench: 72, squat: 95, deadlift: 130 },
  { month: 'Nov', bench: 75, squat: 100, deadlift: 140 },
  { month: 'Dec', bench: 80, squat: 105, deadlift: 150 },
];

const measurements = [
  { date: 'Dec 1', chest: '42"', waist: '34"', arms: '15"', thighs: '24"' },
  { date: 'Nov 1', chest: '41.5"', waist: '34.5"', arms: '14.5"', thighs: '23.5"' },
  { date: 'Oct 1', chest: '41"', waist: '35"', arms: '14"', thighs: '23"' },
  { date: 'Sep 1', chest: '40.5"', waist: '35.5"', arms: '13.5"', thighs: '22.5"' },
];

export default function MemberProgress() {
  const { user } = useAuthStore();
  const [activeChart, setActiveChart] = useState('weight');

  return (
    <div className="space-y-6">
      <PageHeader title="My Progress" subtitle="Track your fitness journey over time" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Scale} label="Current Weight" value={`${user?.weight || 72} kg`} change="-6kg total" changeType="up" color="primary" />
        <StatCard icon={TrendingUp} label="BMI" value={user?.weight && user?.height ? (user.weight / ((user.height/100) ** 2)).toFixed(1) : '24.2'} change="Healthy range" color="green" />
        <StatCard icon={TrendingUp} label="Strength Gain" value="+25%" change="Last 6 months" changeType="up" color="blue" />
        <StatCard icon={Camera} label="Progress Photos" value="12" color="purple" />
      </div>

      {/* Chart Selector */}
      <div className="flex gap-1 bg-[#222] rounded-xl p-1 w-fit">
        {['weight', 'bmi', 'strength'].map((chart) => (
          <button key={chart} onClick={() => setActiveChart(chart)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeChart === chart ? 'bg-[#181818] text-[#F0EDE8] shadow-sm' : 'text-[#6B7280] hover:text-[#A8A29E]'}`}>
            {chart}
          </button>
        ))}
      </div>

      {/* Charts */}
      <motion.div key={activeChart} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4 capitalize">{activeChart} Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          {activeChart === 'weight' ? (
            <AreaChart data={weightData}>
              <defs>
                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} domain={['dataMin - 2', 'dataMax + 2']} />
              <Tooltip formatter={(v) => [`${v} kg`, 'Weight']} />
              <Area type="monotone" dataKey="weight" stroke="#F97316" strokeWidth={2} fillOpacity={1} fill="url(#colorWeight)" />
            </AreaChart>
          ) : activeChart === 'bmi' ? (
            <LineChart data={bmiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} domain={[23, 27]} />
              <Tooltip formatter={(v) => [v.toFixed(1), 'BMI']} />
              <Line type="monotone" dataKey="bmi" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6' }} />
            </LineChart>
          ) : (
            <LineChart data={strengthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip formatter={(v) => [`${v} kg`, '']} />
              <Line type="monotone" dataKey="bench" stroke="#F97316" strokeWidth={2} name="Bench Press" />
              <Line type="monotone" dataKey="squat" stroke="#3B82F6" strokeWidth={2} name="Squat" />
              <Line type="monotone" dataKey="deadlift" stroke="#10B981" strokeWidth={2} name="Deadlift" />
            </LineChart>
          )}
        </ResponsiveContainer>
      </motion.div>

      {/* Measurements */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Body Measurements</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.07)]">
                <th className="text-left text-xs font-medium text-[#6B7280] uppercase px-4 py-3">Date</th>
                <th className="text-center text-xs font-medium text-[#6B7280] uppercase px-4 py-3">Chest</th>
                <th className="text-center text-xs font-medium text-[#6B7280] uppercase px-4 py-3">Waist</th>
                <th className="text-center text-xs font-medium text-[#6B7280] uppercase px-4 py-3">Arms</th>
                <th className="text-center text-xs font-medium text-[#6B7280] uppercase px-4 py-3">Thighs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
              {measurements.map((m, i) => (
                <tr key={i} className="hover:bg-[#1A1A1A]">
                  <td className="px-4 py-3 text-sm font-medium text-[#F0EDE8]">{m.date}</td>
                  <td className="px-4 py-3 text-sm text-center text-[#A8A29E]">{m.chest}</td>
                  <td className="px-4 py-3 text-sm text-center text-[#A8A29E]">{m.waist}</td>
                  <td className="px-4 py-3 text-sm text-center text-[#A8A29E]">{m.arms}</td>
                  <td className="px-4 py-3 text-sm text-center text-[#A8A29E]">{m.thighs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Photo Timeline */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Progress Photos</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
            <div key={i} className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex flex-col items-center justify-center">
              <Camera className="w-8 h-8 text-[#6B7280] mb-2" />
              <span className="text-xs text-[#6B7280]">{month} 2024</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
