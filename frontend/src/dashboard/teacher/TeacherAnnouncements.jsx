import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';

export function TeacherAnnouncements() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api('/api/teacher/announcements').then(setRows).catch(() => setRows([]));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">घोषणा</h1>
      <ul className="space-y-3">
        {rows.map((n) => (
          <li
            key={n._id}
            className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="font-semibold">{n.title}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">{n.body}</p>
            <p className="mt-2 text-xs text-slate-400">{new Date(n.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
