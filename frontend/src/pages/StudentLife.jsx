import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/api.js';

const gallery = [
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
  'https://images.unsplash.com/photo-1580582932707-520aed937d7f?w=800&q=80',
  'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80',
];

export function StudentLife() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api('/api/public/events').then(setEvents).catch(() => setEvents([]));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">विद्यार्थी जीवन</h1>
      <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
        कार्यक्रम, यश आणि आमच्या समृद्ध कॅम्पस संस्कृतीची झलक.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">कार्यक्रम</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {events.length === 0 && (
            <p className="text-sm text-slate-500">अजून कार्यक्रम प्रकाशित झालेले नाहीत — नंतर पुन्हा पहा.</p>
          )}
          {events.map((e, i) => (
            <motion.div
              key={e._id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="text-xs font-semibold text-brand-600">
                {e.date ? new Date(e.date).toLocaleDateString() : ''}
              </p>
              <h3 className="mt-1 font-semibold text-slate-900 dark:text-white">{e.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{e.description}</p>
              {e.venue && <p className="mt-2 text-xs text-slate-500">📍 {e.venue}</p>}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">यश</h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-slate-600 dark:text-slate-400">
          <li>District-level science fair winners — 2024</li>
          <li>State karate championship — bronze medal</li>
          <li>100% literacy completion — Prathamik cohort</li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">गॅलरी</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {gallery.map((src, i) => (
            <motion.img
              key={src}
              src={src}
              alt=""
              className="h-36 w-full rounded-xl object-cover md:h-44"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
