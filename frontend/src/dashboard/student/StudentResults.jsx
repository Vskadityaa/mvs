import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';

export function StudentResults() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api('/api/student/marks').then(setRows).catch(() => setRows([]));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">निकाल</h1>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
            <tr>
              <th className="px-4 py-3">परीक्षा</th>
              <th className="px-4 py-3">विषय</th>
              <th className="px-4 py-3">गुण</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m._id} className="border-b border-slate-100 dark:border-slate-800">
                <td className="px-4 py-3">{m.examName}</td>
                <td className="px-4 py-3">{m.subject?.name}</td>
                <td className="px-4 py-3 font-semibold">
                  {m.obtained}/{m.maxMarks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
