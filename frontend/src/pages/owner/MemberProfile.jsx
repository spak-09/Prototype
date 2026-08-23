import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CalendarCheck, CreditCard, TrendingUp, Dumbbell, Award, Phone, Mail, MapPin } from 'lucide-react';
import { Badge, PageHeader, LoadingSkeleton } from '../../components/shared/UIComponents';
import { api } from '../../services/api';

const tabs = ['Overview', 'Attendance', 'Payments', 'Progress', 'Workouts'];

export default function MemberProfile() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [payments, setPayments] = useState([]);
  const [activeTab, setActiveTab] = useState('Overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [memberRes, attendRes, payRes] = await Promise.all([
          api.members.getById(id),
          api.attendance.getByMember(id),
          api.payments.getByMember(id),
        ]);
        setMember(memberRes.member);
        setAttendance(attendRes.attendance);
        setPayments(payRes.payments);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <LoadingSkeleton rows={6} />;
  if (!member) return <div className="text-center py-20 text-[#6B7280]">Member not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/owner/members" className="p-2 rounded-lg hover:bg-[#222]"><ArrowLeft className="w-5 h-5" /></Link>
        <PageHeader title={member.name} subtitle={`Member ID: ${member.memberId}`} />
      </div>

      {/* Profile Header */}
      <div className="bg-[#181818] rounded-2xl p-6 shadow-card">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">{member.name.charAt(0)}</div>
          <div className="flex-1 grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-sm text-[#6B7280]"><Mail className="w-4 h-4 text-[#6B7280]" /> {member.email}</div>
            <div className="flex items-center gap-2 text-sm text-[#6B7280]"><Phone className="w-4 h-4 text-[#6B7280]" /> {member.phone || 'N/A'}</div>
            <div className="flex items-center gap-2 text-sm text-[#6B7280]"><MapPin className="w-4 h-4 text-[#6B7280]" /> Joined {new Date(member.joinDate).toLocaleDateString()}</div>
          </div>
          <div className="flex gap-2">
            <Badge variant={member.paymentStatus === 'paid' ? 'success' : 'warning'}>{member.paymentStatus}</Badge>
            <Badge variant="primary">{member.membershipPlan}</Badge>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-[rgba(255,255,255,0.07)]">
          {[
            { label: 'Attendance', value: member.attendanceCount, icon: CalendarCheck },
            { label: 'Reward Points', value: member.rewardPoints, icon: Award },
            { label: 'Streak', value: `${member.streak} days`, icon: TrendingUp },
            { label: 'Weight', value: `${member.weight} kg`, icon: Dumbbell },
            { label: 'BMI', value: member.weight && member.height ? (member.weight / ((member.height/100) ** 2)).toFixed(1) : '—', icon: TrendingUp },
          ].map((stat, i) => (
            <div key={i} className="text-center p-3 bg-[#1A1A1A] rounded-xl">
              <stat.icon className="w-5 h-5 text-primary-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-[#F0EDE8]">{stat.value}</p>
              <p className="text-xs text-[#6B7280]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#222] rounded-xl p-1 w-fit">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-[#181818] text-[#F0EDE8] shadow-sm' : 'text-[#6B7280] hover:text-[#A8A29E]'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
        {activeTab === 'Overview' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Member Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries({ 'Fitness Goal': member.fitnessGoal || 'Not set', 'Trainer': member.trainerAssigned?.name || 'Unassigned', 'Expiry Date': member.expiryDate ? new Date(member.expiryDate).toLocaleDateString() : 'N/A', 'Height': `${member.height || 0} cm`, 'Weight': `${member.weight || 0} kg` }).map(([key, val]) => (
                <div key={key} className="flex justify-between p-3 bg-[#1A1A1A] rounded-xl"><span className="text-sm text-[#6B7280]">{key}</span><span className="text-sm font-medium text-[#F0EDE8]">{val}</span></div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'Attendance' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Attendance History</h3>
            <div className="space-y-2">
              {attendance.slice(0, 20).map((a, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded-xl">
                  <span className="text-sm text-[#A8A29E]">{new Date(a.date).toLocaleDateString()}</span>
                  <span className="text-xs text-[#6B7280]">In: {new Date(a.checkInTime).toLocaleTimeString()} {a.checkOutTime ? `Out: ${new Date(a.checkOutTime).toLocaleTimeString()}` : ''}</span>
                  <Badge variant={a.status === 'present' ? 'success' : 'warning'}>{a.status}</Badge>
                </div>
              ))}
              {attendance.length === 0 && <p className="text-sm text-[#6B7280] text-center py-8">No attendance records found</p>}
            </div>
          </div>
        )}
        {activeTab === 'Payments' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment History</h3>
            <div className="space-y-2">
              {payments.map((p, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded-xl">
                  <div><p className="text-sm font-medium text-[#F0EDE8]">₹{p.amount.toLocaleString()}</p><p className="text-xs text-[#6B7280]">{p.membershipPlan}</p></div>
                  <span className="text-xs text-[#6B7280]">{new Date(p.date).toLocaleDateString()}</span>
                  <Badge variant={p.status === 'completed' ? 'success' : p.status === 'pending' ? 'warning' : 'danger'}>{p.status}</Badge>
                </div>
              ))}
              {payments.length === 0 && <p className="text-sm text-[#6B7280] text-center py-8">No payments found</p>}
            </div>
          </div>
        )}
        {activeTab === 'Progress' && (
          <div className="text-center py-12">
            <TrendingUp className="w-12 h-12 text-dark-200 mx-auto mb-3" />
            <p className="text-sm text-[#6B7280]">Progress tracking will show weight, BMI, and body measurements over time.</p>
          </div>
        )}
        {activeTab === 'Workouts' && (
          <div className="text-center py-12">
            <Dumbbell className="w-12 h-12 text-dark-200 mx-auto mb-3" />
            <p className="text-sm text-[#6B7280]">Assigned workout plans and exercise history will appear here.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
