'use client';

import { useState } from 'react';
import { ExternalLink, Edit3, Save, X, Layout, Code2, Globe, FileText, Copy, Check } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface UserProfile {
  id: number;
  username: string;
  full_name: string;
  student_id: string;
  class_name: string;
  github_link: string;
  figma_link: string;
  postman_link: string;
  pdf_link: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    id: 1,
    username: 'admin',
    full_name: 'Trần Văn Đức',
    student_id: 'B23DCCN191',
    class_name: 'D23CQCN01-B',
    figma_link: 'https://figma.com',
    github_link: 'https://github.com',
    postman_link: 'http://localhost:3001/api/docs',
    pdf_link: 'https://drive.google.com',
  });

  const [editing, setEditing] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [form, setForm] = useState({
    full_name:    'Trần Văn Đức',
    student_id:   'B23DCCN191',
    class_name:   'D23CQCN01-B',
    figma_link:   'https://figma.com',
    github_link:  'https://github.com',
    postman_link: 'http://localhost:3001/api/docs',
    pdf_link:     'https://drive.google.com',
  });

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setProfile({ ...profile, ...form });
      toast.success('Cập nhật thông tin thành công');
      setEditing(false);
      setSaving(false);
    }, 400);
  }

  function handleCopyUrl(key: string, url: string) {
    navigator.clipboard.writeText(url);
    setCopiedKey(key);
    toast.success(`Đã sao chép liên kết ${key}`);
    setTimeout(() => setCopiedKey(null), 1500);
  }

  const projectBoxes = [
    {
      key: 'Figma',
      Icon: Layout,
      label: 'Link Figma',
      desc: 'Bản vẽ thiết kế UI/UX',
      url: profile.figma_link,
    },
    {
      key: 'GitHub',
      Icon: Code2,
      label: 'Link GitHub',
      desc: 'Kho mã nguồn (Source Code)',
      url: profile.github_link,
    },
    {
      key: 'Postman',
      Icon: Globe,
      label: 'Link Postman / Swagger',
      desc: 'Tài liệu API & Endpoints',
      url: profile.postman_link,
    },
    {
      key: 'PDF',
      Icon: FileText,
      label: 'Link PDF (Báo cáo)',
      desc: 'Báo cáo tổng kết',
      url: profile.pdf_link,
    },
  ];

  return (
    <div
      className="animate-fade-in"
      style={{
        maxWidth: 820,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        height: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
      }}
    >
      <Toaster position="top-right" />

      {/* Header & Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div>
          <h1 className="page-title">Hồ sơ cá nhân</h1>
          <p className="page-sub">Thông tin sinh viên và tài liệu liên kết</p>
        </div>

        {!editing ? (
          <button
            type="button"
            className="btn btn-ghost"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, height: 32 }}
            onClick={() => setEditing(true)}
          >
            <Edit3 size={13} /> Chỉnh sửa hồ sơ
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-ghost"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, height: 32 }}
            onClick={() => setEditing(false)}
          >
            <X size={13} /> Hủy bỏ
          </button>
        )}
      </div>

      {editing ? (
        {/* Edit Form */}
        <form
          onSubmit={handleSaveProfile}
          className="card"
          style={{ padding: '16px 20px', background: '#ffffff', borderRadius: 8, border: '1px solid var(--border)', flexShrink: 0 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            <div>
              <label className="label">Họ và tên</label>
              <input
                type="text"
                className="input"
                required
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Mã sinh viên (MSV)</label>
              <input
                type="text"
                className="input"
                required
                value={form.student_id}
                onChange={(e) => setForm({ ...form, student_id: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Lớp</label>
              <input
                type="text"
                className="input"
                required
                value={form.class_name}
                onChange={(e) => setForm({ ...form, class_name: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Link Figma</label>
              <input
                type="text"
                className="input"
                value={form.figma_link}
                onChange={(e) => setForm({ ...form, figma_link: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Link GitHub</label>
              <input
                type="text"
                className="input"
                value={form.github_link}
                onChange={(e) => setForm({ ...form, github_link: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Link Postman / Swagger</label>
              <input
                type="text"
                className="input"
                value={form.postman_link}
                onChange={(e) => setForm({ ...form, postman_link: e.target.value })}
              />
            </div>
            <div style={{ gridColumn: 'span 3' }}>
              <label className="label">Link PDF (Báo cáo)</label>
              <input
                type="text"
                className="input"
                value={form.pdf_link}
                onChange={(e) => setForm({ ...form, pdf_link: e.target.value })}
              />
            </div>
          </div>
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button type="button" className="btn btn-ghost" onClick={() => setEditing(false)}>Hủy</button>
            <button type="submit" disabled={saving} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Save size={13} /> {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </form>
      ) : (
        {/* Profile Card */}
        <div
          className="card"
          style={{
            padding: '16px 20px',
            background: '#ffffff',
            borderRadius: 8,
            border: '1px solid var(--border)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
            <img
              src="/avatar.jpg"
              alt={profile.full_name}
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid var(--border)',
                flexShrink: 0,
              }}
            />
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-1)' }}>{profile.full_name}</h2>
              <p style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 2 }}>
                Học viện Công nghệ Bưu chính Viễn thông (PTIT)
              </p>
              <p style={{ fontSize: 12, color: 'var(--text-4)', marginTop: 2 }}>
                Hệ thống giám sát và điều khiển thiết bị IoT
              </p>
            </div>
          </div>

          {/* Profile Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 12 }}>
            <div style={{ padding: '8px 12px', borderRadius: 6, background: '#f8fafc', border: '1px solid var(--border)' }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Họ và tên</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', marginTop: 3 }}>{profile.full_name}</p>
            </div>
            <div style={{ padding: '8px 12px', borderRadius: 6, background: '#f8fafc', border: '1px solid var(--border)' }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Mã sinh viên</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', fontFamily: 'monospace', marginTop: 3 }}>{profile.student_id}</p>
            </div>
            <div style={{ padding: '8px 12px', borderRadius: 6, background: '#f8fafc', border: '1px solid var(--border)' }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Lớp</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', marginTop: 3 }}>{profile.class_name}</p>
            </div>
          </div>
        </div>
      )}

      {/* Resource Links */}
      <div
        className="card"
        style={{
          padding: '16px 20px',
          background: '#ffffff',
          borderRadius: 8,
          border: '1px solid var(--border)',
          flex: '1 1 auto',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 10, flexShrink: 0 }}>
          Danh sách liên kết (4 liên kết)
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, flex: 1 }}>
          {projectBoxes.map(({ key, Icon, label, desc, url }) => (
            <div
              key={key}
              id={`box-${key.toLowerCase()}`}
              style={{
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid var(--border)',
                background: '#fafbfc',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 6,
                  background: '#ffffff',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-2)',
                  flexShrink: 0,
                }}
              >
                <Icon size={18} strokeWidth={1.8} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>
                  {label}
                </p>
                <p style={{ fontSize: 11, color: 'var(--text-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 1 }}>
                  {desc}
                </p>
                <p style={{ fontSize: 11, color: '#2563eb', fontFamily: 'monospace', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>
                  {url}
                </p>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  title={`Mở ${label}`}
                  style={{ padding: '6px 8px', height: 30, display: 'inline-flex', alignItems: 'center' }}
                >
                  <ExternalLink size={13} />
                </a>

                <button
                  type="button"
                  className="btn btn-ghost"
                  title={`Sao chép đường dẫn ${label}`}
                  onClick={() => handleCopyUrl(label, url)}
                  style={{ padding: '6px 8px', height: 30, display: 'inline-flex', alignItems: 'center' }}
                >
                  {copiedKey === label ? <Check size={13} color="#16a34a" /> : <Copy size={13} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
