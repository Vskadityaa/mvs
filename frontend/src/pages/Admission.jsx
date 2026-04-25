import { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/api.js';

export function Admission() {
  const [form, setForm] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    applyingClass: '',
    previousSchool: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      await api('/api/public/admissions', { method: 'POST', body: JSON.stringify(form) });
      setStatus('अर्ज प्राप्त झाला. पडताळणीनंतर आमचे कार्यालय तुमच्याशी संपर्क करेल.');
      setForm({
        studentName: '',
        parentName: '',
        email: '',
        phone: '',
        applyingClass: '',
        previousSchool: '',
        message: '',
      });
    } catch (err) {
      setStatus(err.message);
    }
  }

  const field = (key, label, type = 'text', props = {}) => (
    <div>
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      <input
        type={type}
        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        required={props.required !== false}
        {...props}
      />
    </div>
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:px-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">प्रवेश</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          चौकशी पाठवा. प्रशासक admin console मधून प्रवेश मंजूर करू शकतात.
        </p>
      </motion.div>
      <form
        onSubmit={submit}
        className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2"
      >
        {field('studentName', 'विद्यार्थ्याचे नाव')}
        {field('parentName', 'पालक / संरक्षक नाव')}
        {field('email', 'ईमेल', 'email')}
        {field('phone', 'फोन')}
        {field('applyingClass', 'कोणत्या वर्गासाठी अर्ज')}
        {field('previousSchool', 'मागील शाळा', 'text', { required: false })}
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">संदेश (ऐच्छिक)</label>
          <textarea
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full rounded-xl bg-brand-600 py-3 font-semibold text-white hover:bg-brand-700"
          >
            अर्ज सबमिट करा
          </button>
        </div>
        {status && (
          <p className="md:col-span-2 text-center text-sm text-slate-600 dark:text-slate-400">{status}</p>
        )}
      </form>
    </div>
  );
}
