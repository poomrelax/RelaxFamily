import React, { useState, useEffect, useRef } from 'react'
import qrcodestyle from './QrCode.module.css'
import { useParams } from 'react-router-dom'


function QrCode() {

  const { name, email } = useParams()

    const videoRef = useRef(null);
    const [scannedResult, setScannedResult] = useState('');

    const text= ["โดนแฮกแล้ว", "โดนเจาะแล้ว", "โดนเล่นแล้ว"]
    const index = Math.floor(Math.random() * text.length)
   
  return (
    <>
    <div className={qrcodestyle.container}>
      <div className={qrcodestyle.content}>
          <h3 style={{color: '#fff'}}>อีเมล <b>{email}</b>   ของ <b>{name}</b></h3>
        <div className={qrcodestyle.text}>
            <h2>{text[index]} อิอิ😁</h2>
        </div>
        <p style={{color: '#fff', fontSize: '10px', textAlign: 'center', marginTop: '5rem', opacity: '0'}}>หยอกๆนะ</p>
      </div>
    </div>
    </>
  )
}

export default QrCode