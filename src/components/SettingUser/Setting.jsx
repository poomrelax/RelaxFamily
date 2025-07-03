import React, { useState, useEffect } from 'react'
import SettingUser from './Setting.module.css'
import Nav from '../Nav/Nav'
import PulseLoader from "react-spinners/PulseLoader";
import { RiUserSettingsLine } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import env from '../../../url_data.json'

function Setting() {

    const[loadding, setloading] = useState(false)
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [checkbox, setcheckbox] = useState(false)

    const id =  JSON.parse(localStorage.getItem('loginhomework'))

    const url = env.url_api + 'mainhomework/'

    

    async function fetuser() {
        await axios.post(url + 'user/' + id.id)
            .then(res => {
                console.log(res.data)
                setusername(res.data.useradmin)
                setpassword(res.data.passwordAdmin)
            })
    }

    async function updateuser() {

        const data = {
            username: username,
            password: password
        }

        await axios.put(url + 'user/' + id.id, data)
            .then(r => {
                toast.success('อัพเดท สำเร็จ')
            })
    }

    useEffect(() => {
        fetuser()
        // console.log(id.id)
    }, [])

  return (
    <>
    
    {loadding ? (
        <>
            <div className={SettingUser.loadding}>
                <h2>Loadding...</h2>
                <PulseLoader color='#fff' style={{marginTop: 30}}/>
            </div>
        </>
    ) : (
        <>
            <Nav/>
            <ToastContainer/>
            <div className={SettingUser.container}>
                <div className={SettingUser.content}>
                    <h2>จัดการบัญชี  <RiUserSettingsLine/></h2>
                    <div className={SettingUser.item}>
                        <p>Username</p>
                        <input type="text" value={username} onChange={(e) => setusername(e.target.value)} placeholder='Username'/>
                    </div>
                    <div className={SettingUser.item}>
                        <p>Password</p>
                        <input id='password' type={checkbox ? 'text' : 'password'} value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Password'/>
                    </div>
                    <div className={SettingUser.checkbox}>
                        <input type="checkbox" id='checkbox' checked={checkbox} onChange={() => setcheckbox(!checkbox)}/>
                        <p>แสดงรหัสผ่าน</p>
                    </div>
                    <button onClick={updateuser}>UPDATE</button>
                </div>
            </div>
        </>
    )}
    </>
  )
}

export default Setting