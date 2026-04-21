import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';

export function StudentNotifications() {
  const [rows, setRows] = useState([]);

  async function load() {
    setRows(await api('/api/student/notifications'));
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  async function markRead(id) {
    await api(`/api/student/notifications/${id}/read`, { method: 'PATCH' });
    load();
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Notifications</h1>
      <ul className="space-y-2">
        {rows.map((n) => (
          <li
            key={n._id}
            className={`rounded-2xl border p-4 dark:border-slate-800 ${
              n.read ? 'border-slate-200 bg-white dark:bg-slate-900' : 'border-brand-200 bg-brand-50/40 dark:bg-brand-950/20'
            }`}
          >
            <p className="font-semibold">{n.title}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">{n.body}</p>
            <p className="mt-2 text-xs text-slate-400">{new Date(n.createdAt).toLocaleString()}</p>
            {!n.read && (
              <button
                type="button"
                className="mt-2 text-xs font-semibold text-brand-600"
                onClick={() => markRead(n._id)}
              >
                Mark read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
