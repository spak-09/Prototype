import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, Clock, Upload, IndianRupee, CheckCircle, QrCode } from 'lucide-react';
import { PageHeader, Badge, Button, StatCard } from '../../components/shared/UIComponents';
import { useAuthStore } from '../../stores/authStore';
import { api } from '../../services/api';

export default function MemberPayments() {
  const { user } = useAuthStore();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.payments.getByMember(user._id);
        setPayments(res.payments);
      } catch (error) { console.error(error); }
    };
    if (user?._id) fetchPayments();
  }, [user]);

  const daysUntilExpiry = user?.expiryDate ? Math.max(0, Math.ceil((new Date(user.expiryDate) - new Date()) / (1000 * 60 * 60 * 24))) : 0;

  const planPrices = { monthly: 1500, quarterly: 4000, 'half-yearly': 7500, annual: 14000 };

  return (
    <div className="space-y-6">
      <PageHeader title="Payments" subtitle="Manage your membership and payments" />

      {/* Membership Status */}
      <div className="grid md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-dark-900 to-dark-800 rounded-2xl p-6 text-white">
          <p className="text-sm text-[#6B7280] mb-1">Membership Plan</p>
          <p className="text-2xl font-bold capitalize mb-2">{user?.membershipPlan || 'Monthly'}</p>
          <p className="text-sm text-[#6B7280]">₹{(planPrices[user?.membershipPlan] || 1500).toLocaleString()}/month</p>
          <div className="mt-4 pt-4 border-t border-dark-700">
            <div className="flex items-center gap-2">
              <Badge variant={user?.paymentStatus === 'paid' ? 'success' : 'warning'}>{user?.paymentStatus || 'paid'}</Badge>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center"><Clock className="w-6 h-6 text-primary-600" /></div>
            <div>
              <p className="text-2xl font-bold text-[#F0EDE8]">{daysUntilExpiry}</p>
              <p className="text-xs text-[#6B7280]">Days until renewal</p>
            </div>
          </div>
          <p className="text-xs text-[#6B7280]">Expires: {user?.expiryDate ? new Date(user.expiryDate).toLocaleDateString() : 'N/A'}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center"><IndianRupee className="w-6 h-6 text-emerald-600" /></div>
            <div>
              <p className="text-2xl font-bold text-[#F0EDE8]">₹{payments.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0).toLocaleString()}</p>
              <p className="text-xs text-[#6B7280]">Total paid</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* QR Payment Upload */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Make a Payment</h3>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="bg-[#1A1A1A] rounded-xl p-8 text-center flex-1">
            <QrCode className="w-32 h-32 text-dark-200 mx-auto mb-3" />
            <p className="text-sm text-[#6B7280]">Scan QR code to pay via UPI</p>
            <p className="text-xs text-[#6B7280] mt-1">UPI ID: elevatefit@upi</p>
          </div>
          <div className="flex-1 space-y-4">
            <p className="text-sm text-[#A8A29E]">Upload payment screenshot after completing the payment:</p>
            <div className="border-2 border-dashed border-[rgba(255,255,255,0.08)] rounded-xl p-8 text-center hover:border-primary-300 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-[#6B7280] mx-auto mb-2" />
              <p className="text-sm text-[#6B7280]">Click to upload screenshot</p>
            </div>
            <Button className="w-full"><Upload className="w-4 h-4" /> Submit Payment</Button>
          </div>
        </div>
      </motion.div>

      {/* Payment History */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Payment History</h3>
        <div className="space-y-2">
          {payments.map((p, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center"><CreditCard className="w-5 h-5 text-primary-600" /></div>
                <div>
                  <p className="text-sm font-medium text-[#F0EDE8]">₹{p.amount.toLocaleString()}</p>
                  <p className="text-xs text-[#6B7280] capitalize">{p.membershipPlan} plan</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#6B7280]">{new Date(p.date).toLocaleDateString()}</p>
                <Badge variant={p.status === 'completed' ? 'success' : p.status === 'pending' ? 'warning' : 'danger'}>{p.status}</Badge>
              </div>
            </div>
          ))}
          {payments.length === 0 && <p className="text-center text-[#6B7280] text-sm py-8">No payment history</p>}
        </div>
      </motion.div>
    </div>
  );
}
