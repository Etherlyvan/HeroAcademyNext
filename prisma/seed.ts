// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data (optional - hati-hati di production!)
  console.log('🗑️  Clearing existing data...');
  await prisma.assignmentSubmission.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.classContent.deleteMany();
  await prisma.classEnrollment.deleteMany();
  await prisma.heroAIResult.deleteMany();
  await prisma.heroAIQuestion.deleteMany();
  await prisma.classRequest.deleteMany();
  await prisma.class.deleteMany();
  await prisma.user.deleteMany();

  // ========================================
  // 1. CREATE USERS
  // ========================================
  console.log('👥 Creating users...');

  // Admin
  const admin = await prisma.user.create({
    data: {
      email: 'admin@heroacademy.com',
      name: 'Admin Hero Academy',
      password: await bcrypt.hash('admin123456', 12),
      role: 'ADMIN',
      emailVerified: new Date(),
      bio: 'Administrator Hero Academy yang mengelola platform pembelajaran AI',
      phone: '081234567890',
    },
  });
  console.log('✅ Admin created:', admin.email);

  // Teachers
  const teachers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'rekyan@heroacademy.com',
        name: 'Dr. Rekyan Regasari',
        password: await bcrypt.hash('teacher123456', 12),
        role: 'TEACHER',
        emailVerified: new Date(),
        bio: 'Dosen AI & Machine Learning dengan pengalaman 15 tahun di bidang teknologi pendidikan',
        phone: '081234567891',
      },
    }),
    prisma.user.create({
      data: {
        email: 'suryanto@heroacademy.com',
        name: 'Drs. Suryanto',
        password: await bcrypt.hash('teacher123456', 12),
        role: 'TEACHER',
        emailVerified: new Date(),
        bio: 'Guru Matematika berpengalaman yang passionate dalam mengajar dengan metode inovatif',
        phone: '081234567892',
      },
    }),
    prisma.user.create({
      data: {
        email: 'maya@heroacademy.com',
        name: 'Maya Sari, S.Pd',
        password: await bcrypt.hash('teacher123456', 12),
        role: 'TEACHER',
        emailVerified: new Date(),
        bio: 'Guru Bahasa Indonesia yang ahli dalam literasi digital dan pembelajaran kreatif',
        phone: '081234567893',
      },
    }),
  ]);
  console.log('✅ Teachers created:', teachers.length);

  // Students
  const students = await Promise.all([
    prisma.user.create({
      data: {
        email: 'budi@student.com',
        name: 'Budi Santoso',
        password: await bcrypt.hash('student123456', 12),
        role: 'STUDENT',
        emailVerified: new Date(),
        bio: 'Siswa kelas 12 yang tertarik dengan AI dan programming',
        phone: '081234567894',
      },
    }),
    prisma.user.create({
      data: {
        email: 'ani@student.com',
        name: 'Ani Wijaya',
        password: await bcrypt.hash('student123456', 12),
        role: 'STUDENT',
        emailVerified: new Date(),
        bio: 'Siswa kelas 11 yang ingin masuk jurusan Psikologi',
        phone: '081234567895',
      },
    }),
    prisma.user.create({
      data: {
        email: 'citra@student.com',
        name: 'Citra Dewi',
        password: await bcrypt.hash('student123456', 12),
        role: 'STUDENT',
        emailVerified: new Date(),
        bio: 'Siswa kelas 12 yang bercita-cita menjadi Data Scientist',
        phone: '081234567896',
      },
    }),
    prisma.user.create({
      data: {
        email: 'doni@student.com',
        name: 'Doni Prakoso',
        password: await bcrypt.hash('student123456', 12),
        role: 'STUDENT',
        emailVerified: new Date(),
        bio: 'Siswa kelas 11 yang suka matematika dan robotik',
        phone: '081234567897',
      },
    }),
    prisma.user.create({
      data: {
        email: 'eka@student.com',
        name: 'Eka Putri',
        password: await bcrypt.hash('student123456', 12),
        role: 'STUDENT',
        emailVerified: new Date(),
        bio: 'Siswa kelas 12 yang tertarik dengan desain UI/UX',
        phone: '081234567898',
      },
    }),
  ]);
  console.log('✅ Students created:', students.length);

  // ========================================
  // 2. CREATE CLASSES
  // ========================================
  console.log('📚 Creating classes...');

  const classes = await Promise.all([
    // Class 1 - APPROVED & ACTIVE
    prisma.class.create({
      data: {
        title: 'Pengenalan AI & Machine Learning',
        description: 'Kelas pengenalan dasar tentang Artificial Intelligence dan Machine Learning untuk pemula. Pelajari konsep fundamental, algoritma dasar, dan aplikasi praktis AI dalam kehidupan sehari-hari.',
        status: 'ACTIVE',
        approvalStatus: 'APPROVED',
        teacherId: teachers[0].id,
        thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      },
    }),
    // Class 2 - APPROVED & ACTIVE
    prisma.class.create({
      data: {
        title: 'Matematika UTBK 2025',
        description: 'Persiapan intensif Matematika untuk UTBK 2025. Materi lengkap dari dasar hingga soal-soal HOTS dengan strategi pengerjaan yang efektif.',
        status: 'ACTIVE',
        approvalStatus: 'APPROVED',
        teacherId: teachers[1].id,
        thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
      },
    }),
    // Class 3 - APPROVED & ACTIVE
    prisma.class.create({
      data: {
        title: 'Literasi Digital & Media Sosial',
        description: 'Belajar cara bijak menggunakan media sosial, memahami informasi digital, dan mengembangkan kemampuan berpikir kritis di era digital.',
        status: 'ACTIVE',
        approvalStatus: 'APPROVED',
        teacherId: teachers[2].id,
        thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
      },
    }),
    // Class 4 - PENDING
    prisma.class.create({
      data: {
        title: 'Python Programming untuk Pemula',
        description: 'Kelas coding Python dari nol hingga bisa membuat project sederhana. Cocok untuk pemula yang ingin belajar programming.',
        status: 'DRAFT',
        approvalStatus: 'PENDING',
        teacherId: teachers[0].id,
      },
    }),
    // Class 5 - APPROVED & DRAFT
    prisma.class.create({
      data: {
        title: 'Bahasa Indonesia UTBK',
        description: 'Strategi jitu menghadapi soal Bahasa Indonesia UTBK dengan pembahasan lengkap dan latihan intensif.',
        status: 'DRAFT',
        approvalStatus: 'APPROVED',
        teacherId: teachers[2].id,
      },
    }),
  ]);
  console.log('✅ Classes created:', classes.length);

  // ========================================
  // 3. CREATE CLASS ENROLLMENTS
  // ========================================
  console.log('📝 Creating enrollments...');

  const enrollments = [];
  
  // Enroll students to Class 1 (AI & ML)
  for (let i = 0; i < students.length; i++) {
    enrollments.push(
      await prisma.classEnrollment.create({
        data: {
          classId: classes[0].id,
          studentId: students[i].id,
        },
      })
    );
  }

  // Enroll some students to Class 2 (Math)
  for (let i = 0; i < 3; i++) {
    enrollments.push(
      await prisma.classEnrollment.create({
        data: {
          classId: classes[1].id,
          studentId: students[i].id,
        },
      })
    );
  }

  // Enroll some students to Class 3 (Digital Literacy)
  for (let i = 2; i < students.length; i++) {
    enrollments.push(
      await prisma.classEnrollment.create({
        data: {
          classId: classes[2].id,
          studentId: students[i].id,
        },
      })
    );
  }

  console.log('✅ Enrollments created:', enrollments.length);

  // ========================================
  // 4. CREATE CLASS CONTENTS
  // ========================================
  console.log('📖 Creating class contents...');

  // Contents for Class 1 (AI & ML)
  await Promise.all([
    prisma.classContent.create({
      data: {
        classId: classes[0].id,
        title: 'Pengenalan AI dan Sejarahnya',
        description: 'Video pengenalan tentang AI, sejarah perkembangan, dan aplikasinya',
        contentType: 'VIDEO',
        fileUrl: 'https://example.com/video/ai-intro.mp4',
        order: 1,
      },
    }),
    prisma.classContent.create({
      data: {
        classId: classes[0].id,
        title: 'Konsep Machine Learning',
        description: 'Slide presentasi tentang konsep dasar Machine Learning',
        contentType: 'PPT',
        fileUrl: 'https://example.com/slides/ml-basics.pptx',
        order: 2,
      },
    }),
    prisma.classContent.create({
      data: {
        classId: classes[0].id,
        title: 'Algoritma Machine Learning',
        description: 'Dokumen PDF tentang berbagai algoritma ML',
        contentType: 'PDF',
        fileUrl: 'https://example.com/pdf/ml-algorithms.pdf',
        order: 3,
      },
    }),
  ]);

  // Contents for Class 2 (Math)
  await Promise.all([
    prisma.classContent.create({
      data: {
        classId: classes[1].id,
        title: 'Strategi Mengerjakan Soal UTBK',
        description: 'Video tips dan trik mengerjakan soal matematika UTBK',
        contentType: 'VIDEO',
        fileUrl: 'https://example.com/video/math-strategy.mp4',
        order: 1,
      },
    }),
    prisma.classContent.create({
      data: {
        classId: classes[1].id,
        title: 'Kumpulan Rumus Matematika',
        description: 'PDF berisi rumus-rumus penting untuk UTBK',
        contentType: 'PDF',
        fileUrl: 'https://example.com/pdf/math-formulas.pdf',
        order: 2,
      },
    }),
  ]);

  console.log('✅ Class contents created');

  // ========================================
  // 5. CREATE ASSIGNMENTS
  // ========================================
  console.log('📝 Creating assignments...');

  const assignments = await Promise.all([
    // Assignment 1 - Class 1
    prisma.assignment.create({
      data: {
        classId: classes[0].id,
        teacherId: teachers[0].id,
        title: 'Tugas 1: Konsep Dasar AI',
        description: 'Jelaskan konsep dasar Artificial Intelligence dan berikan 3 contoh penerapannya dalam kehidupan sehari-hari. Minimal 500 kata.',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        maxScore: 100,
      },
    }),
    // Assignment 2 - Class 1
    prisma.assignment.create({
      data: {
        classId: classes[0].id,
        teacherId: teachers[0].id,
        title: 'Tugas 2: Algoritma Machine Learning',
        description: 'Pilih salah satu algoritma Machine Learning dan jelaskan cara kerjanya dengan contoh kasus nyata.',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        maxScore: 100,
      },
    }),
    // Assignment 3 - Class 2
    prisma.assignment.create({
      data: {
        classId: classes[1].id,
        teacherId: teachers[1].id,
        title: 'Latihan Soal Matematika Dasar',
        description: 'Kerjakan 20 soal matematika dasar yang sudah disediakan. Upload jawaban dalam format PDF.',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        maxScore: 100,
      },
    }),
    // Assignment 4 - Class 2 (Overdue)
    prisma.assignment.create({
      data: {
        classId: classes[1].id,
        teacherId: teachers[1].id,
        title: 'Quiz Matematika Minggu 1',
        description: 'Quiz online tentang materi minggu pertama. Durasi 60 menit.',
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago (overdue)
        maxScore: 100,
      },
    }),
    // Assignment 5 - Class 3
    prisma.assignment.create({
      data: {
        classId: classes[2].id,
        teacherId: teachers[2].id,
        title: 'Analisis Konten Media Sosial',
        description: 'Analisa 5 postingan media sosial dan identifikasi mana yang merupakan informasi valid dan hoax. Berikan alasanmu.',
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        maxScore: 100,
      },
    }),
  ]);
  console.log('✅ Assignments created:', assignments.length);

  // ========================================
  // 6. CREATE ASSIGNMENT SUBMISSIONS
  // ========================================
  console.log('📤 Creating submissions...');

  const submissions = await Promise.all([
    // Budi submits Assignment 1 - GRADED
    prisma.assignmentSubmission.create({
      data: {
        assignmentId: assignments[0].id,
        studentId: students[0].id,
        content: 'Artificial Intelligence adalah teknologi yang memungkinkan mesin untuk belajar dan melakukan tugas yang biasanya memerlukan kecerdasan manusia...',
        status: 'GRADED',
        score: 85,
        feedback: 'Penjelasan yang baik! Namun bisa lebih detail di bagian contoh penerapan.',
        submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        gradedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    }),
    // Ani submits Assignment 1 - GRADED
    prisma.assignmentSubmission.create({
      data: {
        assignmentId: assignments[0].id,
        studentId: students[1].id,
        content: 'AI adalah cabang ilmu komputer yang fokus pada pembuatan sistem yang dapat berpikir dan belajar seperti manusia...',
        status: 'GRADED',
        score: 92,
        feedback: 'Excellent work! Penjelasan sangat detail dan contoh yang diberikan relevan.',
        submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        gradedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    }),
    // Citra submits Assignment 1 - SUBMITTED (not graded yet)
    prisma.assignmentSubmission.create({
      data: {
        assignmentId: assignments[0].id,
        studentId: students[2].id,
        content: 'Konsep AI meliputi pembelajaran mesin, pemrosesan bahasa alami, dan computer vision...',
        status: 'SUBMITTED',
        submittedAt: new Date(),
      },
    }),
    // Budi submits Assignment 3 - GRADED
    prisma.assignmentSubmission.create({
      data: {
        assignmentId: assignments[2].id,
        studentId: students[0].id,
        fileUrl: 'https://example.com/submissions/budi-math-1.pdf',
        status: 'GRADED',
        score: 78,
        feedback: 'Bagus, tapi ada beberapa kesalahan di soal nomor 5, 12, dan 18.',
        submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        gradedAt: new Date(),
      },
    }),
    // Ani submits Assignment 3 - SUBMITTED
    prisma.assignmentSubmission.create({
      data: {
        assignmentId: assignments[2].id,
        studentId: students[1].id,
        fileUrl: 'https://example.com/submissions/ani-math-1.pdf',
        status: 'SUBMITTED',
        submittedAt: new Date(),
      },
    }),
  ]);
  console.log('✅ Submissions created:', submissions.length);

  // ========================================
  // 7. CREATE HERO AI QUESTIONS
  // ========================================
  console.log('🤖 Creating Hero AI questions...');

  const heroAIQuestions = [
    // Mission Questions
    {
      category: 'mission',
      question: 'Apa hal yang membuat kamu paling resah di lingkungan sekitar?',
      order: 1,
      isActive: true,
    },
    {
      category: 'mission',
      question: 'Jika kamu punya kemampuan super, masalah apa yang ingin kamu selesaikan?',
      order: 2,
      isActive: true,
    },
    {
      category: 'mission',
      question: 'Dalam 5 tahun ke depan, kamu ingin jadi apa?',
      order: 3,
      isActive: true,
    },
    {
      category: 'mission',
      question: 'Kenapa kamu ingin menjadi itu?',
      order: 4,
      isActive: true,
    },
    // VAK Questions
    {
      category: 'vak',
      question: 'Saya lebih mudah mengingat pelajaran dengan...',
      options: JSON.stringify([
        'Melihat gambar dan diagram',
        'Mendengar penjelasan guru',
        'Mencoba langsung atau praktik',
      ]),
      order: 1,
      isActive: true,
    },
    {
      category: 'vak',
      question: 'Saat membaca buku, saya...',
      options: JSON.stringify([
        'Membayangkan adegan dalam pikiran',
        'Membaca keras-keras untuk mendengar',
        'Menulis ulang poin-poin penting',
      ]),
      order: 2,
      isActive: true,
    },
    {
      category: 'vak',
      question: 'Saya paling suka belajar dari...',
      options: JSON.stringify([
        'Video dan infografis',
        'Podcast dan diskusi',
        'Eksperimen dan simulasi',
      ]),
      order: 3,
      isActive: true,
    },
    // Intelligence Questions
    {
      category: 'intelligence',
      question: 'Saya suka menulis, bercerita, atau membaca dengan ekspresif',
      order: 1,
      isActive: true,
    },
    {
      category: 'intelligence',
      question: 'Saya suka mencari pola, memecahkan teka-teki, atau eksperimen logika',
      order: 2,
      isActive: true,
    },
    {
      category: 'intelligence',
      question: 'Saya bisa membayangkan bentuk, arah, atau desain dengan mudah',
      order: 3,
      isActive: true,
    },
    {
      category: 'intelligence',
      question: 'Saya belajar lebih cepat dengan melakukan dan bergerak',
      order: 4,
      isActive: true,
    },
    {
      category: 'intelligence',
      question: 'Saya mudah mengingat nada, lagu, atau irama',
      order: 5,
      isActive: true,
    },
    {
      category: 'intelligence',
      question: 'Saya bisa memahami perasaan orang lain dan suka bekerja dalam kelompok',
      order: 6,
      isActive: true,
    },
    {
      category: 'intelligence',
      question: 'Saya sering merenung dan mengenal perasaan serta tujuan hidup saya',
      order: 7,
      isActive: true,
    },
    {
      category: 'intelligence',
      question: 'Saya tertarik dengan alam, hewan, atau lingkungan sekitar',
      order: 8,
      isActive: true,
    },
    // DISC Questions
    {
      category: 'disc',
      question: 'Saya suka mengambil keputusan dan memimpin tim',
      order: 1,
      isActive: true,
    },
    {
      category: 'disc',
      question: 'Saya suka berbicara dan menyemangati orang lain',
      order: 2,
      isActive: true,
    },
    {
      category: 'disc',
      question: 'Saya sabar, mendengarkan orang lain, dan tidak suka konflik',
      order: 3,
      isActive: true,
    },
    {
      category: 'disc',
      question: 'Saya suka aturan yang jelas dan memastikan hasil sempurna',
      order: 4,
      isActive: true,
    },
    // RIASEC Questions
    {
      category: 'riasec',
      question: 'Saya suka memperbaiki atau membuat benda secara langsung',
      order: 1,
      isActive: true,
    },
    {
      category: 'riasec',
      question: 'Saya suka memecahkan masalah dan melakukan riset',
      order: 2,
      isActive: true,
    },
    {
      category: 'riasec',
      question: 'Saya suka menggambar, menulis, atau mengekspresikan ide kreatif',
      order: 3,
      isActive: true,
    },
    {
      category: 'riasec',
      question: 'Saya suka membantu, mengajar, atau mendengarkan orang lain',
      order: 4,
      isActive: true,
    },
    {
      category: 'riasec',
      question: 'Saya suka mengajak orang, memimpin, atau memulai sesuatu',
      order: 5,
      isActive: true,
    },
    {
      category: 'riasec',
      question: 'Saya suka mengatur data, membuat laporan, dan mengikuti sistem yang rapi',
      order: 6,
      isActive: true,
    },
  ];

  for (const question of heroAIQuestions) {
    await prisma.heroAIQuestion.create({ data: question });
  }
  console.log('✅ Hero AI questions created:', heroAIQuestions.length);

  // ========================================
  // 8. CREATE HERO AI RESULTS (Sample)
  // ========================================
  console.log('🎯 Creating Hero AI results...');

  await prisma.heroAIResult.create({
    data: {
      userId: students[0].id,
      missionStatement: 'Saya ingin menjadi Data Scientist agar bisa membantu perusahaan membuat keputusan yang lebih baik berdasarkan data',
      learningStyle: JSON.stringify({
        visual: 70,
        auditory: 20,
        kinesthetic: 10,
      }),
      intelligenceType: JSON.stringify({
        linguistic: 75,
        logical: 85,
        spatial: 60,
        kinesthetic: 40,
        musical: 30,
        interpersonal: 65,
        intrapersonal: 80,
        naturalist: 45,
      }),
      personality: JSON.stringify({
        D: 60,
        I: 40,
        S: 30,
        C: 70,
      }),
      careerPath: JSON.stringify({
        realistic: { score: 40, recommendations: ['Teknisi', 'Engineer'] },
        investigative: { score: 85, recommendations: ['Data Scientist', 'Researcher', 'Analyst'] },
        artistic: { score: 50, recommendations: ['Designer', 'Writer'] },
        social: { score: 60, recommendations: ['Teacher', 'Counselor'] },
        enterprising: { score: 55, recommendations: ['Manager', 'Entrepreneur'] },
        conventional: { score: 75, recommendations: ['Accountant', 'Administrator'] },
      }),
      heroJourney: JSON.stringify({
        awareness: 'Menyadari passion di bidang data dan teknologi',
        challenge: 'Kurang pengalaman praktis dalam project nyata',
        allies: 'Guru, mentor online, komunitas data science',
        action: 'Mulai belajar Python dan mengikuti bootcamp data science',
      }),
      actionPlan: JSON.stringify({
        shortTerm: 'Menyelesaikan kursus Python dalam 3 bulan',
        mediumTerm: 'Membuat 3 project portfolio data science',
        longTerm: 'Masuk jurusan Ilmu Komputer dan magang di perusahaan tech',
      }),
    },
  });

  console.log('✅ Hero AI result created');

  // ========================================
  // 9. CREATE CLASS REQUESTS
  // ========================================
  console.log('📋 Creating class requests...');

  await Promise.all([
    prisma.classRequest.create({
      data: {
        teacherId: teachers[0].id,
        title: 'Deep Learning untuk Computer Vision',
        description: 'Kelas lanjutan tentang Deep Learning dengan fokus pada Computer Vision dan Image Recognition',
        reason: 'Banyak siswa yang tertarik untuk belajar lebih dalam tentang Computer Vision setelah mengikuti kelas AI dasar',
        status: 'PENDING',
      },
    }),
    prisma.classRequest.create({
      data: {
        teacherId: teachers[1].id,
        title: 'Fisika UTBK 2025',
        description: 'Persiapan Fisika untuk UTBK dengan pembahasan konsep dan latihan soal',
        reason: 'Melengkapi program persiapan UTBK yang sudah ada',
        status: 'APPROVED',
      },
    }),
  ]);

  console.log('✅ Class requests created');

  // ========================================
  // SUMMARY
  // ========================================
  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`- Users: ${1 + teachers.length + students.length} (1 admin, ${teachers.length} teachers, ${students.length} students)`);
  console.log(`- Classes: ${classes.length} (3 active, 1 pending, 1 draft)`);
  console.log(`- Enrollments: ${enrollments.length}`);
  console.log(`- Assignments: ${assignments.length}`);
  console.log(`- Submissions: ${submissions.length}`);
  console.log(`- Hero AI Questions: ${heroAIQuestions.length}`);
  
  console.log('\n🔐 Login credentials:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Admin:');
  console.log('  Email: admin@heroacademy.com');
  console.log('  Password: admin123456');
  console.log('\nTeachers:');
  console.log('  1. rekyan@heroacademy.com / teacher123456');
  console.log('  2. suryanto@heroacademy.com / teacher123456');
  console.log('  3. maya@heroacademy.com / teacher123456');
  console.log('\nStudents:');
  console.log('  1. budi@student.com / student123456');
  console.log('  2. ani@student.com / student123456');
  console.log('  3. citra@student.com / student123456');
  console.log('  4. doni@student.com / student123456');
  console.log('  5. eka@student.com / student123456');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });