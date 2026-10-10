// RRevX Maps API (server side, Node 18+) — คิดค่าส่งตามระยะทางถนนจริง + หาคนขับที่ใกล้ที่สุด
// ใช้คีย์เซิร์ฟเวอร์ rx_sec_… จากตัวแปรแวดล้อม (ห้ามใส่คีย์ในโค้ด / ห้ามส่งไปหน้าเว็บ)
//   RRX_KEY=rx_sec_xxx node delivery-fee.mjs
// เอกสาร: https://rrevx.com/maps/docs

const KEY = process.env.RRX_KEY;
if (!KEY) { console.error('ตั้งค่า RRX_KEY=rx_sec_… ก่อน'); process.exit(1); }
const API = 'https://api.rrevx.com/v1';

async function get(path, params = {}) {
  const url = `${API}${path}?${new URLSearchParams({ ...params, key: KEY })}`;
  const r = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  const j = await r.json();
  if (!r.ok) throw new Error(`${r.status} ${j.error ?? j.code ?? ''}`);
  return j;
}
const pt = ([lng, lat]) => `${lng},${lat}`;

// 1) ระยะทางถนนจริง → ค่าส่ง (ตัวอย่าง: 35 บาท 3 กม.แรก + 9 บาท/กม.)
async function deliveryFee(from, to) {
  const r = await get(`/route/${pt(from)};${pt(to)}`, { overview: 'false', exclude: 'ferry' });
  if (r.code !== 'Ok') return { error: r.code };      // เช่น NoRoute (ข้ามเกาะไม่มีสะพาน)
  const km = r.routes[0].distance / 1000;
  const fee = 35 + Math.max(0, Math.ceil(km - 3)) * 9;
  return { km: +km.toFixed(2), minutes: Math.round(r.routes[0].duration / 60), fee };
}

// 2) คนขับคนไหนไปถึงจุดรับเร็วที่สุด: /v1/table ยิงครั้งเดียวได้ทุกคู่
async function nearestDriver(drivers, pickup) {
  const coords = [...drivers.map((d) => d.at), pickup].map(pt).join(';');
  const r = await get(`/table/${coords}`, {
    sources: drivers.map((_, i) => i).join(';'),
    destinations: String(drivers.length),
    annotations: 'duration,distance',
  });
  return drivers
    .map((d, i) => ({ ...d, seconds: r.durations[i][0], meters: r.distances[i][0] }))
    .filter((d) => d.seconds != null)
    .sort((a, b) => a.seconds - b.seconds)[0];
}

const shop = [100.5341, 13.7457];     // [lng, lat] สยาม
const customer = [100.5383, 13.7649]; // อนุสาวรีย์ชัยฯ
console.log('ค่าส่ง', await deliveryFee(shop, customer));
console.log('คนขับใกล้สุด', await nearestDriver([
  { id: 'A', at: [100.5300, 13.7400] },
  { id: 'B', at: [100.5600, 13.7500] },
  { id: 'C', at: [100.5000, 13.7300] },
], shop));
