import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';

export function StudentNotes() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api('/api/student/notes').then(setRows).catch(() => setRows([]));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Notes</h1>
      <ul className="space-y-3">
        {rows.map((n) => (
          <li
            key={n._id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <p className="font-semibold">{n.title}</p>
              <p className="text-xs text-slate-500">{n.subject?.name}</p>
            </div>
            <a
              href={n.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
