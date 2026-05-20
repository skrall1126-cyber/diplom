// Run test data insertion script
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials in .env.local');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runTestData() {
  try {
    console.log('🚀 Starting test data insertion...\n');

    // Read SQL file
    const sqlPath = path.join(__dirname, 'insert-test-data.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('📄 SQL file loaded');
    console.log('📊 Inserting test data...\n');

    // Split by semicolons and execute each statement
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      // Skip comments and empty statements
      if (statement.startsWith('--') || statement.length < 10) {
        continue;
      }

      try {
        const { data, error } = await supabase.rpc('exec_sql', { sql_query: statement });
        
        if (error) {
          console.error(`❌ Error in statement ${i + 1}:`, error.message);
          errorCount++;
        } else {
          successCount++;
          
          // Show progress
          if (statement.includes('INSERT INTO departments')) {
            console.log('✅ Departments inserted');
          } else if (statement.includes('INSERT INTO majors')) {
            console.log('✅ Majors inserted');
          } else if (statement.includes('INSERT INTO teachers')) {
            console.log('✅ Teacher inserted');
          } else if (statement.includes('INSERT INTO students')) {
            console.log('✅ Student inserted');
          } else if (statement.includes('INSERT INTO courses')) {
            console.log('✅ Course inserted');
          }
        }
      } catch (err) {
        console.error(`❌ Exception in statement ${i + 1}:`, err.message);
        errorCount++;
      }
    }

    console.log('\n📊 Summary:');
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);

    // Verify data
    console.log('\n🔍 Verifying inserted data...\n');

    const { data: departments } = await supabase.from('departments').select('*');
    console.log(`📁 Departments: ${departments?.length || 0}`);

    const { data: majors } = await supabase.from('majors').select('*');
    console.log(`🎓 Majors: ${majors?.length || 0}`);

    const { data: teachers } = await supabase.from('teachers').select('*, user:users(*)');
    console.log(`👨‍🏫 Teachers: ${teachers?.length || 0}`);

    const { data: students } = await supabase.from('students').select('*, user:users(*)');
    console.log(`👨‍🎓 Students: ${students?.length || 0}`);

    const { data: courses } = await supabase.from('courses').select('*');
    console.log(`📚 Courses: ${courses?.length || 0}`);

    console.log('\n✅ Test data insertion completed!');
    console.log('\n📝 Test accounts:');
    console.log('   Teachers:');
    console.log('   - batbayar / teacher123');
    console.log('   - enkhtuya / teacher123');
    console.log('   - batjargal_teacher / teacher123');
    console.log('   Students:');
    console.log('   - tortemuulen / student123');
    console.log('   - e_batjargal / student123');
    console.log('   - monkhbat / student123');
    console.log('   - sukhbat / student123');
    console.log('   - ganbayar / student123');

  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Alternative: Direct SQL execution using Supabase SQL editor
async function runDirectSQL() {
  try {
    console.log('🚀 Running test data insertion via direct SQL...\n');

    const sqlPath = path.join(__dirname, 'insert-test-data.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('📄 SQL file loaded');
    console.log('📊 Please run this SQL in Supabase SQL Editor:\n');
    console.log('1. Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/sql');
    console.log('2. Copy the content from: scripts/insert-test-data.sql');
    console.log('3. Paste and run in SQL Editor');
    console.log('\nOr use this command:');
    console.log('   psql YOUR_DATABASE_URL < scripts/insert-test-data.sql\n');

    // Verify current data
    console.log('🔍 Current database state:\n');

    const { data: departments } = await supabase.from('departments').select('*');
    console.log(`📁 Departments: ${departments?.length || 0}`);

    const { data: majors } = await supabase.from('majors').select('*');
    console.log(`🎓 Majors: ${majors?.length || 0}`);

    const { data: teachers } = await supabase.from('teachers').select('*, user:users(*)');
    console.log(`👨‍🏫 Teachers: ${teachers?.length || 0}`);

    const { data: students } = await supabase.from('students').select('*, user:users(*)');
    console.log(`👨‍🎓 Students: ${students?.length || 0}`);

    const { data: courses } = await supabase.from('courses').select('*');
    console.log(`📚 Courses: ${courses?.length || 0}`);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Run
runDirectSQL();
