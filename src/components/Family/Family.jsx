import React, { useState, useEffect } from 'react'
import FamilyStyle from './Family.module.css'
import Nav from '../Nav/Nav'
import { RiUserSettingsLine } from "react-icons/ri";
import HashLoader from "react-spinners/HashLoader";
import { v4 as uuid } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate, useParams, BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

function Family() {

    const [Data, setData] = useState([])
    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")
    const [loadding, setloadding] = useState(true)

    const navigate = useNavigate()
    const loginhomework = JSON.parse(localStorage.getItem('loginhomework'))

    const url = 'https://homework-api-9ftf.onrender.com/'

    async function fetfamily() {
        setloadding(true)
        await axios.post(url + "mainhomework/user/" + loginhomework.id)
            .then(r => {
                setData(r.data.family)
                // console.log(r.data)
                setloadding(false)
            })
    }

    async function remove(id) {
        const removeFamily = Data.filter((item) => item.id !== id)
        setData(removeFamily)
        // const data = {
        //     id: id
        // }

        
        // // console.log(data.id)
        // await axios.delete(url + "mainhomework/family/" + loginhomework.id, data).then(r => {
        //     console.log(r)
        //     fetfamily()
        // })
    }

    async function addFamily(e) {
        e.preventDefault()

        const familyObject = {
            id: uuid(),
            username: Username,
            password: Password
        }

        setData(Data => [familyObject, ...Data])

        setUsername("")
        setPassword("")

        // const data = {
        //     username: Username,
        //     password: Password
        // }
        // await axios.post(url + "mainhomework/family/" + loginhomework.id, data).then(r => {
        //     console.log(r)
        //     fetfamily()
        // })
    }

    async function submit() {
         await axios.put(url + 'mainhomework/family/' + loginhomework.id, Data).then(r => {
                toast.success('Update Success')
                fetfamily()
            })
    }

    async function btn_control(e) {
        if(e == 'cancel') {
           location.reload()
        }else if(e == 'update') {
            submit()
        }
    }

    useEffect(() => {
        fetfamily()
    }, [])



    return (
        <>
        <Nav/>
        <ToastContainer style={{marginTop: '5rem'}}/>
        {loadding ? (
            <>
                <div className={FamilyStyle.loadding}>
                    <HashLoader/>
                </div>
            </>
        ) : (
            <>
            <div className={FamilyStyle.container}>
                <div className={FamilyStyle.content}>
                    <h2>Family</h2>
                   <form action="" onSubmit={addFamily}>
                     <div className={FamilyStyle.AddContent}>
                        <div className={FamilyStyle.Add}>
                            <input value={Username} type="text" onChange={(e) => setUsername(e.target.value)} placeholder='Username'/>
                            <input value={Password} type="text" onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
                        </div>
                        <button type='submit'>+</button>
                    </div>
                   </form>
                    <div className={FamilyStyle.form}>
                            {Data.map((data, index) => {
                                return(
                                    <>
                                    <div className={FamilyStyle.input}>
                                        <p>{data.username}</p>
                                        <p>{data.password}</p>
                                        <button onClick={() => remove(data.id)}>ลบ</button>
                                    </div>
                                        <div className={FamilyStyle.border}></div>
                                    </>
                                )
                            })}
                            {/* <button onClick={() => console.log(Data)}>click</button> */}
                    </div>
                   <div className={FamilyStyle.btn} id="btn">
                        <button onClick={() => btn_control('cancel')}>cancel</button>
                        <button onClick={() => btn_control('update')}>update</button>
                   </div>
                </div>
            </div>
            </>
        ) }
        </>
    )
}

export default Family
