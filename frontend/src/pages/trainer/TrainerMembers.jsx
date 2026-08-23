import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Scale, FileText, Eye } from 'lucide-react';
import { PageHeader, Badge, Button, Modal, SearchInput } from '../../components/shared/UIComponents';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

export default function TrainerMembers() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.trainer.getMembers();
        setMembers(res.members);
      } catch (error) { console.error(error); }
    };
    fetchMembers();
  }, []);

  const filtered = members.filter(m => !search || m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader title="My Members" subtitle={`${members.length} assigned members`} />
      <SearchInput value={search} onChange={setSearch} placeholder="Search members..." />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((member, i) => (
          <motion.div key={member._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-[#181818] rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold">{member.name.charAt(0)}</div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-[#F0EDE8]">{member.name}</h3>
                <p className="text-xs text-[#6B7280]">{member.memberId}</p>
              </div>
              <Badge variant={member.paymentStatus === 'paid' ? 'success' : 'warning'}>{member.paymentStatus}</Badge>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center p-2 bg-[#1A1A1A] rounded-lg">
                <p className="text-sm font-bold text-[#F0EDE8]">{member.weight || '—'}</p>
                <p className="text-[10px] text-[#6B7280]">Weight (kg)</p>
              </div>
              <div className="text-center p-2 bg-[#1A1A1A] rounded-lg">
                <p className="text-sm font-bold text-[#F0EDE8]">{member.streak || 0}</p>
                <p className="text-[10px] text-[#6B7280]">Streak (days)</p>
              </div>
              <div className="text-center p-2 bg-[#1A1A1A] rounded-lg">
                <p className="text-sm font-bold text-[#F0EDE8]">{member.rewardPoints || 0}</p>
                <p className="text-[10px] text-[#6B7280]">Points</p>
              </div>
            </div>
            <p className="text-xs text-[#6B7280] mb-3">Goal: {member.fitnessGoal || 'General Fitness'}</p>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1" onClick={() => { setSelectedMember(member); setShowProgress(true); }}>
                <TrendingUp className="w-3.5 h-3.5" /> Progress
              </Button>
              <Button variant="secondary" size="sm" className="flex-1">
                <FileText className="w-3.5 h-3.5" /> Notes
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={showProgress} onClose={() => setShowProgress(false)} title={`Update Progress - ${selectedMember?.name}`}>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success('Progress updated!'); setShowProgress(false); }}>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-[#A8A29E] mb-1 block">Weight (kg)</label>
              <input type="number" defaultValue={selectedMember?.weight} className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm" /></div>
            <div><label className="text-sm font-medium text-[#A8A29E] mb-1 block">Height (cm)</label>
              <input type="number" defaultValue={selectedMember?.height} className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm" /></div>
          </div>
          <div><label className="text-sm font-medium text-[#A8A29E] mb-1 block">Notes</label>
            <textarea rows={3} className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm resize-none" placeholder="Training notes..." /></div>
          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={() => setShowProgress(false)} className="flex-1">Cancel</Button>
            <Button type="submit" className="flex-1">Save</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
