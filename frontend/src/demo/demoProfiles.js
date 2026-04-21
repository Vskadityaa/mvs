const baseUser = (role, name, email) => ({
  id: `demo-${role}`,
  _id: `demo-${role}`,
  name,
  email,
  role,
  isActive: true,
});

export function getDemoProfile(role) {
  if (role === 'admin') {
    const user = baseUser('admin', 'Demo Principal', 'demo.admin@school.edu');
    return {
      user,
      profile: null,
    };
  }
  if (role === 'teacher') {
    const user = baseUser('teacher', 'Demo Teacher', 'demo.teacher@school.edu');
    return {
      user,
      profile: {
        qualification: 'M.Ed, Mathematics',
        experienceYears: 10,
        bio: 'Demo profile — connect API for live data.',
        classes: [
          { _id: 'demo-class-1', name: 'Std 5', section: 'A' },
        ],
        subjects: [
          { _id: 'demo-sub-1', name: 'Mathematics' },
          { _id: 'demo-sub-2', name: 'Science' },
        ],
      },
    };
  }
  const user = baseUser('student', 'Demo Student', 'demo.student@school.edu');
  return {
    user,
    profile: {
      rollNo: '101',
      admissionNo: 'DEMO-2025-001',
      class: { _id: 'demo-class-1', name: 'Std 5', section: 'A' },
    },
  };
}
