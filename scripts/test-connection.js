const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Supabase холболтыг шалгаж байна...\n');
console.log('URL:', supabaseUrl);
console.log('Anon Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : '❌ Байхгүй');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('\n❌ Supabase тохиргоо дутуу байна!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('\n📡 Холболт шалгаж байна...');
    
    // Test connection by trying to query users table
    const { data, error, count } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error('\n❌ Алдаа:', error.message);
      console.error('Код:', error.code);
      console.error('Дэлгэрэнгүй:', error.details);
      
      if (error.code === '42P01') {
        console.log('\n💡 "users" table байхгүй байна!');
        console.log('Суpabase SQL Editor дээр create-admin-simple.sql ажиллуулна уу.');
      } else if (error.message.includes('JWT')) {
        console.log('\n💡 API key буруу эсвэл хугацаа дууссан байна!');
        console.log('Supabase Settings → API дээр шинэ key авна уу.');
      }
      return;
    }
    
    console.log('\n✅ Холболт амжилттай!');
    console.log(`📊 Users table: ${count !== null ? count + ' хэрэглэгч' : 'байна'}`);
    
    // Try to get actual users
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('username, email, role, status')
      .limit(10);
    
    if (usersError) {
      console.error('\n⚠️ Хэрэглэгч унших алдаа:', usersError.message);
    } else if (users && users.length > 0) {
      console.log('\n👥 Хэрэглэгчид:');
      users.forEach(u => {
        console.log(`   - ${u.username} (${u.role}) - ${u.status}`);
      });
    } else {
      console.log('\n⚠️ Хэрэглэгч олдсонгүй!');
      console.log('create-admin-simple.sql ажиллуулж хэрэглэгч үүсгэнэ үү.');
    }
    
  } catch (err) {
    console.error('\n❌ Алдаа:', err.message);
  }
}

testConnection();
