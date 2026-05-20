const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase тохиргоо олдсонгүй!');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl);
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? '✓ Байна' : '✗ Байхгүй');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUsers() {
  console.log('🔍 Supabase дээрх хэрэглэгчдийг шалгаж байна...\n');
  
  try {
    const { data, error } = await supabase
      .from('users')
      .select('username, email, role, status, first_name, last_name')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('❌ Алдаа гарлаа:', error.message);
      console.error('Дэлгэрэнгүй:', error);
      return;
    }
    
    if (!data || data.length === 0) {
      console.log('⚠️  Хэрэглэгч олдсонгүй!');
      console.log('\n📋 Дараах алхмуудыг хийнэ үү:');
      console.log('1. Supabase SQL Editor руу орно уу:');
      console.log('   https://supabase.com/dashboard/project/xdywicnxzgtstrslhvcu/sql');
      console.log('2. scripts/insert-users.sql файлын агуулгыг хуулна уу');
      console.log('3. SQL Editor дээр буулгаад Run дарна уу\n');
      return;
    }
    
    console.log(`✅ Нийт ${data.length} хэрэглэгч олдлоо:\n`);
    console.log('━'.repeat(100));
    console.log('Username'.padEnd(20) + 'Email'.padEnd(30) + 'Role'.padEnd(20) + 'Status'.padEnd(10) + 'Нэр');
    console.log('━'.repeat(100));
    
    data.forEach(user => {
      console.log(
        user.username.padEnd(20) +
        user.email.padEnd(30) +
        user.role.padEnd(20) +
        user.status.padEnd(10) +
        `${user.first_name} ${user.last_name}`
      );
    });
    
    console.log('━'.repeat(100));
    
    // Admin хэрэглэгч байгаа эсэхийг шалгах
    const adminUsers = data.filter(u => 
      u.role === 'SUPER_ADMIN' || 
      u.role === 'TRAINING_ADMIN' || 
      u.role === 'FINANCE_ADMIN'
    );
    
    if (adminUsers.length > 0) {
      console.log('\n✅ Админ хэрэглэгчид:');
      adminUsers.forEach(admin => {
        console.log(`   - ${admin.username} (${admin.role})`);
      });
      console.log('\n🎉 Та одоо нэвтэрч болно!');
      console.log('   URL: http://localhost:3000/admin/login');
      console.log('   Username: admin');
      console.log('   Password: admin123');
    } else {
      console.log('\n⚠️  Админ хэрэглэгч олдсонгүй!');
      console.log('   scripts/insert-users.sql файлыг Supabase дээр ажиллуулна уу.');
    }
    
  } catch (err) {
    console.error('❌ Алдаа:', err.message);
    console.error('Дэлгэрэнгүй:', err);
  }
}

checkUsers();
