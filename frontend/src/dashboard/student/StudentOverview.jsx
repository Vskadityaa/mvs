import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api.js';

export function StudentOverview() {
  const [profile, setProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    Promise.all([api('/api/student/me'), api('/api/student/notifications')])
      .then(([p, n]) => {
        setProfile(p);
        setNotifications(n);
      })
      .catch(() => {});
  }, []);

  if (!profile) return <p className="text-slate-500">Loading…</p>;

  const unread = notifications.filter((x) => !x.read).length;

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-600 to-indigo-700 p-8 text-white shadow-lg dark:border-slate-800">
        <p className="text-sm font-medium text-white/80">Welcome back</p>
        <h1 className="mt-2 font-display text-3xl font-bold">{profile.user?.name}</h1>
        <p className="mt-2 text-white/90">
          {profile.class
            ? `${profile.class.name} ${profile.class.section}`
            : 'Class not assigned yet'}
        </p>
        <p className="mt-1 text-sm text-white/80">
          Roll: {profile.rollNo || '—'} · Admission: {profile.admissionNo || '—'}
        </p>
      </div>

      {unread > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
          You have {unread} unread notifications.{' '}
          <Link to="/student/notifications" className="font-semibold underline">
            View
          </Link>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { to: '/student/attendance', label: 'Attendance', desc: 'View your record' },
          { to: '/student/homework', label: 'Homework', desc: 'Tasks & attachments' },
          { to: '/student/notes', label: 'Notes', desc: 'Download PDFs' },
          { to: '/student/results', label: 'Results', desc: 'Marks & exams' },
          { to: '/student/notices', label: 'Notices', desc: 'Real-time updates' },
          { to: '/student/fees', label: 'Fees', desc: 'Razorpay / demo pay' },
        ].map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:border-brand-300 dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="font-display text-lg font-semibold text-slate-900 dark:text-white">{c.label}</p>
            <p className="mt-1 text-sm text-slate-500">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
