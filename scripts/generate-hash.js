const bcrypt = require('bcryptjs');

const passwords = {
  'admin123': null,
  'training123': null,
  'finance123': null,
  'teacher123': null,
  'student123': null
};

async function generateHashes() {
  console.log('🔐 Generating password hashes...\n');
  
  for (const [password, _] of Object.entries(passwords)) {
    const hash = await bcrypt.hash(password, 10);
    passwords[password] = hash;
    console.log(`Password: ${password}`);
    console.log(`Hash: ${hash}\n`);
  }
  
  console.log('✅ All hashes generated!\n');
  console.log('📋 SQL INSERT statements:\n');
  console.log('━'.repeat(80));
  
  const users = [
    {
      username: 'admin',
      email: 'admin@indra.edu.mn',
      password: passwords['admin123'],
      role: 'SUPER_ADMIN',
      first_name: 'Супер',
      last_name: 'Админ',
      phone: '+976 99999999'
    },
    {
      username: 'training_admin',
      email: 'training@indra.edu.mn',
      password: passwords['training123'],
      role: 'TRAINING_ADMIN',
      first_name: 'Сургалтын',
      last_name: 'Админ',
      phone: '+976 88888888'
    },
    {
      username: 'finance_admin',
      email: 'finance@indra.edu.mn',
      password: passwords['finance123'],
      role: 'FINANCE_ADMIN',
      first_name: 'Санхүүгийн',
      last_name: 'Админ',
      phone: '+976 77777777'
    },
    {
      username: 'teacher1',
      email: 'teacher@indra.edu.mn',
      password: passwords['teacher123'],
      role: 'TEACHER',
      first_name: 'Багш',
      last_name: 'Ганбат',
      phone: '+976 99001122'
    },
    {
      username: 'student1',
      email: 'student@indra.edu.mn',
      password: passwords['student123'],
      role: 'STUDENT',
      first_name: 'Оюутан',
      last_name: 'Бат',
      phone: '+976 99112233'
    }
  ];
  
  users.forEach(user => {
    console.log(`
-- ${user.role}: ${user.username}
INSERT INTO users (
  id, email, username, password, role, status,
  first_name, last_name, phone, created_at, updated_at
) VALUES (
  gen_random_uuid(),
  '${user.email}',
  '${user.username}',
  '${user.password}',
  '${user.role}',
  'ACTIVE',
  '${user.first_name}',
  '${user.last_name}',
  '${user.phone}',
  NOW(),
  NOW()
) ON CONFLICT (username) DO NOTHING;
`);
  });
  
  console.log('━'.repeat(80));
  console.log('\n📝 Login credentials:');
  console.log('━'.repeat(80));
  console.log('Role'.padEnd(20) + ' | ' + 'Username'.padEnd(15) + ' | ' + 'Password');
  console.log('━'.repeat(80));
  users.forEach(user => {
    const plainPassword = Object.keys(passwords).find(key => passwords[key] === user.password);
    console.log(user.role.padEnd(20) + ' | ' + user.username.padEnd(15) + ' | ' + plainPassword);
  });
  console.log('━'.repeat(80));
}

generateHashes().catch(console.error);
