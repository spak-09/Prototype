import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, Megaphone } from 'lucide-react';
import { PageHeader } from '../../components/shared/UIComponents';

const messages = [
  { id: 1, from: 'Admin', text: 'Welcome to the new training season! Let us make this quarter count.', time: '10:00 AM', type: 'announcement' },
  { id: 2, from: 'Rajesh Kumar', text: 'Reminder: New member orientation at 6 PM today.', time: '2:30 PM', type: 'message' },
  { id: 3, from: 'Priya Sharma', text: 'Yoga class schedule updated for next week. Please check the board.', time: '4:00 PM', type: 'message' },
  { id: 4, from: 'Admin', text: 'Monthly trainer meeting on Saturday at 11 AM. All trainers mandatory.', time: 'Yesterday', type: 'announcement' },
];

export default function TrainerMessages() {
  const [newMessage, setNewMessage] = useState('');

  return (
    <div className="space-y-6">
      <PageHeader title="Messages" subtitle="Team announcements and messages" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#181818] rounded-2xl shadow-card overflow-hidden">
        <div className="h-[500px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.type === 'announcement' ? 'bg-amber-50 p-4 rounded-xl border border-amber-100' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.type === 'announcement' ? 'bg-amber-100' : 'bg-primary-100'
                }`}>
                  {msg.type === 'announcement' ? <Megaphone className="w-5 h-5 text-amber-600" /> : <MessageSquare className="w-5 h-5 text-primary-600" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-[#F0EDE8]">{msg.from}</span>
                    <span className="text-xs text-[#6B7280]">{msg.time}</span>
                  </div>
                  <p className="text-sm text-[#A8A29E]">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-[rgba(255,255,255,0.07)] p-4">
            <div className="flex items-center gap-3">
              <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm" placeholder="Type a message..." />
              <button className="p-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"><Send className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
