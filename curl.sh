#!/usr/bin/env sh
# RRevX Maps API — ทุก endpoint ด้วย curl
#   RRX_KEY=rx_sec_xxx sh curl.sh
# เอกสาร: https://rrevx.com/maps/docs
: "${RRX_KEY:?ตั้งค่า RRX_KEY=rx_sec_… ก่อน}"
API=https://api.rrevx.com/v1

echo "# เส้นทาง สยาม → พัทยา"
curl -s "$API/route/100.5341,13.7457;100.8825,12.9236?overview=false&exclude=ferry&key=$RRX_KEY"; echo

echo "# ตารางระยะ 3 จุด → 1 จุด"
curl -s "$API/table/100.53,13.74;100.56,13.75;100.50,13.73;100.5341,13.7457?sources=0;1;2&destinations=3&annotations=duration,distance&key=$RRX_KEY"; echo

echo "# จุดบนถนนที่ใกล้ที่สุด"
curl -s "$API/nearest/100.5341,13.7457?number=1&key=$RRX_KEY"; echo

echo "# ค้นหาสถานที่"
curl -s -G "$API/geocode" --data-urlencode "q=รพ.รามาธิบดี" --data "limit=3&key=$RRX_KEY"; echo

echo "# สถานที่ใกล้พิกัด"
curl -s "$API/reverse?point=100.5349,13.7465&limit=3&key=$RRX_KEY"; echo
