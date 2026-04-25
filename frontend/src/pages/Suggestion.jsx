import { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/api.js';

export function Suggestion() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  async function submit(e) {
    e.preventDefault();
    setStatus('');
    try {
      await api('/api/public/suggestions', { method: 'POST', body: JSON.stringify(form) });
      setStatus('धन्यवाद — तुमची सूचना नोंदवली गेली.');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus(err.message || 'सबमिट करण्यात अयशस्वी');
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16 md:px-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">सूचना पेटी</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          अभिप्राय तुमच्या नावासह किंवा नाव न देता पाठवा — प्रशासकीय पुनरावलोकनासाठी सुरक्षितरीत्या साठवला जातो.
        </p>
      </motion.div>
      <form onSubmit={submit} className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">नाव</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">ईमेल</label>
          <input
            type="email"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">संदेश</label>
          <textarea
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            minLength={10}
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-brand-600 py-3 font-semibold text-white hover:bg-brand-700"
        >
          पाठवा
        </button>
        {status && <p className="text-center text-sm text-slate-600 dark:text-slate-400">{status}</p>}
      </form>
    </div>
  );
}
