import { Outlet } from 'react-router-dom';
import { DashboardShell } from '../components/DashboardShell.jsx';
import { panelWebsiteNavItems } from '../config/panelWebsiteNav.js';

const teacherOnlyNav = [
  { to: '/teacher', label: 'माझे वर्ग', icon: '📚', end: true },
  { to: '/teacher/homework', label: 'गृहपाठ', icon: '📎' },
  { to: '/teacher/notes', label: 'नोट्स', icon: '📄' },
  { to: '/teacher/marks', label: 'गुण', icon: '✏️' },
  { to: '/teacher/announcements', label: 'घोषणा', icon: '📢' },
];

const navItems = [...panelWebsiteNavItems('/teacher'), ...teacherOnlyNav];

export function TeacherLayout() {
  return (
    <DashboardShell title="शिक्षक" navItems={navItems}>
      <Outlet />
    </DashboardShell>
  );
}
