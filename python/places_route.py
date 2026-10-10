"""RRevX Maps API (Python 3.9+) — ค้นหาสถานที่ → เส้นทาง → หาที่อยู่จากพิกัด

    pip install requests
    RRX_KEY=rx_sec_xxx python places_route.py

ใช้คีย์เซิร์ฟเวอร์ rx_sec_… (ห้ามใส่คีย์ในโค้ด) · เอกสาร: https://rrevx.com/maps/docs
"""
import os
import sys

import requests

API = "https://api.rrevx.com/v1"
KEY = os.environ.get("RRX_KEY")
if not KEY:
    sys.exit("ตั้งค่า RRX_KEY=rx_sec_… ก่อน")


def get(path, **params):
    r = requests.get(API + path, params={**params, "key": KEY}, timeout=10)
    data = r.json()
    if r.status_code != 200:
        raise RuntimeError(f"{r.status_code} {data.get('error') or data.get('code')}")
    return data


def find(q, **kw):
    """ค้นหาสถานที่ (ไทย/ลาว/อังกฤษ เข้าใจตัวย่อ รพ. / BTS) → ผลแรก"""
    res = get("/geocode", q=q, limit=1, **kw)
    if not res["results"]:
        raise LookupError(f"ไม่พบ: {q}")
    return res["results"][0]


a = find("สยามพารากอน")
b = find("สนามบินดอนเมือง", focus=f"{a['lng']},{a['lat']}")
print(f"{a['name']} → {b['name']}")

r = get(f"/route/{a['lng']},{a['lat']};{b['lng']},{b['lat']}", overview="false")
if r["code"] == "Ok":
    route = r["routes"][0]
    print(f"ระยะทาง {route['distance'] / 1000:.1f} กม. · ประมาณ {route['duration'] / 60:.0f} นาที")

# หาสถานที่ใกล้พิกัด (เช่นตำแหน่ง GPS ของผู้ใช้)
near = get("/reverse", point="100.5349,13.7465", limit=3)
for p in near["results"]:
    print("ใกล้ ๆ:", p["name"], f"{p.get('distance_m', '?')} ม.")

# แสดงเครดิตนี้ในแอปที่แสดงผลค้นหา
print(near.get("attribution", ""))
