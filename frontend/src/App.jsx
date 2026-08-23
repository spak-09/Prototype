import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './stores/authStore';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Membership from './pages/public/Membership';
import Trainers from './pages/public/Trainers';
import Community from './pages/public/Community';
import Gallery from './pages/public/Gallery';
import Testimonials from './pages/public/Testimonials';
import Contact from './pages/public/Contact';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';

// Owner Pages
import OwnerDashboard from './pages/owner/OwnerDashboard';
import MembersPage from './pages/owner/MembersPage';
import MemberProfile from './pages/owner/MemberProfile';
import AttendancePage from './pages/owner/AttendancePage';
import PaymentsPage from './pages/owner/PaymentsPage';
import TrainersPage from './pages/owner/TrainersPage';
import CommunityPage from './pages/owner/CommunityPage';
import AnalyticsPage from './pages/owner/AnalyticsPage';
import SettingsPage from './pages/owner/SettingsPage';

// Trainer Pages
import TrainerDashboard from './pages/trainer/TrainerDashboard';
import TrainerMembers from './pages/trainer/TrainerMembers';
import WorkoutPlans from './pages/trainer/WorkoutPlans';
import TrainerSchedule from './pages/trainer/TrainerSchedule';
import TrainerAttendance from './pages/trainer/TrainerAttendance';
import TrainerReports from './pages/trainer/TrainerReports';
import TrainerMessages from './pages/trainer/TrainerMessages';
import TrainerProfile from './pages/trainer/TrainerProfile';

// Member Pages
import MemberDashboard from './pages/member/MemberDashboard';
import MyWorkouts from './pages/member/MyWorkouts';
import MemberProgress from './pages/member/MemberProgress';
import MemberNutrition from './pages/member/MemberNutrition';
import MemberPayments from './pages/member/MemberPayments';
import MemberCommunity from './pages/member/MemberCommunity';
import MemberChallenges from './pages/member/MemberChallenges';
import MemberProfilePage from './pages/member/MemberProfilePage';

function ProtectedRoute({ allowedRoles }) {
  const { user, loading } = useAuthStore();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-dark-400">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const dashPath = user.role === 'owner' ? '/owner' : user.role === 'trainer' ? '/trainer' : '/member';
    return <Navigate to={dashPath} replace />;
  }
  return <Outlet />;
}

function PublicRoute() {
  const { user, loading } = useAuthStore();
  if (loading) return null;
  if (user) {
    const dashPath = user.role === 'owner' ? '/owner' : user.role === 'trainer' ? '/trainer' : '/member';
    return <Navigate to={dashPath} replace />;
  }
  return <Outlet />;
}

function App() {
  const { loadUser } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            borderRadius: '12px',
          },
          success: { iconTheme: { primary: '#F97316', secondary: '#fff' } },
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/community" element={<Community />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Owner Routes */}
        <Route element={<ProtectedRoute allowedRoles={['owner']} />}>
          <Route element={<DashboardLayout role="owner" />}>
            <Route path="/owner" element={<OwnerDashboard />} />
            <Route path="/owner/members" element={<MembersPage />} />
            <Route path="/owner/members/:id" element={<MemberProfile />} />
            <Route path="/owner/attendance" element={<AttendancePage />} />
            <Route path="/owner/payments" element={<PaymentsPage />} />
            <Route path="/owner/trainers" element={<TrainersPage />} />
            <Route path="/owner/community" element={<CommunityPage />} />
            <Route path="/owner/analytics" element={<AnalyticsPage />} />
            <Route path="/owner/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* Trainer Routes */}
        <Route element={<ProtectedRoute allowedRoles={['trainer']} />}>
          <Route element={<DashboardLayout role="trainer" />}>
            <Route path="/trainer" element={<TrainerDashboard />} />
            <Route path="/trainer/members" element={<TrainerMembers />} />
            <Route path="/trainer/workouts" element={<WorkoutPlans />} />
            <Route path="/trainer/schedule" element={<TrainerSchedule />} />
            <Route path="/trainer/attendance" element={<TrainerAttendance />} />
            <Route path="/trainer/reports" element={<TrainerReports />} />
            <Route path="/trainer/messages" element={<TrainerMessages />} />
            <Route path="/trainer/profile" element={<TrainerProfile />} />
          </Route>
        </Route>

        {/* Member Routes */}
        <Route element={<ProtectedRoute allowedRoles={['member']} />}>
          <Route element={<DashboardLayout role="member" />}>
            <Route path="/member" element={<MemberDashboard />} />
            <Route path="/member/workouts" element={<MyWorkouts />} />
            <Route path="/member/progress" element={<MemberProgress />} />
            <Route path="/member/nutrition" element={<MemberNutrition />} />
            <Route path="/member/payments" element={<MemberPayments />} />
            <Route path="/member/community" element={<MemberCommunity />} />
            <Route path="/member/challenges" element={<MemberChallenges />} />
            <Route path="/member/profile" element={<MemberProfilePage />} />
          </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
