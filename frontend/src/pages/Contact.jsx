import { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/api.js';

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      await api('/api/public/contact', { method: 'POST', body: JSON.stringify(form) });
      setStatus('Message sent. We will get back to you shortly.');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus(err.message);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">Contact</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Nutan Vidya Mandir&apos;s Maharashtra English School, Goregaon, Mumbai — update this address in
            Contact.jsx with your full postal address and landmark.
          </p>
          <p className="mt-2 text-sm text-slate-500">Phone: +91 20 4000 0000 · admissions@vidyasetu.edu</p>
          <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
            <iframe
              title="map"
              className="h-full w-full"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=73.75%2C18.45%2C73.95%2C18.55&layer=mapnik"
            />
          </div>
        </motion.div>
        <form
          onSubmit={submit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Send a message</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-brand-600 py-3 font-semibold text-white hover:bg-brand-700"
          >
            Submit
          </button>
          {status && <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">{status}</p>}
        </form>
      </div>
    </div>
  );
}
