import { Outlet } from 'react-router-dom';
import { DashboardShell } from '../components/DashboardShell.jsx';
import { panelWebsiteNavItems } from '../config/panelWebsiteNav.js';

const studentOnlyNav = [
  { to: '/student', label: 'डॅशबोर्ड', icon: '📊', end: true },
  { to: '/student/attendance', label: 'उपस्थिती', icon: '✅' },
  { to: '/student/homework', label: 'गृहपाठ', icon: '📌' },
  { to: '/student/notes', label: 'नोट्स', icon: '📥' },
  { to: '/student/results', label: 'निकाल', icon: '🏆' },
  { to: '/student/notices', label: 'सूचना', icon: '🔔' },
  { to: '/student/fees', label: 'फी', icon: '₹' },
  { to: '/student/notifications', label: 'अलर्ट', icon: '💡' },
  { to: '/student/feedback', label: 'अभिप्राय', icon: '💭' },
  { to: '/student/chat', label: 'वर्ग चॅट', icon: '💬' },
];

const navItems = [...panelWebsiteNavItems('/student'), ...studentOnlyNav];

export function StudentLayout() {
  return (
    <DashboardShell title="विद्यार्थी" navItems={navItems}>
      <Outlet />
    </DashboardShell>
  );
}
