import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api.js';

export function TeacherOverview() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api('/api/teacher/profile/classes')
      .then(setProfile)
      .catch(() => setProfile(null));
  }, []);

  if (!profile) return <p className="text-slate-500">Loading…</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">My classes</h1>
        <p className="text-sm text-slate-500">{profile.qualification || 'Teacher'} · {profile.experienceYears} yrs</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {(profile.classes || []).map((c) => (
          <Link
            key={c._id}
            to={`/teacher/attendance/${c._id}`}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:border-brand-300 dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="font-display text-lg font-semibold text-slate-900 dark:text-white">
              {c.name} {c.section}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Subjects: {(profile.subjects || []).map((s) => s.name).join(', ')}
            </p>
            <p className="mt-4 text-sm font-medium text-brand-600">Open attendance →</p>
          </Link>
        ))}
      </div>
      {(!profile.classes || profile.classes.length === 0) && (
        <p className="text-slate-500">No classes assigned yet. Ask an admin to link your profile.</p>
      )}
    </div>
  );
}
