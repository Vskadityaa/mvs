import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../services/api.js';
import { BRANDING } from '../config/branding.js';
import { BrandMark } from '../components/BrandMark.jsx';

const STATIC_NOTICES = [
  'Admissions open for 2026–27 — apply online.',
  'Parent–teacher meetings: Std 5–7 on Saturday.',
  'Sports day rehearsal schedule published on the portal.',
];

export function Home() {
  const [notices, setNotices] = useState([]);
  const [heroImgOk, setHeroImgOk] = useState(true);

  useEffect(() => {
    api('/api/public/notices-ticker')
      .then((data) => (Array.isArray(data) && data.length ? setNotices(data) : setNotices([])))
      .catch(() => setNotices([]));
  }, []);

  const tickerItems =
    notices.length > 0
      ? notices.map((n) => ({
          key: n._id || n.title,
          text: `${n.title}${n.body ? ` — ${String(n.body).slice(0, 90)}` : ''}`,
        }))
      : STATIC_NOTICES.map((t, i) => ({ key: `s-${i}`, text: t }));

  return (
    <div className="bg-white dark:bg-slate-950">
      {/* Notice ticker */}
      <div className="bg-brand-800 py-2.5 text-white dark:bg-brand-950">
        <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-hidden px-4">
          <span className="shrink-0 rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-brand-100">
            Notice
          </span>
          <motion.div
            className="flex gap-16 whitespace-nowrap text-sm text-brand-50"
            animate={{ x: [0, -720] }}
            transition={{ repeat: Infinity, duration: 38, ease: 'linear' }}
          >
            {[...tickerItems, ...tickerItems].map((n, i) => (
              <span key={`${n.key}-${i}`}>{n.text}</span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative min-h-[88vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-brand-900/95 to-slate-900"
          aria-hidden
        />
        {heroImgOk && (
          <img
            src={BRANDING.heroBackground}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center opacity-55 mix-blend-normal"
            onError={() => setHeroImgOk(false)}
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-500/20 via-transparent to-transparent" />

        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-4 py-20 md:px-6 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl"
          >
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <BrandMark variant="hero" className="h-14 md:h-20" />
              <span className="hidden h-8 w-px bg-white/30 sm:block" />
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-200">
                {BRANDING.tagline}
              </p>
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-6xl">
              Where tradition meets{' '}
              <span className="text-brand-200">modern school management</span> — for every learner.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-200 md:text-xl">
              {BRANDING.schoolNameShort} carries forward the Nutan Vidya Mandir legacy with a strong
              English-medium programme in {BRANDING.locationLine}: caring faculty, disciplined routines, and a
              digital campus experience — from admissions to fees, attendance to results — in one secure portal.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/admission"
                  className="inline-flex rounded-2xl bg-white px-8 py-3.5 font-semibold text-brand-900 shadow-xl shadow-black/20 hover:bg-brand-50"
                >
                  Apply for admission
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/login"
                  className="inline-flex rounded-2xl border-2 border-white/40 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur-sm hover:bg-white/20"
                >
                  Portal login
                </Link>
              </motion.div>
              <Link
                to="/academics"
                className="text-sm font-semibold text-brand-200 underline-offset-4 hover:text-white hover:underline"
              >
                Explore academics →
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { v: '25+', l: 'Years of excellence' },
              { v: '1,200+', l: 'Students on roll' },
              { v: '85+', l: 'Faculty members' },
              { v: '3', l: 'Academic streams' },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
              >
                <p className="font-display text-3xl font-bold text-white">{s.v}</p>
                <p className="mt-1 text-sm text-slate-300">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="border-b border-slate-200 bg-slate-50 py-14 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
                A full-stack campus — not just classrooms.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                From the first admission enquiry to the last bell, we run academics with transparency:
                digital attendance, structured homework, secure document sharing, fee collection aligned with
                Indian payments, and instant notices that reach parents and students in real time.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              {['NEP-aligned practices', 'Vernacular + English', 'STEM & arts balance', 'Safe campus'].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us — long grid */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="text-sm font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Why families choose us
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white">
            Rooted in culture. Ready for the future.
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            We balance rigorous academics with wellbeing, mother-tongue confidence, and exposure to global
            English-medium standards — so every child can thrive in higher studies and in life.
          </p>
        </motion.div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Scholastic depth',
              body: 'Concept-first teaching, continuous assessment, and remedial support — not last-minute cramming.',
            },
            {
              title: 'Character & discipline',
              body: 'Assembly, house system, service learning, and clear codes of conduct build responsible citizens.',
            },
            {
              title: 'Teacher quality',
              body: 'Experienced mentors with strong subject command and regular professional development.',
            },
            {
              title: 'Parent partnership',
              body: 'Transparent communication, suggestion channels, and timely academic updates on the portal.',
            },
            {
              title: 'Sports & creativity',
              body: 'Athletics, music, drama, and clubs — timetabled, coached, and celebrated on stage.',
            },
            {
              title: 'Safe infrastructure',
              body: 'CCTV coverage, visitor protocols, first-aid readiness, and child-protection trained staff.',
            },
          ].map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-card dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{c.body}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Academics detail */}
      <section className="border-y border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">Academic programmes</h2>
          <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-400">
            Three distinct pathways — each with its own timetable, materials, and examination readiness — sharing
            the same values and pastoral care.
          </p>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {[
              {
                title: 'Marathi Prathamik',
                grades: 'Std 1 – 4',
                body: 'Strong foundation in Marathi literacy, oral storytelling, number sense, EVS through projects, and joyful arts. Focus on reading fluency, handwriting, and confidence in expression before the middle stage.',
              },
              {
                title: 'Marathi Madhyamik',
                grades: 'Std 5 – 10',
                body: 'State-board aligned progression with science lab work, geography map skills, history inquiry, and language papers that prepare for scholarship exams. Regular unit tests with actionable feedback.',
              },
              {
                title: 'English Medium',
                grades: 'Std 1 – 10',
                body: 'Global English proficiency with structured phonics / reading workshops, Cambridge-style comprehension, integrated STEM projects, and holistic reporting — ideal for families planning wider career options.',
              },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-card dark:border-slate-800 dark:bg-slate-950"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-brand-600">{p.grades}</span>
                <h3 className="mt-3 font-display text-xl font-semibold text-slate-900 dark:text-white">
                  {p.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {p.body}
                </p>
                <Link
                  to="/academics"
                  className="mt-6 inline-flex text-sm font-semibold text-brand-600 hover:underline"
                >
                  Read more
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus image section */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl border border-slate-200 shadow-card dark:border-slate-800"
          >
            <img
              src={BRANDING.sectionCampus}
              alt="Campus"
              className="aspect-[4/3] w-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1580582932707-520aed937d7f?w=1200&q=80';
              }}
            />
          </motion.div>
          <div>
            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
              Campus built for focus — and for joy.
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Spacious classrooms with natural light, library reading corners, science and computer labs,
              multipurpose hall for assemblies, and playgrounds that host both structured PE and free play.
              Our digital layer ties it together: attendance on tablets, homework with attachments, and secure
              fee receipts parents can download anytime.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex gap-2">
                <span className="text-brand-600">✓</span> Smart-class readiness &amp; stable campus Wi‑Fi zones
              </li>
              <li className="flex gap-2">
                <span className="text-brand-600">✓</span> Transport routes with GPS tracking (where applicable)
              </li>
              <li className="flex gap-2">
                <span className="text-brand-600">✓</span> Counselling &amp; learning-support referrals
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/student-life"
                className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Student life &amp; events
              </Link>
              <Link to="/faculty" className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold dark:border-slate-700">
                Meet the faculty
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Digital portal */}
      <section className="bg-gradient-to-br from-brand-700 to-indigo-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-display text-3xl font-bold">One portal for the whole school.</h2>
              <p className="mt-4 text-brand-100">
                Administrators, teachers, students, and guardians each get a role-based dashboard: analytics
                for leaders, attendance &amp; grading tools for faculty, downloads &amp; fee payment for families.
                Optional Firebase integration powers real-time notices and cloud file storage for notes and
                assignments.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                'JWT-secured login + optional Google sign-in',
                'Razorpay-ready fees with demo fallback',
                'Firestore-ready notice broadcasts',
                'PDF notes via cloud storage',
              ].map((t) => (
                <div key={t} className="rounded-2xl border border-white/20 bg-white/10 p-4 text-sm">
                  {t}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/login"
              className="inline-flex rounded-2xl bg-white px-8 py-3.5 font-semibold text-brand-900 hover:bg-brand-50"
            >
              Open the demo portal
            </Link>
          </div>
        </div>
      </section>

      {/* Student life image / achievements */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
              Beyond textbooks — teams, stages, and service.
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Annual day, science exhibitions, inter-house sports, debate clubs, and community outreach teach
              leadership and empathy. Student achievements are celebrated publicly and recorded for scholarships
              and higher-admission portfolios.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { t: 'District science fair — Gold', y: '2025' },
                { t: 'State athletics — relay finalists', y: '2024' },
                { t: '100% literacy milestone — Prathamik', y: '2024' },
                { t: 'NSS / social impact projects', y: 'Ongoing' },
              ].map((a) => (
                <div
                  key={a.t}
                  className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                >
                  <p className="text-xs font-bold text-brand-600">{a.y}</p>
                  <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">{a.t}</p>
                </div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 overflow-hidden rounded-3xl border border-slate-200 shadow-card dark:border-slate-800 lg:order-2"
          >
            <img
              src={BRANDING.sectionLife}
              alt="Student life"
              className="aspect-[4/3] w-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&q=80';
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center font-display text-3xl font-bold text-slate-900 dark:text-white">
            Voices from our community
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                q: 'The portal made fee payments and circulars effortless — we never miss an update.',
                n: 'Parent of Std 6 student',
              },
              {
                q: 'I upload notes once; students get notified instantly. Attendance is faster than paper registers.',
                n: 'Senior teacher, Mathematics',
              },
              {
                q: 'We finally have one dashboard for admissions, fees, and compliance reports.',
                n: 'School administrator',
              },
            ].map((t, i) => (
              <motion.blockquote
                key={t.n}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-950"
              >
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">&ldquo;{t.q}&rdquo;</p>
                <footer className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {t.n}
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-20 md:px-6">
        <h2 className="text-center font-display text-3xl font-bold text-slate-900 dark:text-white">
          Frequently asked questions
        </h2>
        <dl className="mt-10 space-y-4">
          {[
            {
              q: 'How do I apply for admission?',
              a: 'Use the Admission page on this site to submit an enquiry. Our office reviews applications and updates status in the admin system.',
            },
            {
              q: 'Do you offer transport and meals?',
              a: 'Route information is shared during counselling. The canteen follows hygiene audits; meal plans vary by campus policy.',
            },
            {
              q: 'How does the parent portal work?',
              a: 'After enrolment, families receive portal credentials. You can view notices, homework, attendance summaries, and pay fees online when enabled.',
            },
            {
              q: 'Is there a demo without installing the server?',
              a: 'Yes — open Login and use “Static demo” to explore dashboards with sample data while you prepare your deployment.',
            },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <dt className="font-semibold text-slate-900 dark:text-white">{item.q}</dt>
              <dd className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Final CTA */}
      <section className="border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-6">
          <BrandMark className="mx-auto h-14" />
          <h2 className="mt-6 font-display text-3xl font-bold text-slate-900 dark:text-white">
            Visit us. Learn with us. Grow with {BRANDING.schoolNameMicro}.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
            Book a campus tour, talk to admissions, or try the static demo portal today — your child&apos;s
            journey can start with a single conversation.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="rounded-2xl bg-brand-600 px-8 py-3.5 font-semibold text-white shadow-lg hover:bg-brand-700"
            >
              Contact &amp; map
            </Link>
            <Link
              to="/suggestion"
              className="rounded-2xl border border-slate-200 px-8 py-3.5 font-semibold text-slate-800 hover:border-brand-300 dark:border-slate-700 dark:text-white"
            >
              Suggestion box
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
