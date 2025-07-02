import React, { useState, useEffect } from 'react'
import order from './order.module.css'
import { RiUserSettingsLine } from "react-icons/ri";
import { MdFamilyRestroom } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa6";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';

function Order() {

  const navigate = useNavigate()

  const url = 'https://homework-api-9ftf.onrender.com/mainhomework/'


  return (
    <>
      <div className={order.container}>
        <div className={order.content} >
        <button onClick={() => navigate('/homework')}><RiArrowGoBackFill /></button>
          <div className={order.item} onClick={() => navigate('/settinguser')}>จัดการบัญชี  <RiUserSettingsLine /></div>
          <div className={order.item} onClick={() => navigate('/family')}>จัดการสมาชิค ครอบครัว  <MdFamilyRestroom /></div>
          <div className={order.item} style={{color: 'red'}} onClick={() => {localStorage.removeItem('loginhomework'); navigate('/login')}}>ออกจากระบบ  <FaPowerOff /></div>
        </div>
      </div>
    </>
  )
}

export default Order