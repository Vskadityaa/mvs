/** Public-style pages shown inside the dashboard panel (sidebar + main area). */
export function panelWebsiteNavItems(basePath) {
  return [
    { to: `${basePath}/site`, label: 'शाळा मुख्यपृष्ठ', icon: '🏛️', end: true },
    { to: `${basePath}/site/about`, label: 'आमच्याबद्दल', icon: 'ℹ️' },
    { to: `${basePath}/site/academics`, label: 'शैक्षणिक', icon: '📖' },
    { to: `${basePath}/site/faculty`, label: 'शिक्षकवर्ग', icon: '👤' },
    { to: `${basePath}/site/student-life`, label: 'विद्यार्थी जीवन', icon: '🎭' },
    { to: `${basePath}/site/admission`, label: 'प्रवेश', icon: '📝' },
    { to: `${basePath}/site/suggestion`, label: 'सूचना', icon: '✉️' },
    { to: `${basePath}/site/contact`, label: 'संपर्क', icon: '📍' },
  ];
}
