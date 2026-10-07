import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IoT Dashboard – Hệ thống giám sát & điều khiển',
  description:
    'Hệ thống giám sát môi trường và điều khiển thiết bị IoT thời gian thực. Theo dõi nhiệt độ, độ ẩm, ánh sáng và điều khiển LED qua Web.',
  keywords: 'IoT, dashboard, MQTT, ESP32, sensor, realtime',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
