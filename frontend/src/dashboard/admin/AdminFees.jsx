import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';

export function AdminFees() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api('/api/payment/all')
      .then(setRows)
      .catch(() => setRows([]));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Payments</h1>
      <p className="text-sm text-slate-500">Razorpay and dummy-mode transactions</p>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-slate-50 text-xs uppercase dark:border-slate-800 dark:bg-slate-800/50">
            <tr>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">When</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p._id} className="border-b border-slate-100 dark:border-slate-800">
                <td className="px-4 py-3">
                  {p.student?.user?.name || '—'} <span className="text-slate-400">{p.student?.user?.email}</span>
                </td>
                <td className="px-4 py-3">₹{p.amount}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      p.status === 'paid' || p.status === 'dummy'
                        ? 'bg-emerald-100 text-emerald-800'
                        : p.status === 'failed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">
                  {p.paidAt ? new Date(p.paidAt).toLocaleString() : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
