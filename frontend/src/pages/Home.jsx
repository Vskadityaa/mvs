import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../services/api.js';
import { BRANDING } from '../config/branding.js';
import { BrandMark } from '../components/BrandMark.jsx';

const STATIC_NOTICES = [
  '2026–27 साठी प्रवेश खुले आहेत — ऑनलाइन अर्ज करा.',
  'पालक-शिक्षक बैठक: इयत्ता 5–7 साठी शनिवार.',
  'क्रीडा दिनाच्या सरावाचे वेळापत्रक पोर्टलवर प्रकाशित केले आहे.',
];

export function Home() {
  const [notices, setNotices] = useState([]);
  const heroCandidates = [BRANDING.heroBackground, '/images/MV%20building1A.jpg'];
  const [heroIndex, setHeroIndex] = useState(0);
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
            सूचना
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
      <section className="relative min-h-screen overflow-hidden">
        {heroImgOk && (
          <img
            src={heroCandidates[heroIndex]}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            onError={() => {
              if (heroIndex < heroCandidates.length - 1) setHeroIndex((i) => i + 1);
              else setHeroImgOk(false);
            }}
          />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-950/62 via-brand-900/48 to-slate-900/62"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-500/20 via-transparent to-transparent" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-20 md:px-6 lg:py-24">
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
              परंपरा आणि{' '}
              <span className="text-brand-200">आधुनिक शाळा व्यवस्थापन</span> — प्रत्येक विद्यार्थ्यासाठी.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-200 md:text-xl">
              {BRANDING.schoolNameShort} नूतन विद्या मंदिरची परंपरा पुढे नेत आहे. {BRANDING.locationLine} येथे
              सक्षम इंग्लिश-माध्यम कार्यक्रम, काळजी घेणारे शिक्षक, शिस्तबद्ध दिनक्रम आणि डिजिटल कॅम्पस
              अनुभव — प्रवेश, फी, उपस्थिती ते निकाल — सर्व काही एका सुरक्षित पोर्टलमध्ये.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/admission"
                  className="inline-flex rounded-2xl bg-white px-8 py-3.5 font-semibold text-brand-900 shadow-xl shadow-black/20 hover:bg-brand-50"
                >
                  प्रवेशासाठी अर्ज करा
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/login"
                  className="inline-flex rounded-2xl border-2 border-white/40 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur-sm hover:bg-white/20"
                >
                  पोर्टल लॉगिन
                </Link>
              </motion.div>
              <Link
                to="/academics"
                className="text-sm font-semibold text-brand-200 underline-offset-4 hover:text-white hover:underline"
              >
                शैक्षणिक माहिती पहा →
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
              { v: '25+', l: 'गुणवत्तेची वर्षे' },
              { v: '1,200+', l: 'नोंदणीकृत विद्यार्थी' },
              { v: '85+', l: 'शिक्षक सदस्य' },
              { v: '3', l: 'शैक्षणिक प्रवाह' },
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
                पूर्ण-सुविधायुक्त कॅम्पस — फक्त वर्गखोल्या नव्हे.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                प्रवेश चौकशीपासून शेवटच्या घंटापर्यंत आम्ही शैक्षणिक प्रक्रिया पारदर्शक ठेवतो: डिजिटल
                उपस्थिती, नियोजित गृहपाठ, सुरक्षित दस्तऐवज शेअरिंग, भारतीय पेमेंट पद्धतीनुसार फी संकलन
                आणि पालक-विद्यार्थ्यांपर्यंत त्वरित पोहोचणाऱ्या सूचना.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              {['NEP अनुरूप पद्धती', 'मातृभाषा + इंग्रजी', 'STEM आणि कला संतुलन', 'सुरक्षित कॅम्पस'].map(
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
            कुटुंबे आम्हाला का निवडतात
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white">
            संस्कृतीशी नाळ जोडलेली. भविष्यासाठी सज्ज.
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            कडक शैक्षणिक गुणवत्ता, विद्यार्थ्यांचे कल्याण, मातृभाषेचा आत्मविश्वास आणि जागतिक
            इंग्रजी-माध्यम मानकांचा समतोल आम्ही राखतो — त्यामुळे प्रत्येक विद्यार्थी उच्च शिक्षणात
            आणि जीवनात प्रगती करू शकतो.
          </p>
        </motion.div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'अभ्यासाची सखोलता',
              body: 'संकल्पनांवर आधारित अध्यापन, सातत्यपूर्ण मूल्यमापन आणि पूरक मदत — शेवटच्या क्षणी घोकंपट्टी नाही.',
            },
            {
              title: 'व्यक्तिमत्व आणि शिस्त',
              body: 'सभा, हाऊस प्रणाली, सेवा-अभ्यास आणि स्पष्ट आचारसंहितेमुळे जबाबदार नागरिक घडतात.',
            },
            {
              title: 'शिक्षकांची गुणवत्ता',
              body: 'विषयांवर मजबूत पकड असलेले अनुभवी मार्गदर्शक आणि नियमित व्यावसायिक प्रगती.',
            },
            {
              title: 'पालक सहभाग',
              body: 'पारदर्शक संवाद, सूचना चॅनेल आणि पोर्टलवर वेळेवर शैक्षणिक अपडेट्स.',
            },
            {
              title: 'क्रीडा आणि सर्जनशीलता',
              body: 'अॅथलेटिक्स, संगीत, नाट्य आणि क्लब्स — नियोजनबद्ध, प्रशिक्षित आणि गौरवपूर्ण.',
            },
            {
              title: 'सुरक्षित पायाभूत सुविधा',
              body: 'CCTV कव्हरेज, अभ्यागत नियम, प्राथमिक उपचार तयारी आणि बालसुरक्षा प्रशिक्षित कर्मचारी.',
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
          <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">शैक्षणिक कार्यक्रम</h2>
          <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-400">
            तीन वेगवेगळे शैक्षणिक मार्ग — प्रत्येकाचा स्वतंत्र वेळापत्रक, साहित्य आणि परीक्षेची तयारी —
            परंतु समान मूल्ये आणि विद्यार्थी-केंद्री देखरेख.
          </p>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {[
              {
                title: 'Marathi Prathamik',
                grades: 'इयत्ता 1 – 4',
                body: 'Strong foundation in Marathi literacy, oral storytelling, number sense, EVS through projects, and joyful arts. Focus on reading fluency, handwriting, and confidence in expression before the middle stage.',
              },
              {
                title: 'Marathi Madhyamik',
                grades: 'इयत्ता 5 – 10',
                body: 'State-board aligned progression with science lab work, geography map skills, history inquiry, and language papers that prepare for scholarship exams. Regular unit tests with actionable feedback.',
              },
              {
                title: 'English Medium',
                grades: 'इयत्ता 1 – 10',
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
                  अधिक वाचा
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
              alt="कॅम्पस"
              className="aspect-[4/3] w-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1580582932707-520aed937d7f?w=1200&q=80';
              }}
            />
          </motion.div>
          <div>
            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
              लक्ष आणि आनंद यासाठी घडवलेला कॅम्पस.
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              नैसर्गिक प्रकाश असलेल्या प्रशस्त वर्गखोल्या, वाचन कोपरे, विज्ञान व संगणक प्रयोगशाळा,
              सभांसाठी बहुउद्देशीय हॉल आणि नियोजित क्रीडा तसेच मोकळ्या खेळासाठी मैदाने.
              डिजिटल प्रणालीमुळे सर्व काही जोडलेले आहे: टॅबलेटवर उपस्थिती, जोडफाइलसह गृहपाठ आणि
              पालकांना कधीही डाउनलोड करता येतील अशा सुरक्षित फी पावत्या.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex gap-2">
                <span className="text-brand-600">✓</span> स्मार्ट-क्लास तयारी आणि स्थिर कॅम्पस Wi‑Fi क्षेत्रे
              </li>
              <li className="flex gap-2">
                <span className="text-brand-600">✓</span> GPS ट्रॅकिंगसह वाहतूक मार्ग (लागू असल्यास)
              </li>
              <li className="flex gap-2">
                <span className="text-brand-600">✓</span> समुपदेशन आणि शिक्षण सहाय्य संदर्भ
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/student-life"
                className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
              >
                विद्यार्थी जीवन व कार्यक्रम
              </Link>
              <Link to="/faculty" className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold dark:border-slate-700">
                शिक्षकवर्ग भेटा
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
              <h2 className="font-display text-3xl font-bold">संपूर्ण शाळेसाठी एकच पोर्टल.</h2>
              <p className="mt-4 text-brand-100">
                प्रशासक, शिक्षक, विद्यार्थी आणि पालक यांना भूमिका-आधारित डॅशबोर्ड मिळतो: व्यवस्थापनासाठी
                विश्लेषण, शिक्षकांसाठी उपस्थिती आणि गुणांकन साधने, कुटुंबांसाठी डाउनलोड आणि फी पेमेंट.
                Firebase एकत्रीकरणामुळे लाईव्ह सूचना आणि नोट्स/असाइनमेंटसाठी क्लाउड स्टोरेज उपलब्ध होते.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                'JWT सुरक्षित लॉगिन + पर्यायी Google साइन-इन',
                'Razorpay तयार फी पेमेंट (डेमो fallback)',
                'Firestore द्वारे लाईव्ह सूचना प्रसारण',
                'क्लाउड स्टोरेजमधून PDF नोट्स',
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
              डेमो पोर्टल उघडा
            </Link>
          </div>
        </div>
      </section>

      {/* Student life image / achievements */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
              पाठ्यपुस्तकांच्या पलीकडे — संघभावना, मंच आणि सेवा.
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              वार्षिक स्नेहसंमेलन, विज्ञान प्रदर्शने, आंतर-हाऊस क्रीडा, वादविवाद मंडळे आणि सामुदायिक उपक्रम
              विद्यार्थ्यांना नेतृत्व व सहानुभूती शिकवतात. विद्यार्थ्यांची कामगिरी सार्वजनिकरित्या गौरवली
              जाते आणि शिष्यवृत्ती तसेच पुढील प्रवेशासाठी नोंदवली जाते.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { t: 'जिल्हास्तरीय विज्ञान मेळा — सुवर्ण', y: '2025' },
                { t: 'राज्यस्तरीय अॅथलेटिक्स — रिले अंतिम फेरी', y: '2024' },
                { t: '100% साक्षरता टप्पा — प्राथमिक', y: '2024' },
                { t: 'NSS / सामाजिक परिणाम प्रकल्प', y: 'सुरू' },
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
              alt="विद्यार्थी जीवन"
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
            आमच्या समुदायाचे अभिप्राय
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                q: 'या पोर्टलमुळे फी भरणे आणि परिपत्रके पाहणे खूप सोपे झाले — कोणतेही अपडेट चुकत नाही.',
                n: 'इयत्ता 6 विद्यार्थ्याचे पालक',
              },
              {
                q: 'मी एकदाच नोट्स अपलोड करतो आणि विद्यार्थ्यांना लगेच सूचना मिळतात. उपस्थितीही आता खूप जलद होते.',
                n: 'वरिष्ठ शिक्षक, गणित',
              },
              {
                q: 'प्रवेश, फी आणि अनुपालन अहवालांसाठी अखेर एकच डॅशबोर्ड मिळाला.',
                n: 'शाळा प्रशासक',
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
          नेहमी विचारले जाणारे प्रश्न
        </h2>
        <dl className="mt-10 space-y-4">
          {[
            {
              q: 'प्रवेशासाठी अर्ज कसा करायचा?',
              a: 'या संकेतस्थळावरील प्रवेश पानातून चौकशी पाठवा. कार्यालय अर्ज तपासून admin प्रणालीत स्थिती अपडेट करते.',
            },
            {
              q: 'वाहतूक आणि जेवणाची सोय आहे का?',
              a: 'समुपदेशनदरम्यान मार्गाची माहिती दिली जाते. कँटीनमध्ये स्वच्छता निकषांचे पालन होते; जेवण योजना कॅम्पसनुसार बदलतात.',
            },
            {
              q: 'पालक पोर्टल कसे कार्य करते?',
              a: 'प्रवेशानंतर कुटुंबांना पोर्टल लॉगिन माहिती दिली जाते. सूचना, गृहपाठ, उपस्थिती सारांश आणि सक्षम असल्यास ऑनलाइन फी पेमेंट करता येते.',
            },
            {
              q: 'सर्व्हर इन्स्टॉल न करता डेमो उपलब्ध आहे का?',
              a: 'होय — लॉगिन पान उघडा आणि “Static demo” वापरून नमुना डेटासह डॅशबोर्ड पाहा.',
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
            आम्हाला भेट द्या. आमच्यासोबत शिका. {BRANDING.schoolNameMicro} सोबत प्रगती करा.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
            कॅम्पस भेट ठरवा, प्रवेश विभागाशी बोला किंवा आजच static demo portal वापरून पाहा — तुमच्या
            मुलाचा प्रवास एका संवादातून सुरू होऊ शकतो.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="rounded-2xl bg-brand-600 px-8 py-3.5 font-semibold text-white shadow-lg hover:bg-brand-700"
            >
              संपर्क व नकाशा
            </Link>
            <Link
              to="/suggestion"
              className="rounded-2xl border border-slate-200 px-8 py-3.5 font-semibold text-slate-800 hover:border-brand-300 dark:border-slate-700 dark:text-white"
            >
              सूचना पेटी
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
