# ย้ายจาก Google Maps มา RRevX Maps API

บทความเต็ม (ทีละขั้น + เช็กลิสต์): https://rrevx.com/blog/migrate-google-maps-to-maplibre?utm_source=github&utm_medium=readme&utm_campaign=maps_launch

| Google Maps Platform | RRevX Maps API | หมายเหตุ |
|---|---|---|
| Maps JavaScript API (`new google.maps.Map`) | MapLibre GL JS + `GET /v1/styles/liberty.json` | ดู `web/maplibre.html` · พิกัดเป็น `[lng, lat]` (กลับกับ Google) |
| Directions / Routes API | `GET /v1/route/{lng,lat;lng,lat}` | รูปแบบเดียวกับ OSRM · ระยะเป็นเมตร เวลาเป็นวินาที |
| Distance Matrix / Route Matrix | `GET /v1/table/{จุด}` | ยิงครั้งเดียวได้ทุกคู่ (`sources` / `destinations`) |
| Geocoding API | `GET /v1/geocode?q=` | ชื่อไทย/ลาว/อังกฤษ · `focus=lng,lat` เรียงใกล้ก่อน |
| Places Autocomplete | `GET /v1/autocomplete?q=&session=` | 1 session = 1 หน่วย |
| Reverse Geocoding | `GET /v1/reverse?point=lng,lat` | สถานที่ใกล้พิกัด ≤ 500 ม. + จังหวัด |
| Roads API (snap to road) | `GET /v1/nearest/{lng,lat}` | จุดบนถนนที่ใกล้ที่สุด |

## ก่อน → หลัง (แผนที่ในหน้าเว็บ)

```js
// Google Maps
const map = new google.maps.Map(document.getElementById('map'), {
  center: { lat: 13.7457, lng: 100.5341 }, zoom: 13,
});
new google.maps.Marker({ position: { lat: 13.7467, lng: 100.5349 }, map });
```

```js
// RRevX + MapLibre
const map = new maplibregl.Map({
  container: 'map',
  style: 'https://api.rrevx.com/v1/styles/liberty.json?key=rx_pub_YOUR_KEY',
  center: [100.5341, 13.7457], zoom: 13,            // [lng, lat]
});
new maplibregl.Marker().setLngLat([100.5349, 13.7467]).addTo(map);
```

## ยังไม่มี (ต.ค. 2569)

ภาพดาวเทียม · Street View · จราจรสด · รีวิว/รูป/เวลาเปิดปิดของสถานที่ — ถ้าแอปต้องใช้ส่วนเหล่านี้ ใช้ Google เฉพาะส่วนนั้น แล้วย้ายแผนที่/เส้นทาง/ค้นหามาที่ RRevX เพื่อลดบิล

ช่วงเปิดตัว ทีมงานช่วยย้ายให้ฟรี: https://rrevx.com/maps?utm_source=github&utm_medium=readme&utm_campaign=maps_launch#launch
