'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { Bell, ChevronDown, User, LogOut } from 'lucide-react';
import api from '../lib/axios';

const nav = [
  { href: '/dashboard',      label: 'Trang chủ' },
  { href: '/sensor-history', label: 'Lịch sử cảm biến' },
  { href: '/device-history', label: 'Lịch sử bật tắt' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState('Trần Văn Đức');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!Cookies.get('iot_token')) { router.push('/login'); return; }
    api.get('/users/profile').then(r => setUserName(r.data.full_name || r.data.username || 'Trần Văn Đức')).catch(() => {});
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ height: '100vh', maxHeight: '100vh', overflow: 'hidden', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header
        style={{
          height: 56,
          background: '#ffffff',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          flexShrink: 0,
          zIndex: 50,
        }}
      >
        {/* User Profile */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowProfileMenu(prev => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: '#ffffff',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '6px 14px',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-1)',
              transition: 'all 0.12s',
            }}
          >
            <img
              src="/avatar.jpg"
              alt="Admin"
              style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover' }}
            />
            <span>{userName || 'Trần Văn Đức'}</span>
            <ChevronDown size={14} color="var(--text-3)" />
          </button>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: 0,
                background: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: 8,
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                minWidth: 160,
                padding: 6,
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Link
                href="/profile"
                onClick={() => setShowProfileMenu(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 10px',
                  borderRadius: 6,
                  textDecoration: 'none',
                  fontSize: 13,
                  color: 'var(--text-2)',
                }}
              >
                <User size={15} /> Hồ sơ cá nhân
              </Link>
              <button
                onClick={() => {
                  Cookies.remove('iot_token');
                  router.push('/login');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 10px',
                  borderRadius: 6,
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--red)',
                  cursor: 'pointer',
                  fontSize: 13,
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <LogOut size={15} /> Đăng xuất
              </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div style={{ position: 'relative', cursor: 'pointer', padding: 6 }}>
          <Bell size={20} color="#0284c7" />
          <span
            style={{
              position: 'absolute',
              top: 4,
              right: 4,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#ef4444',
            }}
          />
        </div>
      </header>

      {/* Main Layout */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Sidebar */}
        <aside
          style={{
            width: 210,
            background: 'transparent',
            padding: '20px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            flexShrink: 0,
          }}
        >
          {nav.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 44,
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 600,
                  color: active ? '#2563eb' : '#334155',
                  background: '#ffffff',
                  border: active ? '1.5px solid #3b82f6' : '1px solid var(--border)',
                  boxShadow: active ? '0 2px 8px rgba(59,130,246,0.15)' : '0 1px 3px rgba(0,0,0,0.04)',
                  transition: 'all 0.15s ease',
                  textAlign: 'center',
                }}
              >
                {label}
              </Link>
            );
          })}
        </aside>

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            padding: '16px 24px 20px 10px',
            overflowY: 'hidden',
            overflowX: 'hidden',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
