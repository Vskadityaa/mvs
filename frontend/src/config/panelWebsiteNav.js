/** Public-style pages shown inside the dashboard panel (sidebar + main area). */
export function panelWebsiteNavItems(basePath) {
  return [
    { to: `${basePath}/site`, label: 'School home', icon: '🏛️', end: true },
    { to: `${basePath}/site/about`, label: 'About', icon: 'ℹ️' },
    { to: `${basePath}/site/academics`, label: 'Academics', icon: '📖' },
    { to: `${basePath}/site/faculty`, label: 'Faculty', icon: '👤' },
    { to: `${basePath}/site/student-life`, label: 'Student Life', icon: '🎭' },
    { to: `${basePath}/site/admission`, label: 'Admission', icon: '📝' },
    { to: `${basePath}/site/suggestion`, label: 'Suggestion', icon: '✉️' },
    { to: `${basePath}/site/contact`, label: 'Contact', icon: '📍' },
  ];
}
