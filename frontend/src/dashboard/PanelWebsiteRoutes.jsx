import { Route } from 'react-router-dom';
import { Home } from '../pages/Home.jsx';
import { About } from '../pages/About.jsx';
import { Academics } from '../pages/Academics.jsx';
import { Faculty } from '../pages/Faculty.jsx';
import { StudentLife } from '../pages/StudentLife.jsx';
import { Suggestion } from '../pages/Suggestion.jsx';
import { Contact } from '../pages/Contact.jsx';
import { Admission } from '../pages/Admission.jsx';

/** Relative paths under /admin, /teacher, /student */
export function panelWebsiteRouteElements() {
  return [
    <Route key="pw-site" path="site" element={<Home />} />,
    <Route key="pw-about" path="site/about" element={<About />} />,
    <Route key="pw-academics" path="site/academics" element={<Academics />} />,
    <Route key="pw-faculty" path="site/faculty" element={<Faculty />} />,
    <Route key="pw-life" path="site/student-life" element={<StudentLife />} />,
    <Route key="pw-admission" path="site/admission" element={<Admission />} />,
    <Route key="pw-suggestion" path="site/suggestion" element={<Suggestion />} />,
    <Route key="pw-contact" path="site/contact" element={<Contact />} />,
  ];
}
