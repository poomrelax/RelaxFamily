import React, { useState, useEffect } from 'react'
import order from './order.module.css'
import { RiUserSettingsLine } from "react-icons/ri";
import { MdFamilyRestroom } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa6";
import { IoBookOutline } from "react-icons/io5";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { FaHistory } from "react-icons/fa";

function Order() {

  const navigate = useNavigate()

  const url = 'https://homework-api-9ftf.onrender.com/mainhomework/'


  return (
    <>
      <div className={order.container}>
        <div className={order.content} >
        {/* <button onClick={() => navigate('/homework')}><RiArrowGoBackFill /></button> */}
          <div className={order.item} onClick={() => navigate('/homework')}>การบ้าน  <IoBookOutline/></div>
          <div className={order.item} onClick={() => navigate('/settinguser')}>จัดการบัญชี  <RiUserSettingsLine /></div>
          <div className={order.item} onClick={() => alert('ฟีเจอร์นี้ยังไม่เปิดให้ใช้งาน😥')}>จัดการสมาชิค ครอบครัว  <MdFamilyRestroom /></div>
          <div className={order.item} onClick={() => navigate('/record')}>ประวัติ การบ้าน  <FaHistory/> </div>
          <div className={order.item} style={{color: 'red'}} onClick={() => {localStorage.removeItem('loginhomework'); navigate('/login')}}>ออกจากระบบ  <FaPowerOff /></div>
        </div>
      </div>
    </>
  )
}

export default Order