import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { PageHeader, StatCard } from '../../components/shared/UIComponents';
import { TrendingUp, Users, CheckCircle, Dumbbell } from 'lucide-react';

const memberPerformance = [
  { name: 'Aarav', attendance: 92, workouts: 28, progress: 85 },
  { name: 'Priya', attendance: 88, workouts: 25, progress: 90 },
  { name: 'Vikram', attendance: 95, workouts: 30, progress: 78 },
  { name: 'Ananya', attendance: 85, workouts: 22, progress: 82 },
  { name: 'Suresh', attendance: 90, workouts: 27, progress: 88 },
];

const workoutCompletion = [
  { week: 'W1', completed: 85 }, { week: 'W2', completed: 88 },
  { week: 'W3', completed: 82 }, { week: 'W4', completed: 90 },
];

export default function TrainerReports() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reports" subtitle="Member performance and workout analytics" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={Users} label="Avg Attendance" value="90%" color="green" />
        <StatCard icon={Dumbbell} label="Workouts/Week" value="26" color="blue" />
        <StatCard icon={TrendingUp} label="Avg Progress" value="85%" color="primary" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
          <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Member Attendance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={memberPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip />
              <Bar dataKey="attendance" fill="#F97316" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
          <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Workout Completion Rate</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={workoutCompletion}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="week" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip formatter={(v) => [`${v}%`, 'Completion']} />
              <Line type="monotone" dataKey="completed" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6' }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Member Performance Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.07)]">
                <th className="text-left text-xs font-medium text-[#6B7280] uppercase px-4 py-3">Member</th>
                <th className="text-center text-xs font-medium text-[#6B7280] uppercase px-4 py-3">Attendance %</th>
                <th className="text-center text-xs font-medium text-[#6B7280] uppercase px-4 py-3">Workouts</th>
                <th className="text-center text-xs font-medium text-[#6B7280] uppercase px-4 py-3">Progress %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
              {memberPerformance.map((m, i) => (
                <tr key={i} className="hover:bg-[#1A1A1A]">
                  <td className="px-4 py-3"><span className="text-sm font-medium text-[#F0EDE8]">{m.name}</span></td>
                  <td className="px-4 py-3 text-center"><span className="text-sm font-medium text-[#A8A29E]">{m.attendance}%</span></td>
                  <td className="px-4 py-3 text-center"><span className="text-sm font-medium text-[#A8A29E]">{m.workouts}</span></td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-20 bg-[#222] rounded-full h-2"><div className="bg-primary-500 h-2 rounded-full" style={{ width: `${m.progress}%` }} /></div>
                      <span className="text-sm font-medium text-[#A8A29E]">{m.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
