import { motion } from 'framer-motion';

export function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">आमच्याबद्दल</h1>
        <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
          नूतन विद्या मंदिर महाराष्ट्र इंग्लिश स्कूल, गोरेगाव ही मुंबईच्या शैक्षणिक परंपरेत रुजलेली
          आणि आधुनिक अध्यापन पद्धती व तंत्रज्ञान स्वीकारणारी प्रगत संस्था आहे.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-display text-xl font-semibold text-brand-700 dark:text-brand-300">संस्थापक</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            <strong className="text-slate-900 dark:text-white">डॉ. अनन्या देशपांडे</strong> — सार्वजनिक आणि
            खासगी शिक्षण क्षेत्रातील 30 वर्षांचा अनुभव असलेल्या शिक्षिका आणि समाजनेत्या. मराठी आणि इंग्रजी
            माध्यम एकत्र फुलतील असा समावेशक कॅम्पस उभारणे हे त्यांचे ध्येय होते.
          </p>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-display text-xl font-semibold text-brand-700 dark:text-brand-300">आमचा इतिहास</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            1998 मध्ये एका इमारतीतील प्राथमिक शाळा म्हणून सुरुवात करून आम्ही प्राथमिक ते माध्यमिकपर्यंत
            पूर्ण शैक्षणिक संस्था झालो. 2008 मध्ये इंग्रजी माध्यम प्रवाह सुरू केला. आज आम्ही या भागातील
            डिजिटल शाळा व्यवस्थापनासाठी आदर्श कॅम्पस म्हणून ओळखले जातो.
          </p>
        </section>
      </div>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-gradient-to-br from-brand-50 to-white p-8 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
        <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">दृष्टी आणि ध्येय</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-brand-600">दृष्टी</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              शैक्षणिकदृष्ट्या प्रगतीशील आणि समाजाभिमुख असे जिज्ञासू, संवेदनशील नागरिक घडवणे.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-brand-600">ध्येय</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              काटेकोर शिक्षण, मातृभाषेचा अभिमान, नैतिक नेतृत्व आणि सर्व भागधारकांसाठी सुलभ तंत्रज्ञान उपलब्ध करणे.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
