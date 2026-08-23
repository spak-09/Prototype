import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { PageHeader, Badge } from '../../components/shared/UIComponents';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 16 }, (_, i) => i + 5);

const sessions = [
  { day: 0, hour: 6, title: 'Morning HIIT', type: 'class', members: 12 },
  { day: 0, hour: 8, title: 'Strength Training', type: 'personal', members: 3 },
  { day: 0, hour: 17, title: 'Evening Yoga', type: 'class', members: 15 },
  { day: 1, hour: 7, title: 'Cardio Blast', type: 'class', members: 10 },
  { day: 1, hour: 16, title: 'Personal Training', type: 'personal', members: 2 },
  { day: 2, hour: 6, title: 'Morning HIIT', type: 'class', members: 14 },
  { day: 2, hour: 9, title: 'Kickboxing', type: 'class', members: 8 },
  { day: 3, hour: 7, title: 'Yoga Flow', type: 'class', members: 12 },
  { day: 3, hour: 17, title: 'Evening HIIT', type: 'class', members: 16 },
  { day: 4, hour: 6, title: 'Morning Strength', type: 'class', members: 11 },
  { day: 4, hour: 18, title: 'Spin Class', type: 'class', members: 10 },
  { day: 5, hour: 7, title: 'Weekend Warrior', type: 'class', members: 20 },
  { day: 5, hour: 10, title: 'Pilates', type: 'class', members: 8 },
];

export default function TrainerSchedule() {
  const [currentWeek, setCurrentWeek] = useState(0);

  return (
    <div className="space-y-6">
      <PageHeader title="Schedule" subtitle="Your weekly training schedule"
        actions={
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentWeek(w => w - 1)} className="p-2 rounded-lg hover:bg-[#222]"><ChevronLeft className="w-4 h-4" /></button>
            <span className="text-sm font-medium text-[#A8A29E]">This Week</span>
            <button onClick={() => setCurrentWeek(w => w + 1)} className="p-2 rounded-lg hover:bg-[#222]"><ChevronRight className="w-4 h-4" /></button>
          </div>
        } />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#181818] rounded-2xl shadow-card overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="grid grid-cols-8 border-b border-[rgba(255,255,255,0.07)]">
            <div className="p-3 text-xs font-medium text-[#6B7280]">Time</div>
            {weekDays.map((day, i) => (
              <div key={i} className={`p-3 text-center text-xs font-medium ${i === new Date().getDay() - 1 ? 'text-primary-600 bg-primary-50' : 'text-[#6B7280]'}`}>{day}</div>
            ))}
          </div>

          {/* Time Slots */}
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-8 border-b border-[rgba(255,255,255,0.05)]">
              <div className="p-2 text-xs text-[#6B7280] border-r border-[rgba(255,255,255,0.07)]">{hour}:00</div>
              {weekDays.map((_, dayIdx) => {
                const session = sessions.find(s => s.day === dayIdx && s.hour === hour);
                return (
                  <div key={dayIdx} className="p-1 border-r border-[rgba(255,255,255,0.05)] min-h-[48px]">
                    {session && (
                      <div className={`p-1.5 rounded-lg text-[10px] ${session.type === 'class' ? 'bg-primary-100 text-primary-700' : 'bg-blue-100 text-blue-700'}`}>
                        <p className="font-medium truncate">{session.title}</p>
                        <p className="flex items-center gap-0.5"><Users className="w-2.5 h-2.5" /> {session.members}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
