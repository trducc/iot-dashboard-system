'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { Wifi, AlertCircle } from 'lucide-react';

// ── Mock: Danh sách tài khoản hợp lệ (không cần gọi backend) ──
const MOCK_USERS = [
  { username: 'admin', password: '123456' },
];

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Giả lập delay 0.5 giây rồi kiểm tra tài khoản
    setTimeout(() => {
      const found = MOCK_USERS.find(
        u => u.username === form.username && u.password === form.password
      );
      if (found) {
        // Đặt cookie giả để middleware cho qua
        Cookies.set('iot_token', 'mock-token-2026', { expires: 7 });
        router.push('/dashboard');
      } else {
        setError('Sai tên đăng nhập hoặc mật khẩu. Thử: admin / 123456');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div>
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 10, background: 'var(--blue)', marginBottom: 12 }}>
          <Wifi size={22} color="white" />
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)', marginBottom: 4 }}>IoT Dashboard</h1>
        <p style={{ fontSize: 13, color: 'var(--text-3)' }}>Hệ thống giám sát &amp; điều khiển thiết bị</p>
      </div>

      <div className="card" style={{ padding: '24px 28px' }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', marginBottom: 4 }}>Đăng nhập</h2>
        <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 20 }}>Nhập thông tin để truy cập hệ thống</p>

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 6, background: 'var(--red-bg)', border: '1px solid var(--red-br)', color: 'var(--red)', fontSize: 12, marginBottom: 16 }}>
            <AlertCircle size={14} />{error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label className="label">Tên đăng nhập</label>
            <input id="login-username" type="text" className="input"
              placeholder="Nhập username..."
              value={form.username} onChange={e => setForm({ ...form, username: e.target.value })}
              required autoComplete="username" />
          </div>
          <div>
            <label className="label">Mật khẩu</label>
            <input id="login-password" type="password" className="input"
              placeholder="••••••••"
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              required autoComplete="current-password" />
          </div>
          <button id="login-submit" type="submit" className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: 14, marginTop: 4 }}
            disabled={loading}>
            {loading ? <><div className="spinner" style={{ width: 14, height: 14 }} /> Đang đăng nhập...</> : 'Đăng nhập'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 18, fontSize: 12, color: 'var(--text-3)' }}>
          Chưa có tài khoản?{' '}
          <Link href="/register" style={{ color: 'var(--blue)', textDecoration: 'none', fontWeight: 600 }}>Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
}
