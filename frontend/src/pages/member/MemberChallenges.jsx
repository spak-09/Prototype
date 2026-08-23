import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Calendar, Users, Target, Award, Crown } from 'lucide-react';
import { PageHeader, Badge, Button } from '../../components/shared/UIComponents';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

export default function MemberChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chRes, lbRes] = await Promise.all([api.community.getChallenges(), api.leaderboard.get()]);
        setChallenges(chRes.challenges);
        setLeaderboard(lbRes.leaderboard);
      } catch (error) { console.error(error); }
    };
    fetchData();
  }, []);

  const handleJoin = async (id) => {
    try {
      await api.community.joinChallenge(id);
      toast.success('Joined challenge!');
      const res = await api.community.getChallenges();
      setChallenges(res.challenges);
    } catch (error) { toast.error(error.message); }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Challenges" subtitle="Join challenges and earn reward points!" />

      {/* Active Challenges */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {challenges.filter(c => c.isActive).map((challenge, i) => (
          <motion.div key={challenge._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-[#181818] rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all">
            <div className="flex items-start justify-between mb-3">
              <Badge variant="success">Active</Badge>
              <span className="flex items-center gap-1 text-xs text-[#6B7280]"><Flame className="w-3.5 h-3.5 text-orange-500" /> {challenge.rewardPoints} pts</span>
            </div>
            <h3 className="text-base font-bold text-[#F0EDE8] mb-1">{challenge.title}</h3>
            <p className="text-xs text-[#6B7280] mb-3 line-clamp-2">{challenge.description}</p>
            <div className="flex items-center gap-4 text-xs text-[#6B7280] mb-4">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(challenge.startDate).toLocaleDateString()}</span>
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {challenge.participants?.length || 0} joined</span>
            </div>
            <div className="w-full bg-[#222] rounded-full h-2 mb-4">
              <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${Math.floor(Math.random() * 60) + 20}%` }} />
            </div>
            <Button variant="secondary" size="sm" className="w-full" onClick={() => handleJoin(challenge._id)}>
              <Target className="w-3.5 h-3.5" /> Join Challenge
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Leaderboard */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <Crown className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-semibold text-[#F0EDE8]">Challenge Leaderboard</h3>
        </div>
        <div className="space-y-2">
          {leaderboard.slice(0, 10).map((member, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-[#1A1A1A] rounded-xl">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i === 0 ? 'bg-amber-100 text-amber-700' : i === 1 ? 'bg-[#2A2A2A] text-gray-600' : i === 2 ? 'bg-orange-100 text-orange-700' : 'bg-[#222] text-[#6B7280]'
              }`}>{i + 1}</span>
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold">{member.name?.charAt(0)}</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#F0EDE8]">{member.name}</p>
                <p className="text-xs text-[#6B7280]">{member.streak} day streak</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#F0EDE8]">{member.rewardPoints} pts</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
