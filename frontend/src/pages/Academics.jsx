import { motion } from 'framer-motion';

const streams = [
  {
    title: 'Marathi Prathamik',
    body: 'Foundational literacy in Marathi, numeracy, arts, and environmental awareness with activity-based learning.',
    grades: 'Std 1–4',
  },
  {
    title: 'Marathi Madhyamik',
    body: 'State-board aligned curriculum with science labs, language excellence, and competitive exam readiness.',
    grades: 'Std 5–10',
  },
  {
    title: 'English Medium',
    body: 'CBSE-inspired pedagogy with global reading programs, STEM projects, and holistic assessments.',
    grades: 'Std 1–10',
  },
];

export function Academics() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">Academics</h1>
      <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
        Three strong pathways — each with dedicated faculty, digital resources, and measurable learning outcomes.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {streams.map((s, i) => (
          <motion.article
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">{s.grades}</span>
            <h2 className="mt-2 font-display text-lg font-semibold text-slate-900 dark:text-white">{s.title}</h2>
            <p className="mt-3 flex-1 text-sm text-slate-600 dark:text-slate-400">{s.body}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
