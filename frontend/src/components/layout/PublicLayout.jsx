import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

export default function PublicLayout() {
  return (
    <div style={{ minHeight: '100vh', background: '#0F0F0F', color: '#F0EDE8', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
