import { getDemoProfile } from './demoProfiles.js';

const DEMO_TOKEN = 'static-demo';

export function isStaticDemoToken() {
  return localStorage.getItem('token') === DEMO_TOKEN;
}

export function getDemoToken() {
  return DEMO_TOKEN;
}

function readDemoSession() {
  try {
    const raw = localStorage.getItem('staticDemoUser');
    if (!raw) return getDemoProfile('student');
    return JSON.parse(raw);
  } catch {
    return getDemoProfile('student');
  }
}

function demoIds() {
  const s = readDemoSession();
  const role = s.user?.role || 'student';
  return { role, s };
}

const mockStudents = [
  {
    _id: 's1',
    rollNo: '101',
    admissionNo: 'ADM-001',
    user: { name: 'Aarav Patil', email: 'aarav@demo.edu' },
    class: { name: 'Std 5', section: 'A' },
  },
  {
    _id: 's2',
    rollNo: '102',
    admissionNo: 'ADM-002',
    user: { name: 'Isha Kulkarni', email: 'isha@demo.edu' },
    class: { name: 'Std 5', section: 'A' },
  },
];

const mockTeachers = [
  {
    _id: 't1',
    qualification: 'M.Sc, B.Ed',
    experienceYears: 12,
    bio: 'Senior faculty — Mathematics',
    user: { name: 'Sunita Deshmukh', email: 'sunita@demo.edu' },
    classes: [{ name: 'Std 5', section: 'A' }],
    subjects: [{ name: 'Mathematics' }],
  },
];

const mockClasses = [
  { _id: 'demo-class-1', name: 'Std 5', section: 'A', subjects: [{ name: 'Marathi' }, { name: 'English' }] },
];

const mockSubjects = [
  { _id: 'sub1', name: 'Marathi', code: 'MAR' },
  { _id: 'sub2', name: 'English', code: 'ENG' },
  { _id: 'sub3', name: 'Mathematics', code: 'MATH' },
];

const mockNotices = [
  { _id: 'n1', title: 'Annual day rehearsal', body: 'Std 5–7 report at 3 PM on Friday.', audience: 'all', priority: 'normal', createdAt: new Date().toISOString() },
  { _id: 'n2', title: 'Fee window', body: 'Term 2 fees accepted online via portal.', audience: 'students', priority: 'high', createdAt: new Date().toISOString() },
];

const mockEvents = [
  { _id: 'e1', title: 'Science Fair', description: 'Projects & exhibits', date: new Date(), venue: 'Main hall' },
];

const mockSuggestions = [
  { _id: 'g1', name: 'Parent', email: 'parent@demo.com', message: 'Great initiative on digital homework.', status: 'reviewed' },
];

const mockPayments = [
  {
    _id: 'p1',
    amount: 15000,
    status: 'paid',
    purpose: 'Tuition Term 1',
    paidAt: new Date().toISOString(),
    student: { user: { name: 'Aarav Patil', email: 'aarav@demo.edu' } },
  },
];

const mockAttendance = [
  { _id: 'a1', date: new Date().toISOString(), status: 'present', classRef: { name: 'Std 5', section: 'A' }, student: { user: { name: 'Demo Student' } } },
];

const mockHomework = [
  { _id: 'h1', title: 'Chapter 4 exercises', description: 'Solve problems 1–15', dueDate: new Date(), subject: { name: 'Mathematics' } },
];

const mockNotes = [
  { _id: 'mn1', title: 'Fractions revision', fileUrl: '#', subject: { name: 'Mathematics' } },
];

const mockMarks = [
  { _id: 'm1', examName: 'Unit Test 1', obtained: 82, maxMarks: 100, subject: { name: 'Mathematics' } },
];

const mockNotifications = [
  { _id: 'nt1', title: 'Welcome', body: 'You are viewing static demo data.', read: false, createdAt: new Date().toISOString() },
];

