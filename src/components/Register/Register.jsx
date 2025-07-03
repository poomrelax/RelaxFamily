import React, { useState, useEffect } from 'react'
import register from './Register.module.css'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import FadeLoader from "react-spinners/FadeLoader";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import env from '../../../url_data.json'


function Register() {

    const navigate = useNavigate()

    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")
    const [DataFamily, setDataFamily] = useState([])
    const [Task, setTask] = useState("")
    const [TaskPassword, setTaskPassword] = useState("")
    const [submitLodding, setsubmitLodding] = useState(false)
    const [IdCreat, setIdCreat] = useState("")

     const url = env.url_api

    // console.log(IdCreat)



    async function submit(select) {
        const id = ""
        if(select === "user") {
                setsubmitLodding(true)
            if(Username === "" || Username === null) {
                toast.warning("กรุณาใส่ username");
                setsubmitLodding(false)
            }else  if(Password === "" || Password === null) {
                toast.warning("กรุณาใส่ Password");
                setsubmitLodding(false)
            }else{

                const data = {
                    useradmin: Username,
                    passwordAdmin: Password
                }

                const adduser = document.getElementById('adduser');
                const addFamily = document.getElementById('addFamily');

                await axios.post(url + 'mainhomework/create', data).then((res) => {
                    setIdCreat(res.data.id)
                    toast.success("success")
                    // adduser.style.display = 'none'
                    // addFamily.style.display = 'block'
                    navigate('/login')
                    setsubmitLodding(false)
                    // console.log(id)
                })

               
                // setsubmitLodding(false)
                // adduser.style.display = 'none'
                // addFamily.style.display = 'block'
                
            }
        }else if(select === "family") {
            setsubmitLodding(true)
            await DataFamily.map((data, index) => {
                // console.log(data.username + data.password + " " + index)
                const datapost = {
                    username: data.username,
                    password: data.password
                }

               axios.post(url + 'mainhomework/family/' + IdCreat, datapost)
                    .then(res => {
                        // console.log('success')
                        if(DataFamily.length === index + 1) {
                            toast.success("สมัครสามชิค สำเร็จ")
                            setTimeout(() => {
                                navigate('/login')
                                setsubmitLodding(false)
                            }, 2000)
                        }
                        // toast.success("add " + data.username + " " + "success")
                    })
            })
            // console.log(DataFamily)
        }
    }

    async function addFamily() {
        const data = {
            id: uuidv4(),
            username: Task,
            password: TaskPassword
        }

        await setDataFamily([...DataFamily, data])
        setTask("")
        setTaskPassword("")
        console.log(DataFamily)
    }

    const removeFamily = (id) => {
        const removeFamily = DataFamily.filter((item) => item.id !== id)
        setDataFamily(removeFamily)
        console.log(DataFamily)
    }





  return (
    <>
        <ToastContainer/>
        <div className={register.container}>
            <div className={register.content} id="adduser">
                <h3>สมัครสมาชิค</h3>
                <div className={register.from}>
                    <div>
                        <div className={register.input}>
                            <p>username</p>
                            <input type="text" placeholder='Username' value={Username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className={register.input}>
                            <p>password</p>
                            <input type="password" placeholder='Password' value={Password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                        {submitLodding ? (
                            <>
                                <div style={{background: '#ccc', width: '100%', display: 'flex', justifyContent: 'center', fontSize: '10px', borderRadius: '5px', padding: '5px', marginTop: '1rem'}}><FadeLoader color={"#000"} loading={submitLodding}  /></div>
                            </>
                        ): (
                            <>
                                <button onClick={() => submit("user")} className={register.btn_submit}>NEXT</button>
                            </>
                        )}
                </div>
            </div>
            <div className={register.addFamily} id="addFamily">
                <h3>Add Family / ผู้ปกครอง</h3>
            <div className={register.selectFamily}>
                <p>family</p>
                    <div className={register.add}>
                        <div className={register.userfamily}>
                            <input type="text" value={Task} onChange={(e) => setTask(e.target.value)} placeholder='Username'/>
                            <input type="password" value={TaskPassword} onChange={(e) => setTaskPassword(e.target.value)} placeholder='Password'/>
                        </div>
                            <button onClick={addFamily}>+</button>
                    </div>
                        <div className={register.data}>
                            {DataFamily.map(user => {
                                return (
                                    <>
                                        <div className={register.listFamily}>
                                             <p>{user.username}</p>
                                            <p>{user.password}</p>
                                             <button onClick={() => removeFamily(user.id)}>ลบ</button>
                                        </div>
                                     </>
                                    )
                                })}
                            </div>
                        </div>
                        {submitLodding ? (
                            <>
                                <div style={{background: '#ccc', width: '100%', display: 'flex', justifyContent: 'center', fontSize: '10px', borderRadius: '5px', padding: '5px', marginTop: '1rem'}}><FadeLoader color={"#000"} loading={submitLodding}  /></div>
                            </>
                        ): (
                            <>
                                <button onClick={() => submit("family")} className={register.btn_submit}>Submit</button>
                            </>
                        )}
            </div>
        </div>
    </>
  )
}

export default Register