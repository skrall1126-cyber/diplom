import { supabaseAdmin } from '../lib/supabase';
import bcrypt from 'bcryptjs';

async function seedUsers() {
  console.log('🌱 Starting user seeding...');

  const users = [
    {
      email: 'admin@indra.edu.mn',
      username: 'admin',
      password: 'admin123',
      role: 'SUPER_ADMIN',
      first_name: 'Супер',
      last_name: 'Админ',
      phone: '+976 99999999',
      status: 'ACTIVE'
    },
    {
      email: 'training@indra.edu.mn',
      username: 'training_admin',
      password: 'training123',
      role: 'TRAINING_ADMIN',
      first_name: 'Сургалтын',
      last_name: 'Админ',
      phone: '+976 88888888',
      status: 'ACTIVE'
    },
    {
      email: 'finance@indra.edu.mn',
      username: 'finance_admin',
      password: 'finance123',
      role: 'FINANCE_ADMIN',
      first_name: 'Санхүүгийн',
      last_name: 'Админ',
      phone: '+976 77777777',
      status: 'ACTIVE'
    },
    {
      email: 'teacher@indra.edu.mn',
      username: 'teacher1',
      password: 'teacher123',
      role: 'TEACHER',
      first_name: 'Багш',
      last_name: 'Ганбат',
      phone: '+976 99001122',
      status: 'ACTIVE'
    },
    {
      email: 'student@indra.edu.mn',
      username: 'student1',
      password: 'student123',
      role: 'STUDENT',
      first_name: 'Оюутан',
      last_name: 'Бат',
      phone: '+976 99112233',
      status: 'ACTIVE'
    }
  ];

  for (const userData of users) {
    try {
      // Check if user already exists
      const { data: existingUser } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('username', userData.username)
        .single();

      if (existingUser) {
        console.log(`⏭️  User ${userData.username} already exists, skipping...`);
        continue;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Create user
      const { data, error } = await supabaseAdmin
        .from('users')
        .insert({
          ...userData,
          password: hashedPassword,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error(`❌ Error creating user ${userData.username}:`, error);
      } else {
        console.log(`✅ Created user: ${userData.username} (${userData.role})`);
      }
    } catch (error) {
      console.error(`❌ Error processing user ${userData.username}:`, error);
    }
  }

  console.log('🎉 User seeding completed!');
  console.log('\n📋 Login credentials:');
  console.log('━'.repeat(50));
  users.forEach(user => {
    console.log(`${user.role.padEnd(20)} | ${user.username.padEnd(15)} | ${user.password}`);
  });
  console.log('━'.repeat(50));
}

seedUsers()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
