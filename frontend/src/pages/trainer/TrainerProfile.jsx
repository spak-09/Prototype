import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Award, Clock, Star, Mail, Phone, Save } from 'lucide-react';
import { PageHeader, Button, Badge } from '../../components/shared/UIComponents';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';

export default function TrainerProfile() {
  const { user } = useAuthStore();
  const [form, setForm] = useState({
    name: user?.name || 'Trainer',
    email: user?.email || '',
    phone: user?.phone || '',
    specialty: user?.specialty || 'Strength Training',
    experience: user?.experience || '5 years',
    availability: user?.availability || 'Mon-Sat 6AM-2PM',
    rating: user?.rating || 4.8,
  });

  return (
    <div className="space-y-6">
      <PageHeader title="My Profile" subtitle="Manage your trainer profile" />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#181818] rounded-2xl p-6 shadow-card text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
            {form.name.charAt(0)}
          </div>
          <h3 className="text-xl font-bold text-[#F0EDE8]">{form.name}</h3>
          <p className="text-sm text-primary-500 font-medium mb-2">{form.specialty}</p>
          <div className="flex items-center justify-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(form.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
            ))}
            <span className="text-sm text-[#6B7280] ml-1">{form.rating}</span>
          </div>
          <div className="space-y-2 text-sm text-[#6B7280]">
            <div className="flex items-center justify-center gap-2"><Mail className="w-4 h-4" /> {form.email}</div>
            <div className="flex items-center justify-center gap-2"><Phone className="w-4 h-4" /> {form.phone || 'N/A'}</div>
            <div className="flex items-center justify-center gap-2"><Clock className="w-4 h-4" /> {form.availability}</div>
            <div className="flex items-center justify-center gap-2"><Award className="w-4 h-4" /> {form.experience}</div>
          </div>
        </motion.div>

        {/* Edit Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 bg-[#181818] rounded-2xl p-6 shadow-card">
          <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Edit Profile</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'Full Name', key: 'name' },
              { label: 'Email', key: 'email' },
              { label: 'Phone', key: 'phone' },
              { label: 'Specialty', key: 'specialty' },
              { label: 'Experience', key: 'experience' },
              { label: 'Availability', key: 'availability' },
            ].map((field) => (
              <div key={field.key}>
                <label className="text-sm font-medium text-[#A8A29E] mb-1 block">{field.label}</label>
                <input value={form[field.key]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm" />
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button onClick={() => toast.success('Profile updated!')}><Save className="w-4 h-4" /> Save Changes</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
