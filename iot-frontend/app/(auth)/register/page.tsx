'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import api from '../../lib/axios';
import { Wifi, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '', password: '', full_name: '',
    student_id: '', class_name: '',
    github_link: '', figma_link: '', postman_link: '', pdf_link: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/register', form);
      Cookies.set('iot_token', res.data.token, { expires: 7 });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng ký thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 9, background: 'var(--blue)', marginBottom: 10 }}>
          <Wifi size={20} color="white" />
        </div>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-1)', marginBottom: 3 }}>IoT Dashboard</h1>
        <p style={{ fontSize: 12, color: 'var(--text-3)' }}>Tạo tài khoản mới</p>
      </div>

      <div className="card" style={{ padding: '22px 26px' }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)', marginBottom: 18 }}>Đăng ký</h2>

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 6, background: 'var(--red-bg)', border: '1px solid var(--red-br)', color: 'var(--red)', fontSize: 12, marginBottom: 14 }}>
            <AlertCircle size={13} />{error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Row 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label className="label">Username *</label>
              <input id="reg-username" type="text" className="input" placeholder="username"
                value={form.username} onChange={e => set('username', e.target.value)} required />
            </div>
            <div>
              <label className="label">Mật khẩu *</label>
              <input id="reg-password" type="password" className="input" placeholder="••••••"
                value={form.password} onChange={e => set('password', e.target.value)} required />
            </div>
          </div>

          <div>
            <label className="label">Họ và tên *</label>
            <input id="reg-fullname" type="text" className="input" placeholder="Nguyễn Văn A"
              value={form.full_name} onChange={e => set('full_name', e.target.value)} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label className="label">Mã sinh viên *</label>
              <input id="reg-student-id" type="text" className="input" placeholder="B23DCCN000"
                value={form.student_id} onChange={e => set('student_id', e.target.value)} required />
            </div>
            <div>
              <label className="label">Lớp *</label>
              <input id="reg-class" type="text" className="input" placeholder="D23CQCN01-B"
                value={form.class_name} onChange={e => set('class_name', e.target.value)} required />
            </div>
          </div>

          {/* Links section */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 2 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 10 }}>
              Liên kết dự án (tuỳ chọn)
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div>
                <label className="label">🎨 Figma</label>
                <input id="reg-figma" type="text" className="input" placeholder="https://figma.com/file/..."
                  value={form.figma_link} onChange={e => set('figma_link', e.target.value)} />
              </div>
              <div>
                <label className="label">💻 GitHub</label>
                <input id="reg-github" type="text" className="input" placeholder="https://github.com/username/repo"
                  value={form.github_link} onChange={e => set('github_link', e.target.value)} />
              </div>
              <div>
                <label className="label">📡 Postman / Swagger</label>
                <input id="reg-postman" type="text" className="input" placeholder="https://postman.com/..."
                  value={form.postman_link} onChange={e => set('postman_link', e.target.value)} />
              </div>
              <div>
                <label className="label">📄 Báo cáo PDF</label>
                <input id="reg-pdf" type="text" className="input" placeholder="https://drive.google.com/..."
                  value={form.pdf_link} onChange={e => set('pdf_link', e.target.value)} />
              </div>
            </div>
          </div>

          <button id="register-submit" type="submit" className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: 14, marginTop: 4 }}
            disabled={loading}>
            {loading ? <><div className="spinner" style={{ width: 14, height: 14 }} /> Đang tạo tài khoản...</> : 'Tạo tài khoản'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'var(--text-3)' }}>
          Đã có tài khoản?{' '}
          <Link href="/login" style={{ color: 'var(--blue)', textDecoration: 'none', fontWeight: 600 }}>Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}
