import { motion } from 'framer-motion';

export function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">About Us</h1>
        <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
          Nutan Vidya Mandir&apos;s Maharashtra English School, Goregaon, is a progressive institution rooted in
          Mumbai&apos;s educational landscape while
          embracing modern pedagogy and technology.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-display text-xl font-semibold text-brand-700 dark:text-brand-300">Founder</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            <strong className="text-slate-900 dark:text-white">Dr. Ananya Deshpande</strong> — educator and
            community leader with 30 years of experience in public and private schooling. Her vision was to
            build an inclusive campus where Marathi and English mediums thrive side by side.
          </p>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-display text-xl font-semibold text-brand-700 dark:text-brand-300">Our history</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Established in 1998 as a single-building primary school, we grew into a full-spectrum institution
            serving Prathamik through Madhyamik, adding English Medium pathways in 2008. Today we are a
            reference campus for digital school operations in the region.
          </p>
        </section>
      </div>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-gradient-to-br from-brand-50 to-white p-8 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
        <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">Vision &amp; mission</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-brand-600">Vision</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Nurture curious, compassionate citizens who excel academically and contribute to society.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-brand-600">Mission</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Deliver rigorous academics, vernacular pride, ethical leadership, and accessible technology for
              every stakeholder.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
