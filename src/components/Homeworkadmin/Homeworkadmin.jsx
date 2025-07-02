import "./Homeworkadmin.css"
import React, { useEffect, useState } from 'react'
import Nav from "../Nav/Nav";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import axios from "axios";
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Popup from "./popup";

function Homeworkadmin() {
    const [loading, setloading] = useState(true);
    const [homework, setitems] = useState([])
    const [subject, setsubject] = useState("")
    const [other, setother] = useState("")
    const [desc, setdetall] = useState("")
    const [popup, setpopup] = useState(false)
    const [deletloadding, setdeletloadding] = useState(false)
    const loginhomework = JSON.parse(localStorage.getItem("loginhomework"))
    const navigator = useNavigate();
 


    // if(loginhomework != "poom") {
    //   navigator("/homework")
    // }

  const url = 'https://homework-api-9ftf.onrender.com/'

  if(!loginhomework) {
    navigator('/login')
  }else if(loginhomework.user === "family") {
    navigator('/homework')
  }

    const fetchhomework = async () => {
      
        try{
            await axios.get(url + 'mainhomework/homework/' + loginhomework.id)
            .then(res => {
                setitems(res.data);
                console.log(res.data)
            })
        }
  
        catch(e){
          console.log(e)
        }
  
        finally{
          setloading(false)
        }
  
      }

      window.onload = () => {
        const other_id = window.document.getElementById('other_id')
        alert("success")
      }

      function checkselect(text) {
        console.log(text)
        if(text == 'other') {
          other_id.style.display = 'grid'
        }else{
          other_id.style.display = 'none'
          setsubject(text)
        }
      }

  
  

       const selecthomework = [
        {value: 'คณิตศาสตร์', label: 'คณิตศาสตร์'},
        {value: 'ฟิสิกส์', label: 'ฟิสิกส์'},
        {value: 'ชีววิทยา', label: 'ชีววิทยา'},
        {value: 'เคมี', label: 'เคมี'},
        {value: 'สังคมศึกษา', label: 'สังคมศึกษา'},
        {value: 'คณิตศาสตร์', label: 'คณิตศาสตร์'},
        {value: 'อังกฤษ', label: 'อังกฤษ'},
        {value: 'ชุมนุม', label: 'ชุมนุม'},
        {value: 'วิทพลัง10', label: 'วิทพลัง10'},
        {value: 'พละ', label: 'พละ'},
        {value: 'ภาษาไทย', label: 'ภาษาไทย'},
        {value: 'อังกฤษเสริม', label: 'อังกฤษเสริม'},
        {value: 'ประวัติศาสตร์', label: 'ประวัติศาสตร์'},
        {value: 'คณิตศาสตร์เสริม', label: 'คณิตศาสตร์เสริม'},
        {value: 'วิทยาการคำนวณ', label: 'วิทยาการคำนวณ'},
        {value: 'IS', label: 'IS'},
        {value: 'other', label: 'อื่นๆ...'},

    ]

    async function submit(e) {
      e.preventDefault()
      if(subject === "") {
        toast.error("กรุณาเลือกวิชา")
      }else if(desc === "") {
        toast.error("กรุณาใส่เรื่อง")
      }else{
        try{
          await axios.post(url + 'mainhomework/homework/' + loginhomework.id, {subject, desc})
          setpopup(false)
          toast.success("เพิ่มการบ้านแล้ว")
          fetchhomework()
          // console.log(subject + ' ' + desc)
      }

      catch(e){
        console.log(e)
      }

     
      }
    } 

    async function deletetag(idUser ,idHomework) {

      // console.log(idUser)
      // console.log(idHomework)

      try{
        setdeletloadding(true)
        await axios.delete(url + 'mainhomework/homework/' + idUser + '/' + idHomework)
      }
    
      catch(err) {
        console.log(err)
      }
    
      finally{
        fetchhomework()
        setdeletloadding(false)
      }
    }

    useEffect(() => {
      fetchhomework();
      // const other_id = window.document.getElementById('other_id')
      // if(other_id) {
      //   console.log("success")
      // }else{
      //   console.log(" no success")

      // }
  }, [])

  return (
    <>
    {loading ? (
        <>
      <div className="loader">
        <h2 style={{color : "#fff"}}>Loading...</h2>
        <ClimbingBoxLoader color={"#36d7b7"} loading={loading} size={20} />
      </div>
      </>
    ) : (
      <>
         <Nav/>
        <ToastContainer style={{marginTop: "4rem"}}/>
         <div className="containeradmin">
        {homework.map((work) => {
            return(
              <>
                <div className="card">
                  <div className="box">
                    <h3>{work.subject}</h3>
                    <h5>{work.name}</h5>
                    <p>{work.desc}</p>
                    <h4>{work.date}</h4>
                    <div className="btn">
                    {deletloadding ? (
                        <>
                           <button className='btn-loadding'>Loadding....</button>
                        </>
                       ) : (
                        <> 
                          <button className='btn-delet' onClick={() => deletetag(loginhomework.id, work.id)}>finished</button>
                        </>
                      )} 
                    </div>
                    </div>
                  </div>
                 
              </>
            )
        })}
        <from onSubmit={submit}>
         <div className="popupcontent">
                <Popup trigger={popup} settrigger={setpopup}>
                    <div className="input-form">
                      <label>Subject</label>
                      <Select onChange={(e) => checkselect(e.value)} options={selecthomework} styles={Select}/>
                    </div>
                    <div className="input-form" id="other_id" style={{display: 'none'}}>
                      <label>อื่นๆ</label>
                     <input type="text" placeholder="อื่นๆ" onChange={(e) => setsubject(e.target.value)}/>
                    </div>
                    <div className="input-form">
                      <label>Detall</label>
                     <input type="text" placeholder="Detall" onChange={(e) => setdetall(e.target.value)}/>
                    </div>
                      <button type="submit" onClick={submit} className="btn-submit">SUBMIT</button>
                </Popup>
            </div>
            </from>

            <div className="popup" onClick={() => setpopup(true)}>+</div>
        </div>
    
      </>
    ) }
    </>
  )
}

export default Homeworkadmin