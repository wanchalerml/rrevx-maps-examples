# RRevX Maps API — ตัวอย่างโค้ด

แผนที่ + เส้นทาง + ค้นหาสถานที่ สำหรับแอปใน **ไทยและลาว** ในราคาประมาณครึ่งหนึ่งของ Google Maps Platform
จ่ายเป็นบาท ราคารวม VAT มีใบกำกับภาษี · **ฟรีทุกเดือน**: เปิดแผนที่ 10,000 + เส้นทาง 10,000 + ค้นหาสถานที่ 10,000 ครั้ง ไม่ต้องใส่บัตร

🌐 [rrevx.com/maps](https://rrevx.com/maps?utm_source=github&utm_medium=readme&utm_campaign=maps_launch) · 📘 [เอกสาร API](https://rrevx.com/maps/docs?utm_source=github&utm_medium=readme&utm_campaign=maps_launch) · 🔑 [สร้างคีย์ฟรี](https://rrevx.com/maps/console?utm_source=github&utm_medium=readme&utm_campaign=maps_launch) · 🧮 [คำนวณว่าย้ายจาก Google ประหยัดเท่าไร](https://rrevx.com/maps?utm_source=github&utm_medium=readme&utm_campaign=maps_launch#calc)

## ตัวอย่างในนี้

| ไฟล์ | ทำอะไร | คีย์ที่ใช้ |
|---|---|---|
| [`web/maplibre.html`](web/maplibre.html) | แผนที่ + คลิก 2 จุดหาเส้นทาง + ช่องค้นหาขณะพิมพ์ (ไฟล์เดียว) | `rx_pub_` (เว็บ) |
| [`web/leaflet.html`](web/leaflet.html) | ใช้กับเว็บที่เป็น Leaflet อยู่แล้ว เปลี่ยนแค่แผนที่พื้นหลัง | `rx_pub_` (เว็บ) |
| [`node/delivery-fee.mjs`](node/delivery-fee.mjs) | คิดค่าส่งตามระยะถนนจริง + หาคนขับที่ไปถึงเร็วที่สุด (`/table`) | `rx_sec_` (เซิร์ฟเวอร์) |
| [`python/places_route.py`](python/places_route.py) | ค้นหาสถานที่ → เส้นทาง → สถานที่ใกล้พิกัด | `rx_sec_` (เซิร์ฟเวอร์) |
| [`flutter/lib/main.dart`](flutter/lib/main.dart) | แผนที่ในแอปมือถือด้วย `maplibre_gl` | ดูหมายเหตุในไฟล์ |
| [`curl.sh`](curl.sh) | ทุก endpoint ด้วย curl | `rx_sec_` (เซิร์ฟเวอร์) |
| [`MIGRATE-FROM-GOOGLE.md`](MIGRATE-FROM-GOOGLE.md) | เทียบ API ของ Google กับ RRevX + โค้ดก่อน/หลัง | — |

## เริ่มใน 3 ขั้น

1. สร้างบัญชีและคีย์ที่ [คอนโซล](https://rrevx.com/maps/console?utm_source=github&utm_medium=readme&utm_campaign=maps_launch)
   - **เว็บ `rx_pub_…`** ผูกโดเมน (ใส่ `localhost` ตอนทดสอบ) ใส่ในหน้าเว็บได้
   - **เซิร์ฟเวอร์ `rx_sec_…`** ใช้ใน backend/สคริปต์เท่านั้น ห้ามใส่ในหน้าเว็บหรือแอป
2. ตัวอย่างเว็บ: แก้ `KEY` ในไฟล์ แล้วเปิดผ่าน http://localhost (เช่น `npx serve web`)
3. ตัวอย่าง server: `RRX_KEY=rx_sec_xxx node node/delivery-fee.mjs` หรือ `RRX_KEY=rx_sec_xxx python python/places_route.py`

**ห้าม commit คีย์จริงขึ้น GitHub** — ใช้ตัวแปรแวดล้อม (ดู `.env.example`) ถ้าคีย์หลุด ยกเลิกได้ที่คอนโซล หยุดทำงานภายใน 1 นาที

## Endpoint

| | Endpoint | นับเป็น |
|---|---|---|
| แผนที่ | `GET /v1/styles/liberty.json` (+ tiles ที่ style ชี้) | 1 ครั้งเปิดแผนที่ (tiles ไม่คิด) |
| เส้นทาง | `GET /v1/route/{lng,lat;lng,lat;…}` (รูปแบบ OSRM) | 1 เส้นทาง |
| ตารางระยะ | `GET /v1/table/{จุด}` | ต้นทาง × ปลายทาง หน่วย |
| จุดบนถนน | `GET /v1/nearest/{lng,lat}` | 1 เส้นทาง |
| ค้นหา | `GET /v1/geocode?q=` · `/v1/autocomplete?q=&session=` · `/v1/reverse?point=` | 1 ครั้ง / 1 session |

รายละเอียด, parameter, รหัส error: https://rrevx.com/maps/docs

## เครดิตที่ต้องแสดง

- แผนที่: © OpenMapTiles © OpenStreetMap contributors (MapLibre แสดงให้เองจาก style — อย่าซ่อน AttributionControl)
- เส้นทาง: © OpenStreetMap contributors
- ค้นหาสถานที่: Places © Overture Maps Foundation (Meta, Microsoft, Foursquare, AllThePlaces)

## ต้องการให้ช่วย

- ช่วงเปิดตัว ทีมงานช่วยย้ายจาก Google Maps ให้ฟรี และมีส่วนลดสำหรับลูกค้ารายแรก — ดู [ข้อเสนอปัจจุบัน](https://rrevx.com/maps?utm_source=github&utm_medium=readme&utm_campaign=maps_launch#launch)
- รับสร้างแพลตฟอร์มเรียกรถ / ส่งของ / ติดตามรถ เป็นแบรนด์ของคุณ — [คุยกับทีมงาน](https://rrevx.com/maps?utm_source=github&utm_medium=readme&utm_campaign=maps_launch#contact)
- เจอปัญหาในตัวอย่าง เปิด Issue ในนี้ได้เลย

---

## English

Map tiles, driving routes, distance matrix and place search (Thai, Lao, English) for apps in **Thailand and Laos**, at about half of Google Maps Platform's list price. Billed in THB with a Thai tax invoice. **Free every month**: 10,000 map loads + 10,000 routes + 10,000 place searches, no card needed.

Get a key at [rrevx.com/maps/console](https://rrevx.com/maps/console?utm_source=github&utm_medium=readme&utm_campaign=maps_launch), then open `web/maplibre.html` or run the Node/Python examples with `RRX_KEY=rx_sec_…`. API reference: [rrevx.com/maps/docs](https://rrevx.com/maps/docs). Routing responses follow the OSRM format, so most OSRM clients work unchanged.

Not available (yet): satellite imagery, Street View, live traffic.

## License

The example code in this repository is MIT licensed (see [LICENSE](LICENSE)). Using the API itself is subject to the [RRevX Maps API terms](https://rrevx.com/maps/terms); map and place data keep their own licenses (OpenStreetMap ODbL, Overture Maps).
