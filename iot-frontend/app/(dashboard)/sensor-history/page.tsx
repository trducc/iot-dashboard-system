'use client';
import { useState, useRef, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Copy, Check, ChevronUp, ChevronDown, RotateCcw, Filter, ArrowUpDown, X } from 'lucide-react';
interface SensorDataRow {
  id: number;
  sensor_id: number;
  sensor_name: string;
  value: number;
  created_at: string;
}
const ALL_MOCK_DATA: SensorDataRow[] = [
  { id:   1, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  26.5, created_at: '2026-10-06T06:00:00' },
  { id:   2, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  78.5, created_at: '2026-10-06T06:21:05' },
  { id:   3, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 860.0, created_at: '2026-10-06T06:43:10' },
  { id:   4, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  68.0, created_at: '2026-10-06T07:05:15' },
  { id:   5, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 740.0, created_at: '2026-10-06T07:26:20' },
  { id:   6, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  37.5, created_at: '2026-10-06T07:48:25' },
  { id:   7, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 450.0, created_at: '2026-10-06T08:10:30' },
  { id:   8, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  31.8, created_at: '2026-10-06T08:31:35' },
  { id:   9, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  86.5, created_at: '2026-10-06T08:53:40' },
  { id:  10, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  26.8, created_at: '2026-10-06T09:15:45' },
  { id:  11, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  82.5, created_at: '2026-10-06T09:37:50' },
  { id:  12, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value:  18.0, created_at: '2026-10-06T09:58:55' },
  { id:  13, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  69.8, created_at: '2026-10-06T10:20:00' },
  { id:  14, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 760.0, created_at: '2026-10-06T10:42:05' },
  { id:  15, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  36.4, created_at: '2026-10-06T11:03:10' },
  { id:  16, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 210.0, created_at: '2026-10-06T11:25:15' },
  { id:  17, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  33.5, created_at: '2026-10-06T11:47:20' },
  { id:  18, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  89.5, created_at: '2026-10-06T12:08:25' },
  { id:  19, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  25.8, created_at: '2026-10-06T12:30:30' },
  { id:  20, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  80.5, created_at: '2026-10-06T12:52:35' },
  { id:  21, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value:  12.0, created_at: '2026-10-06T13:14:40' },
  { id:  22, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  66.5, created_at: '2026-10-06T13:35:45' },
  { id:  23, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value:  55.0, created_at: '2026-10-06T13:57:50' },
  { id:  24, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  35.5, created_at: '2026-10-06T14:19:55' },
  { id:  25, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 290.0, created_at: '2026-10-06T14:40:00' },
  { id:  26, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  32.1, created_at: '2026-10-06T15:02:05' },
  { id:  27, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  87.5, created_at: '2026-10-06T15:24:10' },
  { id:  28, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  28.2, created_at: '2026-10-06T15:45:15' },
  { id:  29, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  83.0, created_at: '2026-10-06T16:07:20' },
  { id:  30, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 1100.0, created_at: '2026-10-06T16:29:25' },
  { id:  31, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  62.5, created_at: '2026-10-06T16:51:30' },
  { id:  32, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 680.0, created_at: '2026-10-06T17:12:35' },
  { id:  33, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  36.8, created_at: '2026-10-06T17:34:40' },
  { id:  34, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 320.0, created_at: '2026-10-06T17:56:45' },
  { id:  35, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  33.1, created_at: '2026-10-06T18:17:50' },
  { id:  36, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  92.0, created_at: '2026-10-06T18:39:55' },
  { id:  37, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  28.1, created_at: '2026-10-06T19:01:00' },
  { id:  38, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  76.5, created_at: '2026-10-06T19:22:05' },
  { id:  39, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 1020.0, created_at: '2026-10-06T19:44:10' },
  { id:  40, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  65.4, created_at: '2026-10-06T20:06:15' },
  { id:  41, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value:  45.0, created_at: '2026-10-06T20:28:20' },
  { id:  42, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  35.8, created_at: '2026-10-06T20:49:25' },
  { id:  43, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 380.0, created_at: '2026-10-06T21:11:30' },
  { id:  44, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  32.8, created_at: '2026-10-06T21:33:35' },
  { id:  45, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  41.0, created_at: '2026-10-06T21:54:40' },
  { id:  46, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  28.5, created_at: '2026-10-06T22:16:45' },
  { id:  47, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  79.5, created_at: '2026-10-06T22:38:50' },
  { id:  48, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 980.0, created_at: '2026-10-06T23:00:55' },
  { id:  49, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  72.0, created_at: '2026-10-05T06:00:00' },
  { id:  50, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 730.0, created_at: '2026-10-05T06:44:05' },
  { id:  51, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  39.0, created_at: '2026-10-05T07:28:10' },
  { id:  52, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 500.0, created_at: '2026-10-05T08:13:15' },
  { id:  53, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  34.0, created_at: '2026-10-05T08:57:20' },
  { id:  54, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  42.5, created_at: '2026-10-05T09:41:25' },
  { id:  55, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  27.4, created_at: '2026-10-05T10:26:30' },
  { id:  56, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  77.8, created_at: '2026-10-05T11:10:35' },
  { id:  57, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 880.0, created_at: '2026-10-05T11:54:40' },
  { id:  58, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  67.2, created_at: '2026-10-05T12:39:45' },
  { id:  59, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 750.0, created_at: '2026-10-05T13:23:50' },
  { id:  60, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  37.8, created_at: '2026-10-05T14:07:55' },
  { id:  61, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 180.0, created_at: '2026-10-05T14:52:00' },
  { id:  62, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  32.4, created_at: '2026-10-05T15:36:05' },
  { id:  63, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  88.5, created_at: '2026-10-05T16:20:10' },
  { id:  64, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  27.2, created_at: '2026-10-05T17:05:15' },
  { id:  65, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  81.0, created_at: '2026-10-05T17:49:20' },
  { id:  66, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 950.0, created_at: '2026-10-05T18:33:25' },
  { id:  67, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  71.2, created_at: '2026-10-05T19:18:30' },
  { id:  68, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 710.0, created_at: '2026-10-05T20:02:35' },
  { id:  69, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  38.2, created_at: '2026-10-05T20:46:40' },
  { id:  70, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 260.0, created_at: '2026-10-05T21:31:45' },
  { id:  71, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  34.2, created_at: '2026-10-05T22:15:50' },
  { id:  72, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  94.0, created_at: '2026-10-05T23:00:55' },
  { id:  73, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  27.9, created_at: '2026-10-04T06:00:00' },
  { id:  74, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  52.0, created_at: '2026-10-04T06:44:05' },
  { id:  75, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 890.0, created_at: '2026-10-04T07:28:10' },
  { id:  76, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  63.5, created_at: '2026-10-04T08:13:15' },
  { id:  77, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 690.0, created_at: '2026-10-04T08:57:20' },
  { id:  78, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  37.1, created_at: '2026-10-04T09:41:25' },
  { id:  79, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 410.0, created_at: '2026-10-04T10:26:30' },
  { id:  80, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  31.5, created_at: '2026-10-04T11:10:35' },
  { id:  81, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  93.0, created_at: '2026-10-04T11:54:40' },
  { id:  82, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  29.0, created_at: '2026-10-04T12:39:45' },
  { id:  83, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  53.5, created_at: '2026-10-04T13:23:50' },
  { id:  84, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 1050.0, created_at: '2026-10-04T14:07:55' },
  { id:  85, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  70.4, created_at: '2026-10-04T14:52:00' },
  { id:  86, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 670.0, created_at: '2026-10-04T15:36:05' },
  { id:  87, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  36.2, created_at: '2026-10-04T16:20:10' },
  { id:  88, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 360.0, created_at: '2026-10-04T17:05:15' },
  { id:  89, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  33.7, created_at: '2026-10-04T17:49:20' },
  { id:  90, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  91.0, created_at: '2026-10-04T18:33:25' },
  { id:  91, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  26.5, created_at: '2026-10-04T19:18:30' },
  { id:  92, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  78.5, created_at: '2026-10-04T20:02:35' },
  { id:  93, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 860.0, created_at: '2026-10-04T20:46:40' },
  { id:  94, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  68.0, created_at: '2026-10-04T21:31:45' },
  { id:  95, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 740.0, created_at: '2026-10-04T22:15:50' },
  { id:  96, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  37.5, created_at: '2026-10-04T23:00:55' },
  { id:  97, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 450.0, created_at: '2026-10-03T06:00:00' },
  { id:  98, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  31.8, created_at: '2026-10-03T06:44:05' },
  { id:  99, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  86.5, created_at: '2026-10-03T07:28:10' },
  { id: 100, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  26.8, created_at: '2026-10-03T08:13:15' },
  { id: 101, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  82.5, created_at: '2026-10-03T08:57:20' },
  { id: 102, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value:  18.0, created_at: '2026-10-03T09:41:25' },
  { id: 103, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  69.8, created_at: '2026-10-03T10:26:30' },
  { id: 104, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 760.0, created_at: '2026-10-03T11:10:35' },
  { id: 105, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  36.4, created_at: '2026-10-03T11:54:40' },
  { id: 106, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 210.0, created_at: '2026-10-03T12:39:45' },
  { id: 107, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  33.5, created_at: '2026-10-03T13:23:50' },
  { id: 108, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  89.5, created_at: '2026-10-03T14:07:55' },
  { id: 109, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  25.8, created_at: '2026-10-03T14:52:00' },
  { id: 110, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  80.5, created_at: '2026-10-03T15:36:05' },
  { id: 111, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value:  12.0, created_at: '2026-10-03T16:20:10' },
  { id: 112, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  66.5, created_at: '2026-10-03T17:05:15' },
  { id: 113, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value:  55.0, created_at: '2026-10-03T17:49:20' },
  { id: 114, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  35.5, created_at: '2026-10-03T18:33:25' },
  { id: 115, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 290.0, created_at: '2026-10-03T19:18:30' },
  { id: 116, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  32.1, created_at: '2026-10-03T20:02:35' },
  { id: 117, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  87.5, created_at: '2026-10-03T20:46:40' },
  { id: 118, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  28.2, created_at: '2026-10-03T21:31:45' },
  { id: 119, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  83.0, created_at: '2026-10-03T22:15:50' },
  { id: 120, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 1100.0, created_at: '2026-10-03T23:00:55' },
  { id: 121, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  62.5, created_at: '2026-10-02T06:00:00' },
  { id: 122, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 680.0, created_at: '2026-10-02T06:51:05' },
  { id: 123, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  36.8, created_at: '2026-10-02T07:42:10' },
  { id: 124, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 320.0, created_at: '2026-10-02T08:33:15' },
  { id: 125, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  33.1, created_at: '2026-10-02T09:24:20' },
  { id: 126, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  92.0, created_at: '2026-10-02T10:15:25' },
  { id: 127, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  28.1, created_at: '2026-10-02T11:06:30' },
  { id: 128, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  76.5, created_at: '2026-10-02T11:57:35' },
  { id: 129, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 1020.0, created_at: '2026-10-02T12:48:40' },
  { id: 130, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  65.4, created_at: '2026-10-02T13:39:45' },
  { id: 131, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value:  45.0, created_at: '2026-10-02T14:30:50' },
  { id: 132, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  35.8, created_at: '2026-10-02T15:21:55' },
  { id: 133, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 380.0, created_at: '2026-10-02T16:12:00' },
  { id: 134, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  32.8, created_at: '2026-10-02T17:03:05' },
  { id: 135, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  41.0, created_at: '2026-10-02T17:54:10' },
  { id: 136, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  28.5, created_at: '2026-10-02T18:45:15' },
  { id: 137, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  79.5, created_at: '2026-10-02T19:36:20' },
  { id: 138, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 980.0, created_at: '2026-10-02T20:27:25' },
  { id: 139, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  72.0, created_at: '2026-10-02T21:18:30' },
  { id: 140, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 730.0, created_at: '2026-10-02T22:09:35' },
  { id: 141, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  39.0, created_at: '2026-10-02T23:00:40' },
  { id: 142, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 500.0, created_at: '2026-10-01T06:00:00' },
  { id: 143, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  34.0, created_at: '2026-10-01T06:53:05' },
  { id: 144, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  42.5, created_at: '2026-10-01T07:47:10' },
  { id: 145, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  27.4, created_at: '2026-10-01T08:41:15' },
  { id: 146, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  77.8, created_at: '2026-10-01T09:34:20' },
  { id: 147, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 880.0, created_at: '2026-10-01T10:28:25' },
  { id: 148, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  67.2, created_at: '2026-10-01T11:22:30' },
  { id: 149, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 750.0, created_at: '2026-10-01T12:15:35' },
  { id: 150, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  37.8, created_at: '2026-10-01T13:09:40' },
  { id: 151, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 180.0, created_at: '2026-10-01T14:03:45' },
  { id: 152, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  32.4, created_at: '2026-10-01T14:56:50' },
  { id: 153, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  88.5, created_at: '2026-10-01T15:50:55' },
  { id: 154, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  27.2, created_at: '2026-10-01T16:44:00' },
  { id: 155, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  81.0, created_at: '2026-10-01T17:37:05' },
  { id: 156, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 950.0, created_at: '2026-10-01T18:31:10' },
  { id: 157, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  71.2, created_at: '2026-10-01T19:25:15' },
  { id: 158, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 710.0, created_at: '2026-10-01T20:18:20' },
  { id: 159, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  38.2, created_at: '2026-10-01T21:12:25' },
  { id: 160, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 260.0, created_at: '2026-10-01T22:06:30' },
  { id: 161, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  34.2, created_at: '2026-10-01T23:00:35' },
  { id: 162, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  94.0, created_at: '2026-09-30T06:00:00' },
  { id: 163, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  27.9, created_at: '2026-09-30T07:25:05' },
  { id: 164, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  52.0, created_at: '2026-09-30T08:50:10' },
  { id: 165, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 890.0, created_at: '2026-09-30T10:15:15' },
  { id: 166, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  63.5, created_at: '2026-09-30T11:40:20' },
  { id: 167, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 690.0, created_at: '2026-09-30T13:05:25' },
  { id: 168, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  37.1, created_at: '2026-09-30T14:30:30' },
  { id: 169, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 410.0, created_at: '2026-09-30T15:55:35' },
  { id: 170, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  31.5, created_at: '2026-09-30T17:20:40' },
  { id: 171, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  93.0, created_at: '2026-09-30T18:45:45' },
  { id: 172, sensor_id: 1, sensor_name: 'Nhiệt độ (Temperature)'    , value:  29.0, created_at: '2026-09-30T20:10:50' },
  { id: 173, sensor_id: 2, sensor_name: 'Độ ẩm (Humidity)'          , value:  53.5, created_at: '2026-09-30T21:35:55' },
  { id: 174, sensor_id: 3, sensor_name: 'Ánh sáng (Light)'          , value: 1050.0, created_at: '2026-09-30T23:00:00' },
];
function getSensorAlert(sensorName: string, value: number): 'normal' | 'warning' | 'danger' {
  const name = sensorName.toLowerCase();
  if (name.includes('nhiệt') || name.includes('temp')) {
    if (value >= 35 || value < 16) return 'danger';
    if (value >= 31 || value < 20) return 'warning';
    return 'normal';
  }
  if (name.includes('ẩm') || name.includes('hum')) {
    if (value >= 85 || value < 45) return 'danger';
    if (value >= 75 || value < 55) return 'warning';
    return 'normal';
  }
  if (name.includes('sáng') || name.includes('light')) {
    if (value >= 800 || value < 25) return 'danger';
    if (value >= 650 || value < 80) return 'warning';
    return 'normal';
  }
  return 'normal';
}
function renderAlertBadge(alert: 'normal' | 'warning' | 'danger') {
  const dotColor = alert === 'danger' ? '#dc2626' : alert === 'warning' ? '#d97706' : '#16a34a';
  const text = alert === 'danger' ? 'Nguy hiểm' : alert === 'warning' ? 'Cảnh báo' : 'Bình thường';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-1)', fontWeight: 500 }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: dotColor }} />
      {text}
    </span>
  );
}
function formatSensorValue(value: number, sensorName: string) {
  const name = sensorName.toLowerCase();
  if (name.includes('nhiệt') || name.includes('temp')) return `${value.toFixed(1)} °C`;
  if (name.includes('ẩm')   || name.includes('hum'))  return `${value.toFixed(1)} %`;
  return `${value.toFixed(0)} Lux`;
}
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


