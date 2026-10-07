'use client';

import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Thermometer, Droplets, Sun, Lightbulb } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const MOCK_DEVICES = [
  { id: 1, name: 'Đèn LED 1', onColor: '#eab308' },
  { id: 2, name: 'Đèn LED 2', onColor: '#16a34a' },
  { id: 3, name: 'Đèn LED 3', onColor: '#dc2626' },
];

const MOCK_CHART_DATA = [
  { t: '00:00', 'Nhiệt độ': 26.0, 'Độ ẩm': 80.0, 'Ánh sáng': 15.0 },
  { t: '02:00', 'Nhiệt độ': 25.5, 'Độ ẩm': 82.0, 'Ánh sáng': 10.0 },
  { t: '04:00', 'Nhiệt độ': 25.0, 'Độ ẩm': 84.0, 'Ánh sáng': 10.0 },
  { t: '06:00', 'Nhiệt độ': 26.5, 'Độ ẩm': 78.0, 'Ánh sáng': 65.0 },
  { t: '08:00', 'Nhiệt độ': 28.0, 'Độ ẩm': 74.0, 'Ánh sáng': 210.0 },
  { t: '10:00', 'Nhiệt độ': 30.4, 'Độ ẩm': 68.0, 'Ánh sáng': 430.0 },
  { t: '12:00', 'Nhiệt độ': 32.9, 'Độ ẩm': 60.5, 'Ánh sáng': 560.0 },
  { t: '14:00', 'Nhiệt độ': 33.2, 'Độ ẩm': 59.2, 'Ánh sáng': 550.0 },
  { t: '16:00', 'Nhiệt độ': 31.3, 'Độ ẩm': 65.0, 'Ánh sáng': 380.0 },
  { t: '18:00', 'Nhiệt độ': 29.3, 'Độ ẩm': 71.0, 'Ánh sáng': 140.0 },
  { t: '20:00', 'Nhiệt độ': 28.2, 'Độ ẩm': 75.0, 'Ánh sáng': 60.0 },
  { t: '22:00', 'Nhiệt độ': 27.1, 'Độ ẩm': 77.8, 'Ánh sáng': 35.0 },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
      <p style={{ color: 'var(--text-3)', fontWeight: 600, marginBottom: 4 }}>{label}</p>
      {payload.map((item: any) => {
        let unit = '°C';
        if (item.name === 'Độ ẩm') unit = '%';
        if (item.name === 'Ánh sáng') unit = 'Lux';
        return (
          <p key={item.name} style={{ color: item.color, fontWeight: 500, margin: '2px 0', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <span>{item.name}:</span>
            <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{typeof item.value === 'number' ? item.value.toFixed(1) : '—'} {unit}</span>
          </p>
        );
      })}
    </div>
  );
}

export default function DashboardPage() {
  const [temperature, setTemperature] = useState<number>(29.0);
  const [humidity, setHumidity]       = useState<number>(80.0);
  const [light, setLight]             = useState<number>(400.0);
  const [chartData]                   = useState<any[]>(MOCK_CHART_DATA);
  const [devices]                     = useState<any[]>(MOCK_DEVICES);
  const [deviceStatus, setDeviceStatus] = useState<Record<number, string>>({ 1: 'ON', 2: 'ON', 3: 'OFF' });
  const [deviceLoading, setDeviceLoading] = useState<Record<number, boolean>>({});

  function handleToggleDevice(deviceId: number) {
    if (deviceLoading[deviceId]) return;
    const next = deviceStatus[deviceId] === 'ON' ? 'OFF' : 'ON';
    setDeviceLoading(prev => ({ ...prev, [deviceId]: true }));
    setTimeout(() => {
      setDeviceStatus(prev => ({ ...prev, [deviceId]: next }));
      setDeviceLoading(prev => ({ ...prev, [deviceId]: false }));
      toast.success(next === 'ON' ? 'Đã bật thiết bị' : 'Đã tắt thiết bị');
    }, 400);
  }

  useEffect(() => {
    const id = setInterval(() => {
      setTemperature(prev => parseFloat((prev + (Math.random() * 0.4 - 0.2)).toFixed(1)));
      setHumidity(prev    => parseFloat((prev + (Math.random() * 0.4 - 0.2)).toFixed(1)));
      setLight(prev       => parseFloat((prev + (Math.random() * 8   - 4  )).toFixed(0)));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        height: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
      }}
    >
      <Toaster position="top-right" toastOptions={{ style: { fontSize: 13 } }} />

      <div
        className="card w-full min-w-0"
        style={{
          flex: '1 1 auto',
          minHeight: 0,
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          background: '#ffffff',
          borderRadius: 8,
          border: '1px solid var(--border)',
        }}
      >
        <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)', margin: 0, marginBottom: 4, flexShrink: 0 }}>
          Biểu đồ cảm biến
        </h2>

        <div className="w-full h-[350px]" style={{ flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 20, right: 20, left: 10, bottom: 10 }}>
              <defs>
                <linearGradient id="gTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="gHum" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="gLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />

              <XAxis
                dataKey="t"
                tick={{ fill: '#64748b', fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: '#cbd5e1' }}
              />

              <YAxis
                yAxisId="left"
                domain={[0, 100]}
                ticks={[0, 50, 100]}
                tick={{ fill: '#64748b', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                unit="°C/%"
                width={60}
              />

              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 600]}
                ticks={[0, 200, 400, 600]}
                tick={{ fill: '#64748b', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                unit=" Lux"
              />

              <Tooltip content={<CustomTooltip />} />

              <Legend
                verticalAlign="bottom"
                wrapperStyle={{ paddingTop: 8, fontSize: 12, color: 'var(--text-2)' }}
                iconType="circle"
              />

              <Area
                yAxisId="left"
                type="monotone"
                dataKey="Nhiệt độ"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#gTemp)"
                dot={false}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="Độ ẩm"
                stroke="#06b6d4"
                strokeWidth={2}
                fill="url(#gHum)"
                dot={false}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="Ánh sáng"
                stroke="#1e3a8a"
                strokeWidth={2}
                fill="url(#gLight)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 14,
          flexShrink: 0,
          minHeight: 180,
        }}
      >
        <div
          className="card"
          style={{
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#ffffff',
            borderRadius: 8,
            border: '1px solid var(--border)',
          }}
        >
          <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)', marginBottom: 10 }}>
            Điều khiển thiết bị
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {devices.map((d: any) => {
              const state = deviceStatus[d.id] || 'OFF';
              const isOn  = state === 'ON';
              const busy  = deviceLoading[d.id] || false;
              return (
                <div
                  key={d.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 4px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Lightbulb
                      size={22}
                      color={isOn ? d.onColor : '#94a3b8'}
                      strokeWidth={2}
                      fill={isOn ? d.onColor : 'none'}
                    />
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>
                      {d.name}
                    </span>
                  </div>

                  <button
                    id={`toggle-${d.id}`}
                    disabled={busy}
                    onClick={() => handleToggleDevice(d.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: busy ? 'not-allowed' : 'pointer',
                      padding: 0,
                    }}
                    title={isOn ? `Bấm để tắt ${d.name}` : `Bấm để bật ${d.name}`}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 26,
                        borderRadius: 13,
                        background: isOn ? '#0284c7' : '#cbd5e1',
                        position: 'relative',
                        transition: 'background 0.2s ease',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: 3,
                          left: isOn ? 25 : 3,
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          background: '#ffffff',
                          transition: 'left 0.2s ease',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                        }}
                      />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="card"
          style={{
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#ffffff',
            borderRadius: 8,
            border: '1px solid var(--border)',
          }}
        >
          <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)', marginBottom: 10 }}>
            Cảm biến thời gian thực
          </h2>

          <div
            style={{
              flex: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              alignItems: 'center',
              textAlign: 'center',
              padding: '6px 0',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Thermometer size={40} color="#0284c7" strokeWidth={2.2} />
              <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>
                {temperature.toFixed(0)}°C
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
                Nhiệt độ
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Droplets size={40} color="#0284c7" strokeWidth={2.2} />
              <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>
                {humidity.toFixed(0)}%
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
                Độ ẩm
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Sun size={40} color="#0284c7" strokeWidth={2.2} />
              <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>
                {light.toFixed(0)} Lux
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
                Ánh sáng
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
