// Test login API
async function testLogin() {
  console.log('🔐 Login API шалгаж байна...\n');
  
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123'
      })
    });
    
    console.log('📡 Response status:', response.status);
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Нэвтрэлт амжилттай!\n');
      console.log('👤 Хэрэглэгч:', data.user.username);
      console.log('📧 Email:', data.user.email);
      console.log('🔑 Role:', data.user.role);
      console.log('🎫 Token:', data.token ? `${data.token.substring(0, 20)}...` : 'Байхгүй');
    } else {
      console.log('❌ Алдаа:', data.error || data.message);
    }
    
  } catch (error) {
    console.error('❌ Алдаа:', error.message);
    console.log('\n💡 Сервер ажиллаж байгаа эсэхийг шалгана уу:');
    console.log('   npm run dev');
  }
}

testLogin();
