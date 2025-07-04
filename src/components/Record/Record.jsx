import React, { useState, useEffect } from 'react'
import recordStyle from './Record.module.css'
import { IoBookOutline } from "react-icons/io5";
import { Mosaic } from 'react-loading-indicators';
import axios from 'axios';
import env from '../../../url_data.json'
import Nav from '../Nav/Nav';
import { ToastContainer, toast } from 'react-toastify';

function Record() {

    const [loadding, setLoadding] = useState(true)
    const [data, setdata] = useState([])

    const user_date = JSON.parse(localStorage.getItem('loginhomework'))

    async function fetdata() {
        // await axios.get(env.url_api + "mainhomework/record/" + user_date.id).then(res => {
            // console.log(res.data)
            // setdata(res.data)
            // setLoadding(false)
        // })

        const record_data = await axios.get(env.url_api + "mainhomework/record/" + user_date.id)
        const res = record_data.data.sort((a, b) =>{
            new Date(b.createdAt) - new Date(a.createdAt)
        })

        console.log(res)
        setdata(res)
        setLoadding(false)
    }

    async function deleteHomework(id) {
        await axios.delete(env.url_api + "mainhomework/record/" + user_date.id + "/" + id).then(res => {
            console.log(res.data)
            fetdata()
            toast.success('ลบสำเร็จ')
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
    <ToastContainer style={{marginTop: '4rem'}}/>
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
                    {data.map((record) => {
                        return(
                            <>
                                <tr>
                                    <td>{record.subject}</td>
                                    <td>{record.desc}</td>
                                    <td>{record.date}</td>
                                    <td><button onClick={() => {deleteHomework(record.id)}}>ลบ</button></td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
    </>
  )
}

export default Record