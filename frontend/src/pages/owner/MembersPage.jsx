import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Edit, Trash2, Eye, UserPlus, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageHeader, Button, Badge, Modal, SearchInput, LoadingSkeleton, EmptyState } from '../../components/shared/UIComponents';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '', password: '', phone: '', membershipPlan: 'monthly' });

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await api.members.getAll({ search, plan: planFilter, status: statusFilter, page, limit: 10 });
      setMembers(res.members);
      setTotalPages(res.pages);
      setTotal(res.total);
    } catch (error) {
      toast.error('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMembers(); }, [search, planFilter, statusFilter, page]);

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      await api.members.create(newMember);
      toast.success('Member added successfully');
      setShowAddModal(false);
      setNewMember({ name: '', email: '', password: '', phone: '', membershipPlan: 'monthly' });
      fetchMembers();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this member?')) return;
    try {
      await api.members.delete(id);
      toast.success('Member deleted');
      fetchMembers();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Members" subtitle={`${total} total members`}
        actions={<Button onClick={() => setShowAddModal(true)}><Plus className="w-4 h-4" /> Add Member</Button>} />

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1"><SearchInput value={search} onChange={setSearch} placeholder="Search by name, email, or ID..." /></div>
        <select value={planFilter} onChange={(e) => { setPlanFilter(e.target.value); setPage(1); }}
          className="bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm">
          <option value="all">All Plans</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="half-yearly">Half-Yearly</option>
          <option value="annual">Annual</option>
        </select>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      {loading ? <LoadingSkeleton rows={5} /> : members.length === 0 ? (
        <EmptyState title="No members found" description="Try adjusting your search or filters." />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#181818] rounded-2xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.07)]">
                  <th className="text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider px-6 py-4">Member</th>
                  <th className="text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider px-6 py-4">ID</th>
                  <th className="text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider px-6 py-4">Plan</th>
                  <th className="text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider px-6 py-4">Trainer</th>
                  <th className="text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider px-6 py-4">Points</th>
                  <th className="text-right text-xs font-medium text-[#6B7280] uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                {members.map((member) => (
                  <tr key={member._id} className="hover:bg-[#1A1A1A] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">{member.name.charAt(0)}</div>
                        <div>
                          <p className="text-sm font-medium text-[#F0EDE8]">{member.name}</p>
                          <p className="text-xs text-[#6B7280]">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280] font-mono">{member.memberId}</td>
                    <td className="px-6 py-4"><Badge variant="primary">{member.membershipPlan}</Badge></td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">{member.trainerAssigned?.name || '—'}</td>
                    <td className="px-6 py-4"><Badge variant={member.paymentStatus === 'paid' ? 'success' : member.paymentStatus === 'pending' ? 'warning' : 'danger'}>{member.paymentStatus}</Badge></td>
                    <td className="px-6 py-4 text-sm font-medium text-[#A8A29E]">{member.rewardPoints}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link to={`/owner/members/${member._id}`} className="p-2 rounded-lg hover:bg-[#222] text-[#6B7280] hover:text-primary-500"><Eye className="w-4 h-4" /></Link>
                        <button onClick={() => handleDelete(member._id)} className="p-2 rounded-lg hover:bg-[#222] text-[#6B7280] hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[rgba(255,255,255,0.07)]">
            <p className="text-sm text-[#6B7280]">Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, total)} of {total}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-lg hover:bg-[#222] disabled:opacity-30"><ChevronLeft className="w-4 h-4" /></button>
              <span className="text-sm text-[#A8A29E]">{page} / {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded-lg hover:bg-[#222] disabled:opacity-30"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Add Member Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Member">
        <form onSubmit={handleAddMember} className="space-y-4">
          {[
            { label: 'Full Name', key: 'name', type: 'text', required: true },
            { label: 'Email', key: 'email', type: 'email', required: true },
            { label: 'Password', key: 'password', type: 'password', required: true },
            { label: 'Phone', key: 'phone', type: 'tel' },
          ].map((field) => (
            <div key={field.key}>
              <label className="text-sm font-medium text-[#A8A29E] mb-1 block">{field.label}</label>
              <input type={field.type} required={field.required} value={newMember[field.key]} onChange={(e) => setNewMember({ ...newMember, [field.key]: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm" />
            </div>
          ))}
          <div>
            <label className="text-sm font-medium text-[#A8A29E] mb-1 block">Membership Plan</label>
            <select value={newMember.membershipPlan} onChange={(e) => setNewMember({ ...newMember, membershipPlan: e.target.value })}
              className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm">
              <option value="monthly">Monthly - ₹1,500</option>
              <option value="quarterly">Quarterly - ₹4,000</option>
              <option value="half-yearly">Half-Yearly - ₹7,500</option>
              <option value="annual">Annual - ₹14,000</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setShowAddModal(false)} className="flex-1">Cancel</Button>
            <Button type="submit" className="flex-1">Add Member</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
