import React, { useState, useEffect, useRef } from 'react'
import qrcodestyle from './QrCode.module.css'
import QrScanner from 'qr-scanner';
import QRCode from 'react-qr-code';


function QrCode() {

    const videoRef = useRef(null);
    const [scannedResult, setScannedResult] = useState('');

    const text = "hello World"

    const handleScan = (data) => {
        if (data) {
          setScannedResult(data);
        }
      };

    const handleError = (err) => {
        console.error(err);
    };

    useEffect(() => {
          // สร้าง QR Scanner และเชื่อมต่อกับ videoRef
    const scanner = new QrScanner(videoRef.current, (result) => {
        // เมื่อสแกน QR Code สำเร็จ
        setScannedResult(result);
      });
  
      // เริ่มต้นการสแกน
      scanner.start();
  
      // Clean up เมื่อ component ถูกทำลาย
      return () => {
        scanner.stop();
      };
    }, [])
    
  return (
    <>
        <h1>QR CODE</h1>
        <div className="" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {/* <QRCode value={text}/> */}
            <video ref={videoRef} style={{ width: '100%' }} />
        </div>
    </>
  )
}

export default QrCode