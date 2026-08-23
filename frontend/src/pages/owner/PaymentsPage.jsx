import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, CheckCircle, Clock, XCircle, Search, Download, Filter } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PageHeader, StatCard, Badge, Button, SearchInput, LoadingSkeleton } from '../../components/shared/UIComponents';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.payments.getAll({ status: statusFilter, limit: 50 });
        setPayments(res.payments);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [statusFilter]);

  const handleVerify = async (id, status) => {
    try {
      await api.payments.verify(id, status);
      toast.success(`Payment ${status}`);
      setPayments(payments.map(p => p._id === id ? { ...p, status } : p));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

  const revenueData = [
    { month: 'Jul', amount: 320000 }, { month: 'Aug', amount: 340000 },
    { month: 'Sep', amount: 355000 }, { month: 'Oct', amount: 365000 },
    { month: 'Nov', amount: 375000 }, { month: 'Dec', amount: 380000 },
  ];

  const filteredPayments = payments.filter(p =>
    !search || p.member?.name?.toLowerCase().includes(search.toLowerCase()) || p.member?.memberId?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="space-y-6"><PageHeader title="Payments" /><LoadingSkeleton rows={4} /></div>;

  return (
    <div className="space-y-6">
      <PageHeader title="Payments" subtitle="Manage payments and revenue" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={IndianRupee} label="Total Revenue" value={`₹${(totalRevenue / 1000).toFixed(0)}K`} color="green" />
        <StatCard icon={Clock} label="Pending" value={`₹${(pendingAmount / 1000).toFixed(0)}K`} color="yellow" />
        <StatCard icon={CheckCircle} label="Completed" value={payments.filter(p => p.status === 'completed').length} color="primary" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
            <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}K`} />
            <Tooltip formatter={(v) => [`₹${(v/1000).toFixed(0)}K`, 'Amount']} />
            <Area type="monotone" dataKey="amount" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorAmount)" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Payments Table */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1"><SearchInput value={search} onChange={setSearch} placeholder="Search by member name or ID..." /></div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm">
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="bg-[#181818] rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.07)]">
                <th className="text-left text-xs font-medium text-[#6B7280] uppercase px-6 py-4">Member</th>
                <th className="text-left text-xs font-medium text-[#6B7280] uppercase px-6 py-4">Amount</th>
                <th className="text-left text-xs font-medium text-[#6B7280] uppercase px-6 py-4">Plan</th>
                <th className="text-left text-xs font-medium text-[#6B7280] uppercase px-6 py-4">Date</th>
                <th className="text-left text-xs font-medium text-[#6B7280] uppercase px-6 py-4">Status</th>
                <th className="text-right text-xs font-medium text-[#6B7280] uppercase px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
              {filteredPayments.slice(0, 20).map((payment) => (
                <tr key={payment._id} className="hover:bg-[#1A1A1A]">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-[#F0EDE8]">{payment.member?.name || 'N/A'}</p>
                    <p className="text-xs text-[#6B7280]">{payment.member?.memberId}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-[#F0EDE8]">₹{payment.amount.toLocaleString()}</td>
                  <td className="px-6 py-4"><Badge variant="primary">{payment.membershipPlan}</Badge></td>
                  <td className="px-6 py-4 text-sm text-[#6B7280]">{new Date(payment.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <Badge variant={payment.status === 'completed' ? 'success' : payment.status === 'pending' ? 'warning' : 'danger'}>{payment.status}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {payment.status === 'pending' && (
                        <>
                          <button onClick={() => handleVerify(payment._id, 'completed')} className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-500"><CheckCircle className="w-4 h-4" /></button>
                          <button onClick={() => handleVerify(payment._id, 'failed')} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><XCircle className="w-4 h-4" /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
