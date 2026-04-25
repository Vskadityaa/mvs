import { Outlet } from 'react-router-dom';
import { DashboardShell } from '../components/DashboardShell.jsx';
import { panelWebsiteNavItems } from '../config/panelWebsiteNav.js';

const adminOnlyNav = [
  { to: '/admin', label: 'आढावा', icon: '📊', end: true },
  { to: '/admin/students', label: 'विद्यार्थी', icon: '🎓' },
  { to: '/admin/teachers', label: 'शिक्षक', icon: '👩‍🏫' },
  { to: '/admin/classes', label: 'वर्ग', icon: '🏫' },
  { to: '/admin/admissions', label: 'प्रवेश अर्ज', icon: '📝' },
  { to: '/admin/notices', label: 'सूचना', icon: '📣' },
  { to: '/admin/events', label: 'कार्यक्रम', icon: '🎪' },
  { to: '/admin/suggestions', label: 'सूचना/संपर्क', icon: '💬' },
  { to: '/admin/fees', label: 'पेमेंट्स', icon: '₹' },
  { to: '/admin/reports', label: 'अहवाल', icon: '📁' },
];

const navItems = [...panelWebsiteNavItems('/admin'), ...adminOnlyNav];

export function AdminLayout() {
  return (
    <DashboardShell title="प्रशासक" navItems={navItems}>
      <Outlet />
    </DashboardShell>
  );
}
