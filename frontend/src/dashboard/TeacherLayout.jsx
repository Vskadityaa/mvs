import { Outlet } from 'react-router-dom';
import { DashboardShell } from '../components/DashboardShell.jsx';
import { panelWebsiteNavItems } from '../config/panelWebsiteNav.js';

const teacherOnlyNav = [
  { to: '/teacher', label: 'My classes', icon: '📚', end: true },
  { to: '/teacher/homework', label: 'Homework', icon: '📎' },
  { to: '/teacher/notes', label: 'Notes', icon: '📄' },
  { to: '/teacher/marks', label: 'Marks', icon: '✏️' },
  { to: '/teacher/announcements', label: 'Announcements', icon: '📢' },
];

const navItems = [...panelWebsiteNavItems('/teacher'), ...teacherOnlyNav];

export function TeacherLayout() {
  return (
    <DashboardShell title="Teacher" navItems={navItems}>
      <Outlet />
    </DashboardShell>
  );
}