export default function SensorHistoryPage() {
  const [searchInput, setSearchInput] = useState('');
  const [appliedSearchText, setAppliedSearchText] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('all');
  const [appliedSearchCriteria, setAppliedSearchCriteria] = useState('all');
  
  const [filterAlert, setFilterAlert] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<string>('all');

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [sortBy, setSortBy] = useState<'id' | 'value' | 'created_at'>('id');
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
    let result = [...ALL_MOCK_DATA];

    if (filterType === 'temp') result = result.filter(r => r.sensor_id === 1);
    else if (filterType === 'hum') result = result.filter(r => r.sensor_id === 2);
    else if (filterType === 'light') result = result.filter(r => r.sensor_id === 3);

    if (filterAlert !== 'all') {
      result = result.filter(r => getSensorAlert(r.sensor_name, r.value) === filterAlert);
    }

    if (filterDate === 'today') result = result.filter(r => r.created_at.startsWith('2026-10-06'));
    else if (filterDate === 'week') result = result.filter(r => r.created_at >= '2026-10-01');
    else if (filterDate === 'month') result = result.filter(r => r.created_at.startsWith('2026-10'));

    const t = appliedSearchText.trim().toLowerCase();
    if (t) {
      result = result.filter(r => {
        const dateOnly = r.created_at.substring(0, 10);
        const timeOnly = r.created_at.substring(11, 19);
        const al = getSensorAlert(r.sensor_name, r.value);
        const alLabel = al === 'danger' ? 'nguy hiểm' : al === 'warning' ? 'cảnh báo' : 'bình thường';
        
        if (appliedSearchCriteria === 'type') return r.sensor_name.toLowerCase().includes(t);
        if (appliedSearchCriteria === 'value') return r.value.toString().includes(t);
        if (appliedSearchCriteria === 'date') return dateOnly.includes(t);
        if (appliedSearchCriteria === 'time') return timeOnly.includes(t);

        return r.sensor_name.toLowerCase().includes(t) || 
               r.value.toString().includes(t) || 
               dateOnly.includes(t) || timeOnly.includes(t) || 
               alLabel.includes(t);
      });
    }

    result.sort((a, b) => {
      let aVal = a.id, bVal = b.id;
      if (sortBy === 'value') { aVal = a.value; bVal = b.value; }
      else if (sortBy === 'created_at') { aVal = new Date(a.created_at).getTime(); bVal = new Date(b.created_at).getTime(); }
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

  function handleSort(col: 'id' | 'value' | 'created_at') {
    if (sortBy === col) setSortDir(prev => prev === 'DESC' ? 'ASC' : 'DESC');
    else { setSortBy(col); setSortDir('DESC'); }
    setPage(1);
  }

  const toggleDropdown = (name: string) => setOpenDropdown(prev => prev === name ? null : name);

  const handleSelectFilter = (type: string, val: string) => {
    if (type === 'alert') setFilterAlert(val);
    else if (type === 'type') setFilterType(val);
    else if (type === 'date') setFilterDate(val);
    setPage(1);
    setOpenDropdown(null);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ flexShrink: 0 }}>
        <h1 className="page-title">Lịch sử Cảm biến</h1>
        <p className="page-sub">
          <span>Tổng </span><strong>{totalRecords}</strong><span> bản ghi được lưu trữ</span>
        </p>
      </div>

      <div className="card" style={{ padding: '10px 14px', background: '#ffffff', borderRadius: 8, border: '1px solid var(--border)', flexShrink: 0 }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, background: '#f8fafc', border: '1px solid var(--border)', borderRadius: 6, padding: '0 10px', height: 36 }}>
            <Search size={15} color="#94a3b8" style={{ flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Nhập từ khóa (tên cảm biến, giá trị, thời gian...)"
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
            <option value="type">Loại cảm biến</option>
            <option value="value">Giá trị</option>
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
                <th style={{ width: '8%', cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('id')}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    ID {sortBy === 'id' ? (sortDir === 'DESC' ? <ChevronDown size={12} color="#0ea5e9" /> : <ChevronUp size={12} color="#0ea5e9" />) : <ArrowUpDown size={11} color="#94a3b8" />}
                  </span>
                </th>
                
                <th style={{ width: '18%' }}>
                  <div className="filter-dropdown-container" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    Cảnh báo
                    <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 2, background: filterAlert !== 'all' ? '#e0f2fe' : 'transparent', borderRadius: 4 }} onClick={() => toggleDropdown('alert')}>
                      <Filter size={13} color={filterAlert !== 'all' ? '#0284c7' : '#94a3b8'} />
                    </div>
                    {openDropdown === 'alert' && (
                      <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 6, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', minWidth: 140, zIndex: 50 }}>
                        <div style={{ padding: '6px 12px', fontSize: 13, cursor: 'pointer', background: filterAlert === 'all' ? '#f1f5f9' : '#fff' }} onClick={() => handleSelectFilter('alert', 'all')}>Tất cả</div>
                        <div style={{ padding: '6px 12px', fontSize: 13, cursor: 'pointer', background: filterAlert === 'normal' ? '#f1f5f9' : '#fff' }} onClick={() => handleSelectFilter('alert', 'normal')}>Bình thường</div>
                        <div style={{ padding: '6px 12px', fontSize: 13, cursor: 'pointer', background: filterAlert === 'warning' ? '#f1f5f9' : '#fff' }} onClick={() => handleSelectFilter('alert', 'warning')}>Cảnh báo</div>
                        <div style={{ padding: '6px 12px', fontSize: 13, cursor: 'pointer', background: filterAlert === 'danger' ? '#f1f5f9' : '#fff' }} onClick={() => handleSelectFilter('alert', 'danger')}>Nguy hiểm</div>
                      </div>
                    )}
                  </div>
                </th>

                <th style={{ width: '22%' }}>
                  <div className="filter-dropdown-container" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    Loại cảm biến
                    <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 2, background: filterType !== 'all' ? '#e0f2fe' : 'transparent', borderRadius: 4 }} onClick={() => toggleDropdown('type')}>
                      <Filter size={13} color={filterType !== 'all' ? '#0284c7' : '#94a3b8'} />
                    </div>
                    {openDropdown === 'type' && (
                      <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 6, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', minWidth: 120, zIndex: 50 }}>
                        <div style={{ padding: '6px 12px', fontSize: 13, cursor: 'pointer', background: filterType === 'all' ? '#f1f5f9' : '#fff' }} onClick={() => handleSelectFilter('type', 'all')}>Tất cả</div>
                        <div style={{ padding: '6px 12px', fontSize: 13, cursor: 'pointer', background: filterType === 'temp' ? '#f1f5f9' : '#fff' }} onClick={() => handleSelectFilter('type', 'temp')}>Nhiệt độ</div>
                        <div style={{ padding: '6px 12px', fontSize: 13, cursor: 'pointer', background: filterType === 'hum' ? '#f1f5f9' : '#fff' }} onClick={() => handleSelectFilter('type', 'hum')}>Độ ẩm</div>
                        <div style={{ padding: '6px 12px', fontSize: 13, cursor: 'pointer', background: filterType === 'light' ? '#f1f5f9' : '#fff' }} onClick={() => handleSelectFilter('type', 'light')}>Ánh sáng</div>
                      </div>
                    )}
                  </div>
                </th>

                <th style={{ width: '20%', cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('value')}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    Giá trị {sortBy === 'value' ? (sortDir === 'DESC' ? <ChevronDown size={12} color="#0ea5e9" /> : <ChevronUp size={12} color="#0ea5e9" />) : <ArrowUpDown size={11} color="#94a3b8" />}
                  </span>
                </th>

                <th>
                  <div className="filter-dropdown-container" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ cursor: 'pointer', userSelect: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }} onClick={() => handleSort('created_at')}>
                      Thời gian đo {sortBy === 'created_at' ? (sortDir === 'DESC' ? <ChevronDown size={12} color="#0ea5e9" /> : <ChevronUp size={12} color="#0ea5e9" />) : <ArrowUpDown size={11} color="#94a3b8" />}
                    </span>
                    <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 2, background: filterDate !== 'all' ? '#e0f2fe' : 'transparent', borderRadius: 4 }} onClick={() => toggleDropdown('date')}>
                      <Filter size={13} color={filterDate !== 'all' ? '#0284c7' : '#94a3b8'} />
                    </div>
                    {openDropdown === 'date' && (
                      <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 6, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', minWidth: 140, zIndex: 50 }}>
                        <div style={{ padding: '6px 12px', fontSize: 13, cursor: 'pointer', background: filterDate === 'all' ? '#f1f5f9' : '#fff' }} onClick={() => handleSelectFilter('date', 'all')}>Tất cả</div>
                        <div style={{ padding: '6px 12px', fontSize: 13, cursor: 'pointer', background: filterDate === 'today' ? '#f1f5f9' : '#fff' }} onClick={() => handleSelectFilter('date', 'today')}>Hôm nay (06/10)</div>
                        <div style={{ padding: '6px 12px', fontSize: 13, cursor: 'pointer', background: filterDate === 'week' ? '#f1f5f9' : '#fff' }} onClick={() => handleSelectFilter('date', 'week')}>Tuần này</div>
                        <div style={{ padding: '6px 12px', fontSize: 13, cursor: 'pointer', background: filterDate === 'month' ? '#f1f5f9' : '#fff' }} onClick={() => handleSelectFilter('date', 'month')}>Tháng 10</div>
                      </div>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '36px 20px', color: 'var(--text-4)' }}>Không có bản ghi nào phù hợp</td></tr>
              ) : (
                pageData.map((row, idx) => {
                  const alertLevel = getSensorAlert(row.sensor_name, row.value);
                  const timeString = row.created_at.replace('T', ' ').substring(0, 19);
                  return (
                    <tr key={row.id} style={{ background: idx % 2 === 0 ? '#ffffff' : '#fcfcfd', borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ color: 'var(--text-4)', fontSize: 12, fontFamily: 'monospace' }}>{row.id}</td>
                      <td>{renderAlertBadge(alertLevel)}</td>
                      <td style={{ fontWeight: 500, color: 'var(--text-1)' }}>{row.sensor_name.split(' (')[0]}</td>
                      <td style={{ fontWeight: 600, color: '#0f172a', fontFamily: 'monospace' }}>{formatSensorValue(row.value, row.sensor_name)}</td>
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
            <span>Trang </span><strong>{page}</strong><span> / {totalPages || 1}</span><span>&nbsp;·&nbsp;</span><span>Tổng </span><strong>{totalRecords}</strong><span> bản ghi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
