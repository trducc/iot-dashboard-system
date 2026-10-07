import * as mysql from 'mysql2/promise';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'iot',
  });

  console.log('[Seed] ✅ Connected to MySQL database: iot');

  // ─── Seed Sensors ────────────────────────────────────────────────────────────
  const sensors = [
    'Nhiệt độ (Temperature)',
    'Độ ẩm (Humidity)',
    'Ánh sáng (Light)',
  ];

  for (const name of sensors) {
    const [rows]: any = await connection.execute(
      'SELECT id FROM sensors WHERE name = ?',
      [name],
    );
    if (rows.length === 0) {
      await connection.execute('INSERT INTO sensors (name) VALUES (?)', [name]);
      console.log(`[Seed] ➕ Inserted sensor: ${name}`);
    } else {
      console.log(`[Seed] ⏭  Sensor already exists: ${name}`);
    }
  }

  // ─── Seed Devices ────────────────────────────────────────────────────────────
  const devices = [
    'Đèn LED 1 (Vàng)',
    'Đèn LED 2 (Xanh)',
    'Đèn LED 3 (Đỏ)',
  ];

  for (const name of devices) {
    const [rows]: any = await connection.execute(
      'SELECT id FROM devices WHERE name = ?',
      [name],
    );
    if (rows.length === 0) {
      await connection.execute('INSERT INTO devices (name) VALUES (?)', [name]);
      console.log(`[Seed] ➕ Inserted device: ${name}`);
    } else {
      console.log(`[Seed] ⏭  Device already exists: ${name}`);
    }
  }

  // ─── Seed Admin User ─────────────────────────────────────────────────────────
  const adminUsername = 'admin';
  const [adminRows]: any = await connection.execute(
    'SELECT id FROM users WHERE username = ?',
    [adminUsername],
  );

  if (adminRows.length === 0) {
    const hashedPassword = await bcrypt.hash('123456', 10);
    await connection.execute(
      `INSERT INTO users 
        (username, password, full_name, student_id, class_name, github_link, figma_link, postman_link)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'admin',
        hashedPassword,
        'Trần Văn Đức',
        'B23DCCN191',
        'D23CNPM04',
        'https://github.com',
        'https://figma.com',
        'http://localhost:3001/api/docs',
      ],
    );
    console.log('[Seed] ➕ Created default admin user: admin / 123456');
  } else {
    await connection.execute(
      'UPDATE users SET full_name = ?, student_id = ?, class_name = ?, postman_link = ? WHERE username = ?',
      ['Trần Văn Đức', 'B23DCCN191', 'D23CNPM04', 'http://localhost:3001/api/docs', 'admin']
    );
    console.log('[Seed] 🔄 Admin user updated with new profile data');
  }

  console.log('\n[Seed] 🎉 Seeding completed successfully!');
  console.log('[Seed] 📌 Default login: username=admin | password=123456');
  await connection.end();
}

seed().catch((err) => {
  console.error('[Seed] ❌ Error:', err.message);
  process.exit(1);
});
