import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './components/PublicLayout.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { Home } from './pages/Home.jsx';
import { About } from './pages/About.jsx';
import { Academics } from './pages/Academics.jsx';
import { Faculty } from './pages/Faculty.jsx';
import { StudentLife } from './pages/StudentLife.jsx';
import { Suggestion } from './pages/Suggestion.jsx';
import { Contact } from './pages/Contact.jsx';
import { Admission } from './pages/Admission.jsx';
import { Login } from './pages/Login.jsx';
import { AdminLayout } from './dashboard/AdminLayout.jsx';
import { AdminOverview } from './dashboard/admin/AdminOverview.jsx';
import { AdminStudents } from './dashboard/admin/AdminStudents.jsx';
import { AdminTeachers } from './dashboard/admin/AdminTeachers.jsx';
import { AdminClasses } from './dashboard/admin/AdminClasses.jsx';
import { AdminAdmissions } from './dashboard/admin/AdminAdmissions.jsx';
import { AdminNotices } from './dashboard/admin/AdminNotices.jsx';
import { AdminEvents } from './dashboard/admin/AdminEvents.jsx';
import { AdminSuggestions } from './dashboard/admin/AdminSuggestions.jsx';
import { AdminFees } from './dashboard/admin/AdminFees.jsx';
import { AdminReports } from './dashboard/admin/AdminReports.jsx';
import { TeacherLayout } from './dashboard/TeacherLayout.jsx';
import { TeacherOverview } from './dashboard/teacher/TeacherOverview.jsx';
import { TeacherAttendance } from './dashboard/teacher/TeacherAttendance.jsx';
import { TeacherHomework } from './dashboard/teacher/TeacherHomework.jsx';
import { TeacherNotes } from './dashboard/teacher/TeacherNotes.jsx';
import { TeacherMarks } from './dashboard/teacher/TeacherMarks.jsx';
import { TeacherAnnouncements } from './dashboard/teacher/TeacherAnnouncements.jsx';
import { StudentLayout } from './dashboard/StudentLayout.jsx';
import { StudentOverview } from './dashboard/student/StudentOverview.jsx';
import { StudentAttendance } from './dashboard/student/StudentAttendance.jsx';
import { StudentHomework } from './dashboard/student/StudentHomework.jsx';
import { StudentNotes } from './dashboard/student/StudentNotes.jsx';
import { StudentResults } from './dashboard/student/StudentResults.jsx';
import { StudentNotices } from './dashboard/student/StudentNotices.jsx';
import { StudentFees } from './dashboard/student/StudentFees.jsx';
import { StudentFeedback } from './dashboard/student/StudentFeedback.jsx';
import { StudentNotifications } from './dashboard/student/StudentNotifications.jsx';
import { StudentChat } from './dashboard/student/StudentChat.jsx';
import { panelWebsiteRouteElements } from './dashboard/PanelWebsiteRoutes.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/student-life" element={<StudentLife />} />
        <Route path="/suggestion" element={<Suggestion />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminOverview />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="teachers" element={<AdminTeachers />} />
        <Route path="classes" element={<AdminClasses />} />
        <Route path="admissions" element={<AdminAdmissions />} />
        <Route path="notices" element={<AdminNotices />} />
        <Route path="events" element={<AdminEvents />} />
        <Route path="suggestions" element={<AdminSuggestions />} />
        <Route path="fees" element={<AdminFees />} />
        <Route path="reports" element={<AdminReports />} />
        {panelWebsiteRouteElements()}
      </Route>

      <Route
        path="/teacher"
        element={
          <ProtectedRoute roles={['teacher']}>
            <TeacherLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TeacherOverview />} />
        <Route path="attendance/:classId" element={<TeacherAttendance />} />
        <Route path="homework" element={<TeacherHomework />} />
        <Route path="notes" element={<TeacherNotes />} />
        <Route path="marks" element={<TeacherMarks />} />
        <Route path="announcements" element={<TeacherAnnouncements />} />
        {panelWebsiteRouteElements()}
      </Route>

      <Route
        path="/student"
        element={
          <ProtectedRoute roles={['student']}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentOverview />} />
        <Route path="attendance" element={<StudentAttendance />} />
        <Route path="homework" element={<StudentHomework />} />
        <Route path="notes" element={<StudentNotes />} />
        <Route path="results" element={<StudentResults />} />
        <Route path="notices" element={<StudentNotices />} />
        <Route path="fees" element={<StudentFees />} />
        <Route path="feedback" element={<StudentFeedback />} />
        <Route path="notifications" element={<StudentNotifications />} />
        <Route path="chat" element={<StudentChat />} />
        {panelWebsiteRouteElements()}
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