export async function mockApi(path, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  await new Promise((r) => setTimeout(r, 80));

  if (path === '/api/auth/me') {
    const { user, profile } = readDemoSession();
    return { user, profile };
  }

  if (path.startsWith('/api/public/')) {
    if (path.includes('notices-ticker')) return mockNotices;
    if (path.includes('events')) return mockEvents;
    if (path.includes('faculty')) return mockTeachers.map((t) => ({ ...t, displayOnWebsite: true }));
    if (method === 'POST') return { success: true, _id: 'demo' };
    return {};
  }

  if (path.startsWith('/api/admin/dashboard')) {
    return {
      counts: { students: 1240, teachers: 86, classes: 42, attendanceToday: 318 },
      revenue: 2450000,
      feeTrend: [
        { month: '2025-11', amount: 180000 },
        { month: '2025-12', amount: 220000 },
        { month: '2026-01', amount: 195000 },
        { month: '2026-02', amount: 240000 },
        { month: '2026-03', amount: 210000 },
      ],
    };
  }

  if (path.startsWith('/api/admin/students')) return mockStudents;
  if (path.startsWith('/api/admin/teachers')) return mockTeachers;
  if (path.startsWith('/api/admin/classes')) return mockClasses;
  if (path.startsWith('/api/admin/subjects')) return mockSubjects;
  if (path.startsWith('/api/admin/admissions')) {
    if (method === 'PATCH') return { status: 'approved' };
    return [
      { _id: 'ad1', studentName: 'Riya Shah', parentName: 'Mr. Shah', email: 'riya@demo.com', phone: '9000000000', applyingClass: 'Std 5', status: 'pending' },
    ];
  }
  if (path.startsWith('/api/admin/notices')) return mockNotices;
  if (path.startsWith('/api/admin/events')) return mockEvents;
  if (path.startsWith('/api/admin/suggestions')) return mockSuggestions;
  if (path.startsWith('/api/admin/feedback')) return [];
  if (path.startsWith('/api/admin/notes')) return [];
  if (path.startsWith('/api/admin/reports/students')) return mockStudents;
  if (path.startsWith('/api/admin/reports/fees')) return mockPayments;
  if (path.startsWith('/api/admin/reports/attendance')) return mockAttendance;

  if (path.startsWith('/api/payment/all') || path.startsWith('/api/payment/mine')) return mockPayments;
  if (path.startsWith('/api/payment/order')) {
    return { mode: 'dummy', paymentId: 'demo-pay', message: 'Static demo — no charge. Connect API for Razorpay.' };
  }
  if (path.startsWith('/api/payment/verify')) return { success: true };

  if (path.startsWith('/api/teacher/profile/classes')) {
    const { s } = demoIds();
    return s.profile || getDemoProfile('teacher').profile;
  }
  if (path.match(/\/api\/teacher\/classes\/[^/]+\/students/)) return mockStudents;
  if (path.match(/\/api\/teacher\/classes\/[^/]+\/attendance/)) return [];
  if (path.startsWith('/api/teacher/attendance') && method === 'POST') return { ok: true, count: 1 };
  if (path.startsWith('/api/teacher/homework') && method === 'POST') return { _id: 'hw1', title: 'Demo' };
  if (path.startsWith('/api/teacher/notes') && method === 'POST') return { _id: 'note1' };
  if (path.startsWith('/api/teacher/marks') && method === 'POST') return { _id: 'm1' };
  if (path.startsWith('/api/teacher/announcements')) return mockNotices;

  if (path === '/api/student/me' || path.startsWith('/api/student/me?')) {
    const { s } = demoIds();
    const p = s.profile || {};
    return {
      user: s.user,
      class: p.class || null,
      rollNo: p.rollNo ?? '101',
      admissionNo: p.admissionNo ?? 'DEMO-2025-001',
      documents: [],
    };
  }
  if (path.startsWith('/api/student/attendance')) return mockAttendance;
  if (path.startsWith('/api/student/homework')) return mockHomework;
  if (path.startsWith('/api/student/notes')) return mockNotes;
  if (path.startsWith('/api/student/marks')) return mockMarks;
  if (path.startsWith('/api/student/notices')) return mockNotices;
  if (path.startsWith('/api/student/notifications')) return mockNotifications;
  if (path.startsWith('/api/student/notifications/') && method === 'PATCH') return { ok: true };
  if (path.startsWith('/api/student/feedback') && method === 'POST') return { _id: 'f1' };
  if (path.startsWith('/api/student/chat') && method === 'POST') return { id: 'c1' };
  if (path.startsWith('/api/student/notices-firestore')) return { enabled: false, items: [] };

  if (method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE') {
    return { ok: true };
  }

  return [];
}

export async function mockApiForm() {
  await new Promise((r) => setTimeout(r, 80));
  return { ok: true, _id: 'demo' };
}
