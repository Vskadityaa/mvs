import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { api } from '../../services/api.js';

export function AdminOverview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api('/api/admin/dashboard').then(setData).catch(() => setData(null));
  }, []);

  if (!data) {
    return <p className="text-slate-500">Loading analytics…</p>;
  }

  const cards = [
    { label: 'Students', value: data.counts.students, color: 'from-blue-500 to-indigo-600' },
    { label: 'Teachers', value: data.counts.teachers, color: 'from-emerald-500 to-teal-600' },
    { label: 'Classes', value: data.counts.classes, color: 'from-amber-500 to-orange-600' },
    { label: 'Attendance today', value: data.counts.attendanceToday, color: 'from-violet-500 to-purple-600' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-slate-500">Operational snapshot</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-2xl bg-gradient-to-br ${c.color} p-5 text-white shadow-lg`}
          >
            <p className="text-sm font-medium text-white/90">{c.label}</p>
            <p className="mt-2 text-3xl font-bold">{c.value}</p>
          </motion.div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900 lg:col-span-2"
        >
          <h2 className="font-semibold text-slate-900 dark:text-white">Fee collections (by month)</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.feeTrend?.length ? data.feeTrend : [{ month: '—', amount: 0 }]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Bar dataKey="amount" fill="#3188ff" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="font-semibold text-slate-900 dark:text-white">Revenue (paid + demo)</h2>
          <p className="mt-4 text-4xl font-bold text-brand-600 dark:text-brand-400">
            ₹{Number(data.revenue || 0).toLocaleString('en-IN')}
          </p>
          <p className="mt-2 text-sm text-slate-500">Includes Razorpay verified and dummy fallback payments.</p>
        </motion.div>
      </div>
    </div>
  );
}
