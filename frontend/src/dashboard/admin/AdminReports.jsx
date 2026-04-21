import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';

export function AdminReports() {
  const [tab, setTab] = useState('students');
  const [students, setStudents] = useState([]);
  const [fees, setFees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  useEffect(() => {
    if (tab === 'students') {
      api('/api/admin/reports/students').then(setStudents).catch(() => setStudents([]));
    } else if (tab === 'fees') {
      api('/api/admin/reports/fees').then(setFees).catch(() => setFees([]));
    }
  }, [tab]);

  async function loadAttendance() {
    const q = new URLSearchParams();
    if (from) q.set('from', from);
    if (to) q.set('to', to);
    const rows = await api(`/api/admin/reports/attendance?${q.toString()}`);
    setAttendance(rows);
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Reports</h1>
      <div className="flex flex-wrap gap-2">
        {['students', 'fees', 'attendance'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize ${
              tab === t ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'students' && (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Class</th>
                <th className="px-4 py-3">Admission</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id} className="border-b border-slate-100 dark:border-slate-800">
                  <td className="px-4 py-3">{s.user?.name}</td>
                  <td className="px-4 py-3">{s.user?.email}</td>
                  <td className="px-4 py-3">{s.class ? `${s.class.name} ${s.class.section}` : '—'}</td>
                  <td className="px-4 py-3">{s.admissionNo || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'fees' && (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
              <tr>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Purpose</th>
                <th className="px-4 py-3">Paid</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((p) => (
                <tr key={p._id} className="border-b border-slate-100 dark:border-slate-800">
                  <td className="px-4 py-3">{p.student?.user?.name}</td>
                  <td className="px-4 py-3">₹{p.amount}</td>
                  <td className="px-4 py-3">{p.purpose}</td>
                  <td className="px-4 py-3">{p.paidAt ? new Date(p.paidAt).toLocaleString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'attendance' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <input
              type="date"
              className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
            <input
              type="date"
              className="rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <button
              type="button"
              onClick={() => loadAttendance()}
              className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Load
            </button>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Class</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((a) => (
                  <tr key={a._id} className="border-b border-slate-100 dark:border-slate-800">
                    <td className="px-4 py-3">{new Date(a.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{a.student?.user?.name}</td>
                    <td className="px-4 py-3">
                      {a.classRef ? `${a.classRef.name} ${a.classRef.section}` : '—'}
                    </td>
                    <td className="px-4 py-3 capitalize">{a.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
