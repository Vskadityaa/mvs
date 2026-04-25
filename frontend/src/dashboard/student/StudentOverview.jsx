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

  if (!profile) return <p className="text-slate-500">लोड होत आहे…</p>;

  const unread = notifications.filter((x) => !x.read).length;

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-600 to-indigo-700 p-8 text-white shadow-lg dark:border-slate-800">
        <p className="text-sm font-medium text-white/80">पुन्हा स्वागत</p>
        <h1 className="mt-2 font-display text-3xl font-bold">{profile.user?.name}</h1>
        <p className="mt-2 text-white/90">
          {profile.class
            ? `${profile.class.name} ${profile.class.section}`
            : 'वर्ग अद्याप नेमलेला नाही'}
        </p>
        <p className="mt-1 text-sm text-white/80">
          रोल: {profile.rollNo || '—'} · प्रवेश क्र.: {profile.admissionNo || '—'}
        </p>
      </div>

      {unread > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
          तुमच्याकडे {unread} न वाचलेली नोटिफिकेशन्स आहेत.{' '}
          <Link to="/student/notifications" className="font-semibold underline">
            पहा
          </Link>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { to: '/student/attendance', label: 'उपस्थिती', desc: 'तुमची नोंद पहा' },
          { to: '/student/homework', label: 'गृहपाठ', desc: 'कामे व जोडलेल्या फाइल्स' },
          { to: '/student/notes', label: 'नोट्स', desc: 'PDF डाउनलोड' },
          { to: '/student/results', label: 'निकाल', desc: 'गुण व परीक्षा' },
          { to: '/student/notices', label: 'सूचना', desc: 'रिअल-टाइम अपडेट्स' },
          { to: '/student/fees', label: 'फी', desc: 'Razorpay / डेमो पेमेंट' },
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
