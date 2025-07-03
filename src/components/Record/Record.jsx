import React, { useState, useEffect } from 'react'
import recordStyle from './Record.module.css'
import { IoBookOutline } from "react-icons/io5";
import { Mosaic } from 'react-loading-indicators';
import axios from 'axios';
import env from '../../../url_data.json'
import Nav from '../Nav/Nav';

function Record() {

    const [loadding, setLoadding] = useState(true)

    const user_date = JSON.parse(localStorage.getItem('loginhomework'))

    async function fetdata() {
        await axios.get(env.url_api + "mainhomework/record/" + user_date.id).then(res => {
            console.log(res.data)
            setLoadding(false)
        })
    }

    useEffect(() => {
        fetdata()
    }, [])

  return (
    <>
    <Nav/>
    {loadding && (
       <>
        <div className={recordStyle.loadding}>
            <Mosaic color="#28ee2d" size="medium" text="Loadding" textColor="#ffffff" />
        </div>
       </>
    )}
    <div className={recordStyle.container}>
        <div className={recordStyle.content}>
            <h1>ประวัติการบ้าน <IoBookOutline/></h1>
            <table>
                <thead>
                    <tr>
                        <th>วิชา</th>
                        <th>รายละเอียด</th>
                        <th>วันที่</th>
                        <th>ลบ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    </>
  )
}

export default Record