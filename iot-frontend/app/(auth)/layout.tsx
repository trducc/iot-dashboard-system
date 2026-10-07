export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f7f8fa',
      padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>{children}</div>
    </div>
  );
}
