import { motion } from 'framer-motion';

const streams = [
  {
    title: 'Marathi Prathamik',
    body: 'क्रियाधारित शिक्षणातून मराठी साक्षरता, अंकज्ञान, कला आणि पर्यावरण-जागरूकतेचा मजबूत पाया.',
    grades: 'इयत्ता 1–4',
  },
  {
    title: 'Marathi Madhyamik',
    body: 'राज्य मंडळानुसार अभ्यासक्रम, विज्ञान प्रयोगशाळा, भाषिक प्रावीण्य आणि स्पर्धा परीक्षांची तयारी.',
    grades: 'इयत्ता 5–10',
  },
  {
    title: 'इंग्रजी माध्यम',
    body: 'CBSE प्रेरित अध्यापन, जागतिक वाचन कार्यक्रम, STEM प्रकल्प आणि सर्वांगीण मूल्यमापन.',
    grades: 'इयत्ता 1–10',
  },
];

export function Academics() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">शैक्षणिक</h1>
      <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
        तीन सक्षम शैक्षणिक मार्ग — प्रत्येकासाठी समर्पित शिक्षकवर्ग, डिजिटल साधने आणि मोजता येणारे शैक्षणिक परिणाम.
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
