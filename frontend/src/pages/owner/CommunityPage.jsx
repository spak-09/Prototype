import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, MessageSquare, Megaphone, Calendar, Plus, Flame, Target, Award } from 'lucide-react';
import { PageHeader, Badge, Button, Modal } from '../../components/shared/UIComponents';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

export default function CommunityPage() {
  const [challenges, setChallenges] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('challenges');
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chRes, postRes] = await Promise.all([api.community.getChallenges(), api.community.getPosts()]);
        setChallenges(chRes.challenges);
        setPosts(postRes.posts);
      } catch (error) { console.error(error); }
    };
    fetchData();
  }, []);

  const tabs = [
    { key: 'challenges', label: 'Challenges', icon: Trophy },
    { key: 'leaderboard', label: 'Leaderboard', icon: Award },
    { key: 'announcements', label: 'Announcements', icon: Megaphone },
    { key: 'posts', label: 'Posts', icon: MessageSquare },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Community" subtitle="Manage challenges, leaderboard, and community engagement"
        actions={<Button onClick={() => setShowCreate(true)}><Plus className="w-4 h-4" /> Create Challenge</Button>} />

      <div className="flex gap-1 bg-[#222] rounded-xl p-1 w-fit">
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.key ? 'bg-[#181818] text-[#F0EDE8] shadow-sm' : 'text-[#6B7280] hover:text-[#A8A29E]'}`}>
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {activeTab === 'challenges' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {challenges.map((c, i) => (
              <div key={i} className="bg-[#181818] rounded-2xl p-5 shadow-card">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant={c.isActive ? 'success' : 'default'}>{c.isActive ? 'Active' : 'Ended'}</Badge>
                  <span className="text-xs text-[#6B7280]">{c.participants?.length || 0} joined</span>
                </div>
                <h3 className="text-base font-bold text-[#F0EDE8] mb-1">{c.title}</h3>
                <p className="text-xs text-[#6B7280] mb-3 line-clamp-2">{c.description}</p>
                <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(c.startDate).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-orange-500" /> {c.rewardPoints} pts</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="bg-[#181818] rounded-2xl shadow-card overflow-hidden">
            <div className="p-6 border-b border-[rgba(255,255,255,0.07)]">
              <h3 className="text-lg font-semibold">Top Members</h3>
            </div>
            {['Aarav Gupta', 'Priya Sharma', 'Vikram Singh', 'Ananya Reddy', 'Suresh Patel'].map((name, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-[rgba(255,255,255,0.05)] last:border-0">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i === 0 ? 'bg-amber-100 text-amber-700' : i === 1 ? 'bg-[#222] text-gray-600' : i === 2 ? 'bg-orange-100 text-orange-700' : 'bg-[#1A1A1A] text-[#6B7280]'}`}>{i + 1}</span>
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold">{name.charAt(0)}</div>
                <div className="flex-1"><p className="text-sm font-medium text-[#F0EDE8]">{name}</p></div>
                <span className="text-sm font-semibold text-[#F0EDE8]">{2500 - i * 180} pts</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="space-y-4">
            {posts.filter(p => p.type === 'announcement').map((post, i) => (
              <div key={i} className="bg-[#181818] rounded-2xl p-5 shadow-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"><Megaphone className="w-5 h-5 text-blue-600" /></div>
                  <div>
                    <p className="text-sm font-medium text-[#F0EDE8]">{post.author?.name || 'Admin'}</p>
                    <p className="text-xs text-[#6B7280]">{new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                  <Badge variant="info">Announcement</Badge>
                </div>
                <p className="text-sm text-[#A8A29E]">{post.caption}</p>
              </div>
            ))}
            {posts.filter(p => p.type === 'announcement').length === 0 && (
              <div className="text-center py-12 text-[#6B7280] text-sm">No announcements yet</div>
            )}
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="space-y-4">
            {posts.map((post, i) => (
              <div key={i} className="bg-[#181818] rounded-2xl p-5 shadow-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold">{post.author?.name?.charAt(0) || 'U'}</div>
                  <div>
                    <p className="text-sm font-medium text-[#F0EDE8]">{post.author?.name || 'User'}</p>
                    <p className="text-xs text-[#6B7280]">{new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                  <Badge variant={post.type === 'achievement' ? 'success' : post.type === 'announcement' ? 'info' : 'default'}>{post.type}</Badge>
                </div>
                <p className="text-sm text-[#A8A29E] mb-3">{post.caption}</p>
                <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                  <span>{post.likes?.length || 0} likes</span>
                  <span>{post.comments?.length || 0} comments</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create Challenge">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success('Challenge created!'); setShowCreate(false); }}>
          <div><label className="text-sm font-medium text-[#A8A29E] mb-1 block">Title</label><input required className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm" /></div>
          <div><label className="text-sm font-medium text-[#A8A29E] mb-1 block">Description</label><textarea rows={3} className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm resize-none" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-[#A8A29E] mb-1 block">Start Date</label><input type="date" required className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm" /></div>
            <div><label className="text-sm font-medium text-[#A8A29E] mb-1 block">End Date</label><input type="date" required className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm" /></div>
          </div>
          <div><label className="text-sm font-medium text-[#A8A29E] mb-1 block">Reward Points</label><input type="number" defaultValue={100} className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm" /></div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setShowCreate(false)} className="flex-1">Cancel</Button>
            <Button type="submit" className="flex-1">Create</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
