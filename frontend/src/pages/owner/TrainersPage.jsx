import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Star, Users, Award, Clock, Mail, Phone } from 'lucide-react';
import { PageHeader, Badge, Button, Modal } from '../../components/shared/UIComponents';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

const trainersData = [
  { name: 'Rajesh Kumar', specialty: 'Strength Training', experience: '8 years', rating: 4.8, members: 15, availability: 'Mon-Sat 6AM-2PM', certs: ['NSCA-CPT', 'ACE'], email: 'rajesh@elevatefit.com', phone: '9876543210' },
  { name: 'Priya Sharma', specialty: 'Yoga & Flexibility', experience: '6 years', rating: 4.9, members: 15, availability: 'Mon-Sat 7AM-3PM', certs: ['RYT-200', 'Yoga Alliance'], email: 'priya@elevatefit.com', phone: '9876543211' },
  { name: 'Vikram Singh', specialty: 'Cardio & HIIT', experience: '5 years', rating: 4.7, members: 15, availability: 'Mon-Sat 5AM-1PM', certs: ['ACE-CPT', 'CrossFit L1'], email: 'vikram@elevatefit.com', phone: '9876543212' },
  { name: 'Ananya Reddy', specialty: 'Weight Loss', experience: '7 years', rating: 4.6, members: 15, availability: 'Mon-Sat 6AM-4PM', certs: ['ISSA-CPT', 'Nutrition'], email: 'ananya@elevatefit.com', phone: '9876543213' },
  { name: 'Suresh Patel', specialty: 'Bodybuilding', experience: '10 years', rating: 4.9, members: 15, availability: 'Mon-Sat 5AM-11AM', certs: ['IFBB', 'NSCA-CSCS'], email: 'suresh@elevatefit.com', phone: '9876543214' },
  { name: 'Deepika Nair', specialty: 'Pilates & Core', experience: '4 years', rating: 4.5, members: 15, availability: 'Mon-Sat 8AM-4PM', certs: ['PMA-CPT', 'ACE-GFI'], email: 'deepika@elevatefit.com', phone: '9876543215' },
  { name: 'Arjun Mehta', specialty: 'Functional Training', experience: '6 years', rating: 4.7, members: 15, availability: 'Mon-Sat 6AM-2PM', certs: ['ACE-CPT', 'TRX'], email: 'arjun@elevatefit.com', phone: '9876543216' },
  { name: 'Kavitha Iyer', specialty: 'Kickboxing', experience: '5 years', rating: 4.8, members: 15, availability: 'Mon-Sat 7AM-3PM', certs: ['ISSA-CPT', 'Kickboxing'], email: 'kavitha@elevatefit.com', phone: '9876543217' },
];

export default function TrainersPage() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader title="Trainers" subtitle={`${trainersData.length} active trainers`}
        actions={<Button onClick={() => setShowAdd(true)}><Plus className="w-4 h-4" /> Add Trainer</Button>} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainersData.map((trainer, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-[#181818] rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                {trainer.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#F0EDE8]">{trainer.name}</h3>
                <p className="text-sm text-primary-500 font-medium">{trainer.specialty}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-1.5 text-xs text-[#6B7280]"><Star className="w-3.5 h-3.5 text-amber-400" /> {trainer.rating} rating</div>
              <div className="flex items-center gap-1.5 text-xs text-[#6B7280]"><Users className="w-3.5 h-3.5" /> {trainer.members} members</div>
              <div className="flex items-center gap-1.5 text-xs text-[#6B7280]"><Award className="w-3.5 h-3.5" /> {trainer.experience}</div>
              <div className="flex items-center gap-1.5 text-xs text-[#6B7280]"><Clock className="w-3.5 h-3.5" /> {trainer.availability.split(' ').slice(1).join(' ')}</div>
            </div>
            <div className="flex flex-wrap gap-1 mb-4">
              {trainer.certs.map((cert, j) => (
                <Badge key={j} variant="info">{cert}</Badge>
              ))}
            </div>
            <div className="pt-3 border-t border-[rgba(255,255,255,0.07)] space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#6B7280]"><Mail className="w-3.5 h-3.5" /> {trainer.email}</div>
              <div className="flex items-center gap-2 text-xs text-[#6B7280]"><Phone className="w-3.5 h-3.5" /> {trainer.phone}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add New Trainer">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success('Trainer added!'); setShowAdd(false); }}>
          {['Name', 'Email', 'Password', 'Phone', 'Specialty', 'Experience'].map((f) => (
            <div key={f}>
              <label className="text-sm font-medium text-[#A8A29E] mb-1 block">{f}</label>
              <input type={f === 'Password' ? 'password' : f === 'Email' ? 'email' : 'text'} required
                className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm" />
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setShowAdd(false)} className="flex-1">Cancel</Button>
            <Button type="submit" className="flex-1">Add Trainer</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
