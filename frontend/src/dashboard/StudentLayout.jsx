import { Outlet } from 'react-router-dom';
import { DashboardShell } from '../components/DashboardShell.jsx';
import { panelWebsiteNavItems } from '../config/panelWebsiteNav.js';

const studentOnlyNav = [
  { to: '/student', label: 'Dashboard', icon: '📊', end: true },
  { to: '/student/attendance', label: 'Attendance', icon: '✅' },
  { to: '/student/homework', label: 'Homework', icon: '📌' },
  { to: '/student/notes', label: 'Notes', icon: '📥' },
  { to: '/student/results', label: 'Results', icon: '🏆' },
  { to: '/student/notices', label: 'Notices', icon: '🔔' },
  { to: '/student/fees', label: 'Fees', icon: '₹' },
  { to: '/student/notifications', label: 'Alerts', icon: '💡' },
  { to: '/student/feedback', label: 'Feedback', icon: '💭' },
  { to: '/student/chat', label: 'Class chat', icon: '💬' },
];

const navItems = [...panelWebsiteNavItems('/student'), ...studentOnlyNav];

export function StudentLayout() {
  return (
    <DashboardShell title="Student" navItems={navItems}>
      <Outlet />
    </DashboardShell>
  );
}
