// RRevX Maps API บน Flutter ด้วย maplibre_gl (Android / iOS / Web)
// pubspec.yaml:  maplibre_gl: ^0.27.1
//
// แอปมือถือ: สร้างคีย์เว็บ rx_pub_… ผูกโดเมนของคุณ แล้วส่ง header Referer ของโดเมนนั้น
// หรือดึง URL ของ style ผ่านเซิร์ฟเวอร์ของคุณที่ถือคีย์ rx_sec_… (ดู https://rrevx.com/maps/docs#keys)
// ใส่คีย์ตอน build:  flutter run --dart-define=RRX_KEY=rx_pub_xxx
import 'package:flutter/material.dart';
import 'package:maplibre_gl/maplibre_gl.dart';

const rrxKey = String.fromEnvironment('RRX_KEY');

void main() => runApp(const MaterialApp(home: MapPage()));

class MapPage extends StatelessWidget {
  const MapPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('RRevX Maps')),
      body: MapLibreMap(
        // 1 ครั้งโหลด style = 1 ครั้งเปิดแผนที่ · tiles ไม่คิดเงิน
        styleString: 'https://api.rrevx.com/v1/styles/liberty.json?key=$rrxKey',
        initialCameraPosition: const CameraPosition(
          target: LatLng(13.7457, 100.5341), // สยาม กรุงเทพฯ
          zoom: 13,
        ),
        myLocationEnabled: false,
      ),
    );
  }
}
