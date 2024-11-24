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
    const [desc, setdetall] = useState("")
    const [popup, setpopup] = useState(false)
    const [deletloadding, setdeletloadding] = useState(false)
    const loginhomework = localStorage.getItem("loginhomework")
    const navigator = useNavigate();


    if(loginhomework != "poom") {
      navigator("/homework")
    }

    const fetchhomework = async () => {
      
        try{
            await axios.get('https://node-api-production-95c1.up.railway.app/homework')
            .then(res => {
                setitems(res.data);
                console.log(res)
            })
        }
  
        catch(e){
          console.log(e)
        }
  
        finally{
          setloading(false)
        }
  
      }

  
  

       const selecthomework = [
        {value: 'คณิตศาสตร์', label: 'คณิตศาสตร์'},
        {value: 'ภาษาอังกฤษ', label: 'ภาษาอังกฤษ'},
        {value: 'การงานอาชีพ', label: 'การงานอาชีพ'},
        {value: 'สังคมศึกษา', label: 'สังคมศึกษา'},
        {value: 'ภาษาไทย', label: 'ภาษาไทย'},
        {value: 'กิจกรรมชุมนุม', label: 'กิจกรรมชุมนุม'},
        {value: 'พละศึกษา', label: 'พละศึกษา'},
        {value: 'กิจกรรมแนะแนว', label: 'กิจกรรมแนะแนว'},
        {value: 'ภาษาอังกฤษ เพิ่มเติม', label: 'ภาษาอังกฤษ เพิ่มเติม'},
        {value: 'วิทยาศาสตร์การคำนวณ', label: 'วิทยาศาสตร์การคำนวณ'},
        {value: 'อบรมระดับ', label: 'อบรมระดับ'},
        {value: 'เพิ่มเติม 1', label: 'เพิ่มเติม 1'},
        {value: 'เพิ่มเติม 2', label: 'เพิ่มเติม 2'},
        {value: 'กิจกรรม ลูกเสือ', label: 'กิจกรรม ลูกเสือ'},
        {value: 'ประวัติศาสตร์', label: 'ประวัติศาสตร์'},
        {value: 'ดนตรี', label: 'ดนตรี'},
        {value: 'สุขศึกษา', label: 'สุขศึกษา'},
        {value: 'ลดเวลาเรียนเพิ่มเวลารู้', label: 'ลดเวลาเรียนเพิ่มเวลารู้'},
        {value: 'วิทยาศาสตร์', label: 'วิทยาศาสตร์'}
    ]

    async function submit(e) {
      e.preventDefault()
      if(subject === "") {
        toast.error("กรุณาเลือกวิชา")
      }else if(desc === "") {
        toast.error("กรุณาใส่เรื่อง")
      }else{
        toast.success("เพิ่มการบ้านแล้ว")
        try{
          await axios.post('https://node-api-production-95c1.up.railway.app/homework', {subject, desc})
          setpopup(false)
          fetchhomework()
      }

      catch(e){
        console.log(e)
      }

     
      }
    } 

    async function deletetag(id) {
      try{
        setdeletloadding(true)
        await axios.delete('https://node-api-production-95c1.up.railway.app/homework/' + id)
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
                          <button className='btn-delet' onClick={() => deletetag(work._id)}>finished</button>
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
                      <Select onChange={(e) => setsubject(e.value)} options={selecthomework} styles={Select}/>
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