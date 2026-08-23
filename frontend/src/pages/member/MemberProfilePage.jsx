import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Target, Award, Calendar, Scale, Ruler, TrendingUp, Save, Edit } from 'lucide-react';
import { PageHeader, Badge, Button } from '../../components/shared/UIComponents';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';

const achievements = [
  { name: 'First Workout', desc: 'Completed your first workout', earned: true, icon: '💪' },
  { name: 'Week Warrior', desc: '7-day attendance streak', earned: true, icon: '🔥' },
  { name: 'Consistent', desc: '30-day attendance streak', earned: true, icon: '⭐' },
  { name: 'Challenge Champion', desc: 'Completed 3 challenges', earned: false, icon: '🏆' },
  { name: 'Social Butterfly', desc: '10 community posts', earned: false, icon: '🦋' },
  { name: 'Elite Member', desc: '1000+ reward points', earned: true, icon: '👑' },
];

export default function MemberProfilePage() {
  const { user } = useAuthStore();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    height: user?.height || 0,
    weight: user?.weight || 0,
    fitnessGoal: user?.fitnessGoal || 'General Fitness',
  });

  const goals = ['Weight Loss', 'Muscle Gain', 'General Fitness', 'Endurance', 'Flexibility', 'Body Recomposition'];

  return (
    <div className="space-y-6">
      <PageHeader title="My Profile" subtitle="Manage your personal information" />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#181818] rounded-2xl p-6 shadow-card text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
            {form.name.charAt(0)}
          </div>
          <h3 className="text-xl font-bold text-[#F0EDE8]">{form.name}</h3>
          <p className="text-sm text-[#6B7280] mb-2">{user?.memberId || 'EF-1001'}</p>
          <Badge variant="primary" className="mb-4">{user?.membershipPlan || 'Monthly'}</Badge>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-[#1A1A1A] rounded-xl p-3">
              <p className="text-lg font-bold text-[#F0EDE8]">{user?.attendanceCount || 156}</p>
              <p className="text-[10px] text-[#6B7280]">Total Visits</p>
            </div>
            <div className="bg-[#1A1A1A] rounded-xl p-3">
              <p className="text-lg font-bold text-[#F0EDE8]">{user?.rewardPoints || 1250}</p>
              <p className="text-[10px] text-[#6B7280]">Reward Points</p>
            </div>
            <div className="bg-[#1A1A1A] rounded-xl p-3">
              <p className="text-lg font-bold text-[#F0EDE8]">{user?.streak || 12}d</p>
              <p className="text-[10px] text-[#6B7280]">Current Streak</p>
            </div>
            <div className="bg-[#1A1A1A] rounded-xl p-3">
              <p className="text-lg font-bold text-[#F0EDE8]">{user?.paymentStatus === 'paid' ? 'Active' : 'Inactive'}</p>
              <p className="text-[10px] text-[#6B7280]">Status</p>
            </div>
          </div>
        </motion.div>

        {/* Edit Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 bg-[#181818] rounded-2xl p-6 shadow-card">
          <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'Full Name', key: 'name', icon: User },
              { label: 'Email', key: 'email', icon: Mail, readonly: true },
              { label: 'Phone', key: 'phone', icon: Phone },
              { label: 'Height (cm)', key: 'height', icon: Ruler, type: 'number' },
              { label: 'Weight (kg)', key: 'weight', icon: Scale, type: 'number' },
            ].map((field) => (
              <div key={field.key}>
                <label className="text-sm font-medium text-[#A8A29E] mb-1 block">{field.label}</label>
                <div className="relative">
                  <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                  <input type={field.type || 'text'} value={form[field.key]} onChange={(e) => setForm({ ...form, [field.key]: field.type === 'number' ? +e.target.value : e.target.value })}
                    readOnly={field.readonly}
                    className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl pl-10 pr-4 py-2.5 text-sm" />
                </div>
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-[#A8A29E] mb-1 block">Fitness Goal</label>
              <div className="flex flex-wrap gap-2">
                {goals.map((goal) => (
                  <button key={goal} type="button" onClick={() => setForm({ ...form, fitnessGoal: goal })}
                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                      form.fitnessGoal === goal ? 'bg-primary-500 text-white' : 'bg-[#222] text-[#6B7280] hover:bg-[#2A2A2A]'
                    }`}>{goal}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button onClick={() => toast.success('Profile updated!')}><Save className="w-4 h-4" /> Save Changes</Button>
          </div>
        </motion.div>
      </div>

      {/* Achievements */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {achievements.map((a, i) => (
            <div key={i} className={`text-center p-4 rounded-xl transition-all ${a.earned ? 'bg-primary-50 border border-primary-100' : 'bg-[#1A1A1A] opacity-50'}`}>
              <span className="text-3xl mb-2 block">{a.icon}</span>
              <p className="text-xs font-bold text-[#F0EDE8]">{a.name}</p>
              <p className="text-[10px] text-[#6B7280] mt-0.5">{a.desc}</p>
              {a.earned && <Badge variant="success" className="mt-2 text-[9px]">Earned</Badge>}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
