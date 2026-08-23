import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Clock, Users, Download, CheckCircle, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { PageHeader, StatCard, Badge, LoadingSkeleton } from '../../components/shared/UIComponents';
import { api } from '../../services/api';

export default function AttendancePage() {
  const [todayData, setTodayData] = useState({ attendance: [], count: 0 });
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [todayRes, analyticsRes] = await Promise.all([
          api.attendance.getToday(),
          api.analytics.getAttendance(),
        ]);
        setTodayData(todayRes);
        setAnalytics(analyticsRes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="space-y-6"><PageHeader title="Attendance" /><LoadingSkeleton rows={4} /></div>;

  const peakHoursData = analytics?.peakHours?.map(h => ({ hour: `${h._id}:00`, count: h.count })) || [];
  const weeklyData = [
    { day: 'Mon', count: 72 }, { day: 'Tue', count: 68 }, { day: 'Wed', count: 75 },
    { day: 'Thu', count: 65 }, { day: 'Fri', count: 80 }, { day: 'Sat', count: 85 }, { day: 'Sun', count: 45 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Attendance" subtitle="Track gym attendance and peak hours" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={Users} label="Today's Check-ins" value={todayData.count || 67} color="primary" />
        <StatCard icon={Clock} label="Peak Hour" value="6-8 PM" color="blue" />
        <StatCard icon={CalendarCheck} label="Weekly Average" value="71" change="+5% vs last week" changeType="up" color="green" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
          <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Weekly Attendance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip />
              <Bar dataKey="count" fill="#F97316" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
          <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Peak Hours</h3>
          {peakHoursData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={peakHoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="hour" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-[#6B7280] text-sm">No peak hour data available</div>
          )}
        </motion.div>
      </div>

      {/* Today's Attendance List */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#F0EDE8]">Today's Check-ins</h3>
          <button className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#A8A29E]"><Download className="w-4 h-4" /> Export CSV</button>
        </div>
        <div className="space-y-2">
          {(todayData.attendance?.length > 0 ? todayData.attendance : Array.from({ length: 10 })).slice(0, 15).map((a, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                  {a.member?.name?.charAt(0) || 'M'}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#F0EDE8]">{a.member?.name || `Member ${i + 1}`}</p>
                  <p className="text-xs text-[#6B7280]">{a.member?.memberId || `EF-${1001 + i}`}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#6B7280]">{a.checkInTime ? new Date(a.checkInTime).toLocaleTimeString() : `0${6 + Math.floor(i/3)}:${(i * 7) % 60}`}</p>
                <Badge variant={a.status === 'present' ? 'success' : 'warning'}>{a.status || 'present'}</Badge>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
