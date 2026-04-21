import { Outlet } from 'react-router-dom';
import { DashboardShell } from '../components/DashboardShell.jsx';
import { panelWebsiteNavItems } from '../config/panelWebsiteNav.js';

const adminOnlyNav = [
  { to: '/admin', label: 'Overview', icon: '📊', end: true },
  { to: '/admin/students', label: 'Students', icon: '🎓' },
  { to: '/admin/teachers', label: 'Teachers', icon: '👩‍🏫' },
  { to: '/admin/classes', label: 'Classes', icon: '🏫' },
  { to: '/admin/admissions', label: 'Admissions', icon: '📝' },
  { to: '/admin/notices', label: 'Notices', icon: '📣' },
  { to: '/admin/events', label: 'Events', icon: '🎪' },
  { to: '/admin/suggestions', label: 'Suggestions', icon: '💬' },
  { to: '/admin/fees', label: 'Payments', icon: '₹' },
  { to: '/admin/reports', label: 'Reports', icon: '📁' },
];

const navItems = [...panelWebsiteNavItems('/admin'), ...adminOnlyNav];

export function AdminLayout() {
  return (
    <DashboardShell title="Admin" navItems={navItems}>
      <Outlet />
    </DashboardShell>
  );
}
