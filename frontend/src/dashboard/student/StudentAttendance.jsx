import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';

export function StudentAttendance() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api('/api/student/attendance').then(setRows).catch(() => setRows([]));
  }, []);

  const present = rows.filter((r) => r.status === 'present').length;
  const total = rows.length;
  const pct = total ? Math.round((present / total) * 100) : 0;

  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Attendance</h1>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-500">Recent snapshot</p>
        <p className="mt-2 text-3xl font-bold text-brand-600">{pct}%</p>
        <p className="text-sm text-slate-500">
          {present} present / {total} records shown
        </p>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r._id} className="border-b border-slate-100 dark:border-slate-800">
                <td className="px-4 py-3">{new Date(r.date).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  {r.classRef ? `${r.classRef.name} ${r.classRef.section}` : '—'}
                </td>
                <td className="px-4 py-3 capitalize">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
