'use client';
import { useState, useRef, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Copy, Check, RotateCcw, ArrowUpDown, X, Filter } from 'lucide-react';
interface DeviceActionRow {
  id: number;
  device_id: number;
  device_name: string;
  username: string;
  action: 'ON' | 'OFF';
  status: 'SUCCESS' | 'FAILED';
  created_at: string;
}
const MOCK_DEVICE_LIST = [
  { id: 1, name: 'Đèn LED 1' },
  { id: 2, name: 'Đèn LED 2' },
  { id: 3, name: 'Đèn LED 3' },
];
const ALL_MOCK_ACTIONS: DeviceActionRow[] = [
  { id: 1,  device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-06T07:00:00' },
  { id: 2,  device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-06T07:05:00' },
  { id: 3,  device_id: 3, device_name: 'Đèn LED 3', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-06T07:10:00' },
  { id: 4,  device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-06T09:00:00' },
  { id: 5,  device_id: 3, device_name: 'Đèn LED 3', username: 'Trần Văn Đức', action: 'OFF', status: 'FAILED',  created_at: '2026-10-06T09:05:00' },
  { id: 6,  device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-06T11:30:00' },
  { id: 7,  device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-06T13:00:00' },
  { id: 8,  device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-06T14:00:00' },
  { id: 9,  device_id: 3, device_name: 'Đèn LED 3', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-06T15:00:00' },
  { id: 10, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-06T17:00:00' },
  { id: 11, device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-06T18:30:00' },
  { id: 12, device_id: 3, device_name: 'Đèn LED 3', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-06T19:00:00' },
  { id: 13, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-06T20:00:00' },
  { id: 14, device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-06T21:00:00' },
  { id: 15, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'OFF', status: 'FAILED',  created_at: '2026-10-06T22:30:00' },
  { id: 16, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-05T08:00:00' },
  { id: 17, device_id: 3, device_name: 'Đèn LED 3', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-05T08:10:00' },
  { id: 18, device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-05T10:00:00' },
  { id: 19, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-05T12:00:00' },
  { id: 20, device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-05T13:30:00' },
  { id: 21, device_id: 3, device_name: 'Đèn LED 3', username: 'Trần Văn Đức', action: 'OFF', status: 'FAILED',  created_at: '2026-10-05T14:00:00' },
  { id: 22, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-05T16:00:00' },
  { id: 23, device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-05T18:00:00' },
  { id: 24, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-05T20:00:00' },
  { id: 25, device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-05T22:00:00' },
  { id: 26, device_id: 3, device_name: 'Đèn LED 3', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-05T22:30:00' },
  { id: 27, device_id: 3, device_name: 'Đèn LED 3', username: 'Trần Văn Đức', action: 'OFF', status: 'FAILED',  created_at: '2026-10-05T23:00:00' },
  { id: 28, device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-04T07:00:00' },
  { id: 29, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-04T09:00:00' },
  { id: 30, device_id: 3, device_name: 'Đèn LED 3', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-04T10:30:00' },
  { id: 31, device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-04T12:00:00' },
  { id: 32, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-04T14:00:00' },
  { id: 33, device_id: 3, device_name: 'Đèn LED 3', username: 'Trần Văn Đức', action: 'OFF', status: 'FAILED',  created_at: '2026-10-04T15:30:00' },
  { id: 34, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-04T17:00:00' },
  { id: 35, device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-04T19:00:00' },
  { id: 36, device_id: 3, device_name: 'Đèn LED 3', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-04T20:00:00' },
  { id: 37, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-04T22:00:00' },
  { id: 38, device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-04T22:30:00' },
  { id: 39, device_id: 3, device_name: 'Đèn LED 3', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-04T23:00:00' },
  { id: 40, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-03T06:30:00' },
  { id: 41, device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-03T08:30:00' },
  { id: 42, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-03T11:00:00' },
  { id: 43, device_id: 3, device_name: 'Đèn LED 3', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-03T13:00:00' },
  { id: 44, device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-03T14:30:00' },
  { id: 45, device_id: 3, device_name: 'Đèn LED 3', username: 'Trần Văn Đức', action: 'OFF', status: 'FAILED',  created_at: '2026-10-03T16:00:00' },
  { id: 46, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-03T18:00:00' },
  { id: 47, device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-03T19:30:00' },
  { id: 48, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-03T21:30:00' },
  { id: 49, device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-03T23:00:00' },
  { id: 50, device_id: 3, device_name: 'Đèn LED 3', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-02T07:00:00' },
  { id: 51, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-02T09:00:00' },
  { id: 52, device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-02T10:30:00' },
  { id: 53, device_id: 3, device_name: 'Đèn LED 3', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-02T12:30:00' },
  { id: 54, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-02T14:00:00' },
  { id: 55, device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-02T15:30:00' },
  { id: 56, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-02T17:30:00' },
  { id: 57, device_id: 3, device_name: 'Đèn LED 3', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-02T19:00:00' },
  { id: 58, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-02T21:00:00' },
  { id: 59, device_id: 3, device_name: 'Đèn LED 3', username: 'Trần Văn Đức', action: 'OFF', status: 'FAILED',  created_at: '2026-10-02T22:30:00' },
  { id: 60, device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-01T08:00:00' },
  { id: 61, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-01T10:00:00' },
  { id: 62, device_id: 3, device_name: 'Đèn LED 3', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-01T11:00:00' },
  { id: 63, device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-01T13:00:00' },
  { id: 64, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-01T15:00:00' },
  { id: 65, device_id: 3, device_name: 'Đèn LED 3', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-01T16:30:00' },
  { id: 66, device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-01T18:00:00' },
  { id: 67, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-10-01T20:00:00' },
  { id: 68, device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-10-01T22:00:00' },
  { id: 69, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'OFF', status: 'FAILED',  created_at: '2026-10-01T23:30:00' },
  { id: 70, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-09-30T07:30:00' },
  { id: 71, device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-09-30T09:30:00' },
  { id: 72, device_id: 3, device_name: 'Đèn LED 3', username: 'Trần Văn Đức', action: 'ON',  status: 'SUCCESS', created_at: '2026-09-30T11:30:00' },
  { id: 73, device_id: 1, device_name: 'Đèn LED 1', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-09-30T13:30:00' },
  { id: 74, device_id: 2, device_name: 'Đèn LED 2', username: 'Trần Văn Đức', action: 'OFF', status: 'SUCCESS', created_at: '2026-09-30T15:30:00' },
  { id: 75, device_id: 3, device_name: 'Đèn LED 3', username: 'Trần Văn Đức', action: 'OFF', status: 'FAILED',  created_at: '2026-09-30T17:30:00' },
];
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return (
    <button
      title="Sao chép thời gian"
      onClick={handleCopy}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0 4px',
        color: copied ? '#16a34a' : '#94a3b8',
        display: 'inline-flex',
        alignItems: 'center',
        verticalAlign: 'middle',
      }}
    >
      {copied ? <Check size={13} color="#16a34a" /> : <Copy size={13} />}
    </button>
  );
}
function PaginationControls({ currentPage, totalPages, onPageChange }: {
  currentPage: number; totalPages: number; onPageChange: (p: number) => void;
}) {
  if (totalPages <= 1) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <button className="pager-btn" disabled style={{ padding: '0 10px', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <ChevronLeft size={13} /> Trang trước
        </button>
        <button className="pager-btn active">1</button>
        <button className="pager-btn" disabled style={{ padding: '0 10px', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          Trang sau <ChevronRight size={13} />
        </button>
      </div>
    );
  }
  const pages: number[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else if (currentPage <= 3) {
    pages.push(1, 2, 3, 4, 5);
  } else if (currentPage >= totalPages - 2) {
    pages.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
  } else {
    pages.push(currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2);
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <button
        className="pager-btn"
        style={{ padding: '0 10px', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 4 }}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={13} /> Trang trước
      </button>
      {pages.map(p => (
        <button key={p} className={`pager-btn${p === currentPage ? ' active' : ''}`} onClick={() => onPageChange(p)}>
          {p}
        </button>
      ))}
      <button
        className="pager-btn"
        style={{ padding: '0 10px', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 4 }}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Trang sau <ChevronRight size={13} />
      </button>
    </div>
  );
}


export default function DeviceHistoryPage() {
  const [searchInput, setSearchInput] = useState('');
  const [appliedSearchText, setAppliedSearchText] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('all');
  const [appliedSearchCriteria, setAppliedSearchCriteria] = useState('all');
  
  const [filterDevice, setFilterDevice] = useState<string>('all');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [sortBy, setSortBy] = useState<'id' | 'created_at'>('id');
  const [sortDir, setSortDir] = useState<'ASC' | 'DESC'>('DESC');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!(event.target as HTMLElement).closest('.filter-dropdown-container')) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function getFilteredData() {
    let result = [...ALL_MOCK_ACTIONS];

    if (filterDevice !== 'all') {
      result = result.filter(r => r.device_name === filterDevice);
    }
    if (filterAction !== 'all') {
      result = result.filter(r => r.action === filterAction);
    }
    if (filterStatus !== 'all') {
      result = result.filter(r => r.status === filterStatus);
    }

    const t = appliedSearchText.trim().toLowerCase();
    if (t) {
      result = result.filter(r => {
        const dateOnly = r.created_at.substring(0, 10);
        const timeOnly = r.created_at.substring(11, 19);
        
        const actLabel = r.action === 'ON' ? 'bật' : 'tắt';
        const stLabel = r.status === 'SUCCESS' ? 'thành công' : 'thất bại';
        
        if (appliedSearchCriteria === 'device') return r.device_name.toLowerCase().includes(t);
        if (appliedSearchCriteria === 'date') return dateOnly.includes(t);
        if (appliedSearchCriteria === 'time') return timeOnly.includes(t);

        return r.device_name.toLowerCase().includes(t) || 
               dateOnly.includes(t) || timeOnly.includes(t) || 
               actLabel.includes(t) || 
               stLabel.includes(t);
      });
    }

    result.sort((a, b) => {
      let aVal = a.id;
      let bVal = b.id;
      if (sortBy === 'created_at') {
        aVal = new Date(a.created_at).getTime();
        bVal = new Date(b.created_at).getTime();
      }
      return sortDir === 'DESC' ? bVal - aVal : aVal - bVal;
    });

    return result;
  }

  const filteredData = getFilteredData();
  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / pageSize);
  const pageData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAppliedSearchText(searchInput);
    setAppliedSearchCriteria(searchCriteria);
    setPage(1);
  }

  function handleSort(col: 'id' | 'created_at') {
    if (sortBy === col) {
      setSortDir(prev => prev === 'DESC' ? 'ASC' : 'DESC');
    } else {
      setSortBy(col);
      setSortDir('DESC');
    }
    setPage(1);
  }

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => prev === name ? null : name);
  };

  const handleSelectFilter = (type: string, val: string) => {
    if (type === 'device') setFilterDevice(val);
    else if (type === 'action') setFilterAction(val);
    else if (type === 'status') setFilterStatus(val);
    setPage(1);
    setOpenDropdown(null);
  };

  const uniqueDevices = Array.from(new Set(ALL_MOCK_ACTIONS.map(d => d.device_name)));

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ flexShrink: 0 }}>
        <h1 className="page-title">Lịch sử Bật/tắt thiết bị</h1>
        <p className="page-sub">
          <span>Tổng </span><strong>{totalRecords}</strong><span> thao tác được ghi nhận</span>
        </p>
      </div>

      <div className="card" style={{ padding: '10px 14px', background: '#ffffff', borderRadius: 8, border: '1px solid var(--border)', flexShrink: 0 }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, background: '#f8fafc', border: '1px solid var(--border)', borderRadius: 6, padding: '0 10px', height: 36 }}>
            <Search size={15} color="#94a3b8" style={{ flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Nhập từ khóa (tên thiết bị, thời gian, trạng thái...)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: 'var(--text-1)' }}
            />
            {searchInput && <X size={14} style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => setSearchInput('')} />}
          </div>
          <select 
            className="input" 
            style={{ height: 36, fontSize: 13, padding: '0 10px', width: 'auto', flexShrink: 0 }}
            value={searchCriteria}
            onChange={(e) => setSearchCriteria(e.target.value)}
          >
            <option value="all">Tìm theo (Tất cả)</option>
            <option value="device">Tên thiết bị</option>
            <option value="date">Ngày</option>
            <option value="time">Giờ</option>
          </select>
          <button type="submit" className="btn btn-primary" style={{ height: 36, display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <Search size={13} /> Tìm kiếm
          </button>
        </form>
      </div>

      <div style={{ flex: '1 1 auto', minHeight: 0, background: '#ffffff', borderRadius: 8, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
        <div className="flex-1 overflow-y-auto">
          <table className="tbl" style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
            <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
                <th style={{ width: '6%', cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('id')}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    ID {sortBy === 'id' ? (sortDir === 'DESC' ? <ChevronDown size={12} color="#0ea5e9" /> : <ChevronUp size={12} color="#0ea5e9" />) : <ArrowUpDown size={11} color="#94a3b8" />}
                  </span>
                </th>
                
                <th style={{ width: '18%' }}>
                  <div className="filter-dropdown-container" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    Tên thiết bị
                    <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 2, background: filterDevice !== 'all' ? '#e0f2fe' : 'transparent', borderRadius: 4 }} onClick={() => toggleDropdown('device')}>
                      <Filter size={13} color={filterDevice !== 'all' ? '#0284c7' : '#94a3b8'} />
                    </div>
                    {openDropdown === 'device' && (
                      <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 6, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', minWidth: 150, zIndex: 50 }}>
                        <div style={{ padding: '6px 12px', fontSize: 13, cursor: 'pointer', background: filterDevice === 'all' ? '#f1f5f9' : '#fff' }} onClick={() => handleSelectFilter('device', 'all')}>Tất cả</div>
                        {uniqueDevices.map(d => (
                          <div key={d} style={{ padding: '6px 12px', fontSize: 13, cursor: 'pointer', background: filterDevice === d ? '#f1f5f9' : '#fff' }} onClick={() => handleSelectFilter('device', d)}>{d}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </th>

                <th style={{ width: '20%', textAlign: 'left', paddingLeft: 12 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    Người thực hiện
                  </span>
                </th>

                <th style={{ width: '14%' }}>
                  <div className="filter-dropdown-container" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    Hành động
                    <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 2, background: filterAction !== 'all' ? '#e0f2fe' : 'transparent', borderRadius: 4 }} onClick={() => toggleDropdown('action')}>
                      <Filter size={13} color={filterAction !== 'all' ? '#0284c7' : '#94a3b8'} />
                    </div>
                    {openDropdown === 'action' && (
                      <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 6, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', minWidth: 120, zIndex: 50 }}>
                        <div style={{ padding: '6px 12px', fontSize: 13, cursor: 'pointer', background: filterAction === 'all' ? '#f1f5f9' : '#fff' }} onClick={() => handleSelectFilter('action', 'all')}>Tất cả</div>
                        <div style={{ padding: '6px 12px', fontSize: 13, cursor: 'pointer', background: filterAction === 'ON' ? '#f1f5f9' : '#fff' }} onClick={() => handleSelectFilter('action', 'ON')}>Bật</div>
                        <div style={{ padding: '6px 12px', fontSize: 13, cursor: 'pointer', background: filterAction === 'OFF' ? '#f1f5f9' : '#fff' }} onClick={() => handleSelectFilter('action', 'OFF')}>Tắt</div>
                      </div>
                    )}
                  </div>
                </th>

                <th style={{ width: '16%' }}>
                  <div className="filter-dropdown-container" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    Trạng thái
                    <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 2, background: filterStatus !== 'all' ? '#e0f2fe' : 'transparent', borderRadius: 4 }} onClick={() => toggleDropdown('status')}>
                      <Filter size={13} color={filterStatus !== 'all' ? '#0284c7' : '#94a3b8'} />
                    </div>
                    {openDropdown === 'status' && (
                      <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 6, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', minWidth: 120, zIndex: 50 }}>
                        <div style={{ padding: '6px 12px', fontSize: 13, cursor: 'pointer', background: filterStatus === 'all' ? '#f1f5f9' : '#fff' }} onClick={() => handleSelectFilter('status', 'all')}>Tất cả</div>
                        <div style={{ padding: '6px 12px', fontSize: 13, cursor: 'pointer', background: filterStatus === 'SUCCESS' ? '#f1f5f9' : '#fff' }} onClick={() => handleSelectFilter('status', 'SUCCESS')}>Thành công</div>
                        <div style={{ padding: '6px 12px', fontSize: 13, cursor: 'pointer', background: filterStatus === 'FAILED' ? '#f1f5f9' : '#fff' }} onClick={() => handleSelectFilter('status', 'FAILED')}>Thất bại</div>
                      </div>
                    )}
                  </div>
                </th>

                <th style={{ width: '26%', cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('created_at')}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    Thời gian thao tác {sortBy === 'created_at' ? (sortDir === 'DESC' ? <ChevronDown size={12} color="#0ea5e9" /> : <ChevronUp size={12} color="#0ea5e9" />) : <ArrowUpDown size={11} color="#94a3b8" />}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '36px 20px', color: 'var(--text-4)' }}>Không có bản ghi nào phù hợp</td></tr>
              ) : (
                pageData.map((row, idx) => {
                  const timeString = row.created_at.replace('T', ' ').substring(0, 19);
                  return (
                    <tr key={row.id} style={{ background: idx % 2 === 0 ? '#ffffff' : '#fcfcfd', borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ color: 'var(--text-4)', fontSize: 12, fontFamily: 'monospace' }}>{row.id}</td>
                      <td style={{ fontWeight: 500, color: 'var(--text-1)' }}>{row.device_name}</td>
                      <td style={{ color: 'var(--text-2)' }}>{row.username}</td>
                      <td style={{ fontWeight: 600, color: row.action === 'ON' ? '#0284c7' : '#64748b' }}>{row.action === 'ON' ? 'Bật' : 'Tắt'}</td>
                      <td>
                        <span style={{ color: row.status === 'SUCCESS' ? '#16a34a' : '#dc2626', fontWeight: 500, fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: row.status === 'SUCCESS' ? '#16a34a' : '#dc2626' }} />
                          {row.status === 'SUCCESS' ? 'Thành công' : 'Thất bại'}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-2)' }}>
                        <span style={{ fontFamily: 'monospace', fontSize: 13 }}>{timeString}</span>
                        <CopyButton text={timeString} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '10px 16px', borderTop: '1px solid var(--border)', flexShrink: 0, gap: 10, background: '#fafbfc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
            <span style={{ color: 'var(--text-3)' }}>Số bản ghi / trang:</span>
            <select className="input" style={{ width: 'auto', padding: '4px 8px', fontSize: 13, height: 32 }} value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}>
              <option value={5}>5 bản ghi / trang</option>
              <option value={10}>10 bản ghi / trang</option>
              <option value={20}>20 bản ghi / trang</option>
            </select>
          </div>
          <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={(p) => setPage(p)} />
          <div style={{ textAlign: 'right', fontSize: 12, color: 'var(--text-3)' }}>
            <span>Trang </span><strong>{page}</strong><span> / {totalPages || 1}</span><span>&nbsp;·&nbsp;</span><span>Tổng </span><strong>{totalRecords}</strong><span> thao tác</span>
          </div>
        </div>
      </div>
    </div>
  );
}
