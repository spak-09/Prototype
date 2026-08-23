import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Building, CreditCard, Bell, Users, Settings, QrCode } from 'lucide-react';
import { PageHeader, Button } from '../../components/shared/UIComponents';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('gym');
  const [gymProfile, setGymProfile] = useState({
    gymName: 'EliteFit Gym',
    address: 'Kukatpally, Hyderabad, Telangana 500072',
    phone: '+91 98765 43200',
    email: 'info@elevatefit.com',
    openTime: '05:00',
    closeTime: '22:00',
  });

  const tabs = [
    { key: 'gym', label: 'Gym Profile', icon: Building },
    { key: 'plans', label: 'Membership Plans', icon: CreditCard },
    { key: 'qr', label: 'QR Payment', icon: QrCode },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'staff', label: 'Staff Management', icon: Users },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Manage your gym settings and preferences" />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-56 flex lg:flex-col gap-1 bg-[#222] rounded-xl p-1 lg:bg-transparent lg:p-0">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.key ? 'bg-[#181818] text-[#F0EDE8] shadow-sm' : 'text-[#6B7280] hover:text-[#A8A29E]'}`}>
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div key={activeTab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex-1 bg-[#181818] rounded-2xl p-6 shadow-card">
          {activeTab === 'gym' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Gym Profile</h3>
              {Object.entries(gymProfile).map(([key, val]) => (
                <div key={key}>
                  <label className="text-sm font-medium text-[#A8A29E] mb-1 block capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                  <input value={val} onChange={(e) => setGymProfile({ ...gymProfile, [key]: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm" />
                </div>
              ))}
              <Button onClick={() => toast.success('Settings saved!')}><Save className="w-4 h-4" /> Save Changes</Button>
            </div>
          )}

          {activeTab === 'plans' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Membership Plans</h3>
              {[
                { name: 'Monthly', price: '₹1,500' },
                { name: 'Quarterly', price: '₹4,000' },
                { name: 'Half-Yearly', price: '₹7,500' },
                { name: 'Annual', price: '₹14,000' },
              ].map((plan, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-[#F0EDE8]">{plan.name}</p>
                    <p className="text-xs text-[#6B7280]">{plan.price}</p>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'qr' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">QR Payment Settings</h3>
              <div className="bg-[#1A1A1A] rounded-xl p-8 text-center">
                <QrCode className="w-24 h-24 text-dark-200 mx-auto mb-4" />
                <p className="text-sm text-[#6B7280] mb-4">Upload your UPI QR code for member payments</p>
                <Button variant="secondary">Upload QR Code</Button>
              </div>
              <div>
                <label className="text-sm font-medium text-[#A8A29E] mb-1 block">UPI ID</label>
                <input defaultValue="elevatefit@upi" className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm" />
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Notification Settings</h3>
              {['Email notifications for new members', 'SMS alerts for payment failures', 'Daily attendance summary', 'Weekly revenue report', 'Challenge completion alerts'].map((item, i) => (
                <label key={i} className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-xl cursor-pointer">
                  <span className="text-sm text-[#A8A29E]">{item}</span>
                  <div className={`w-11 h-6 rounded-full transition-colors ${i < 3 ? 'bg-primary-500' : 'bg-gray-300'} relative`}>
                    <div className={`w-5 h-5 bg-[#181818] rounded-full absolute top-0.5 transition-transform shadow-sm ${i < 3 ? 'translate-x-5.5 left-[1px]' : 'translate-x-0.5 left-[1px]'}`}
                      style={{ transform: i < 3 ? 'translateX(21px)' : 'translateX(2px)' }} />
                  </div>
                </label>
              ))}
            </div>
          )}

          {activeTab === 'staff' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Staff Management</h3>
              {['Rajesh Kumar - Strength Training', 'Priya Sharma - Yoga', 'Vikram Singh - HIIT', 'Ananya Reddy - Weight Loss'].map((staff, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">{staff.charAt(0)}</div>
                    <div>
                      <p className="text-sm font-medium text-[#F0EDE8]">{staff.split(' - ')[0]}</p>
                      <p className="text-xs text-[#6B7280]">{staff.split(' - ')[1]}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-500">Remove</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
