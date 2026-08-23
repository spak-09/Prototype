import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, CalendarCheck, Users } from 'lucide-react';
import { PageHeader, Button, Badge } from '../../components/shared/UIComponents';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

export default function TrainerAttendance() {
  const [members, setMembers] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.trainer.getMembers();
        setMembers(res.members);
      } catch (error) { console.error(error); }
    };
    fetchMembers();
  }, []);

  const toggleAttendance = (memberId) => {
    setAttendance(prev => ({ ...prev, [memberId]: !prev[memberId] }));
  };

  const handleSubmit = async () => {
    try {
      const presentIds = Object.entries(attendance).filter(([_, v]) => v).map(([k]) => k);
      for (const id of presentIds) {
        await api.attendance.checkin(id);
      }
      toast.success(`Marked ${presentIds.length} members as present!`);
    } catch (error) { toast.error(error.message); }
  };

  const presentCount = Object.values(attendance).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <PageHeader title="Mark Attendance" subtitle={`${presentCount} of ${members.length} marked present`}
        actions={<Button onClick={handleSubmit} disabled={presentCount === 0}><CheckCircle className="w-4 h-4" /> Submit Attendance</Button>} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {members.map((member, i) => (
          <motion.div key={member._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            onClick={() => toggleAttendance(member._id)}
            className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all border-2 ${
              attendance[member._id] ? 'bg-emerald-50 border-emerald-200' : 'bg-[#181818] border-transparent hover:border-[rgba(255,255,255,0.08)]'
            } shadow-card`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              attendance[member._id] ? 'bg-emerald-500 text-white' : 'bg-[#222] text-[#6B7280]'
            }`}>
              {attendance[member._id] ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#F0EDE8]">{member.name}</p>
              <p className="text-xs text-[#6B7280]">{member.memberId}</p>
            </div>
            <Badge variant={attendance[member._id] ? 'success' : 'default'}>
              {attendance[member._id] ? 'Present' : 'Absent'}
            </Badge>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
