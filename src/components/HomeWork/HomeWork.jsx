import React, { useState, useEffect } from 'react'
import "./HomeWork.css";
import axios from 'axios'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Nav from '../Nav/Nav';
import ถูกremovebg from '../../image/ถูกremovebg.png'
import { useNavigate } from 'react-router-dom';

function HomeWork() {
  const [loading, setloading] = useState(true);
  const [homework, setitems] = useState([])
  const [deletloadding, setdeletloadding] = useState(false)

  const navigator = useNavigate();
  const loginhomework = localStorage.getItem("loginhomework")


  if(loginhomework === "poom") {
    navigator("/homeworkadmin")
  }else if(!loginhomework) {
    navigator('/login')
  }
  


    const fetchhomework = async () => {
      try{
          await axios.get('https://node-api-production-d005.up.railway.app/homework')
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


    useEffect(() => {
        fetchhomework();
    }, [])

async function deletetag(id) {
  try{
    setdeletloadding(true)
    await axios.delete('https://node-api-production-d005.up.railway.app/homework/' + id)
  }

  catch(err) {
    console.log(err)
  }

  finally{
    setdeletloadding(false)
  }
}
   

  // const updateuser = (id) => {
  //   const post = {"id" : id, "Already" : true}
  //   console.log(id)
  //   axios.put('http://localhost:2553/homework',{post})
  // }

  // if(homework === null) {
  //   return (
  //     <>
  //      <h1>Hello Work</h1>
  //     </>
  //   )
  // }


  return (
    <>
    <Nav/>
      {loading ? (
        <>
      <div className="loader">
        <h2 style={{color : "#fff"}}>Loading...</h2>
        <ClimbingBoxLoader color={"#36d7b7"} loading={loading} size={20} />
      </div>
      </>
    ) : (
      <>
      {/* <div className="bg"> */}
        <div className="container">
        {homework.map((work) => {
            return(
              <>
              
                <div className="card">
                  <div className="box">
                    <h3>{work.subject}</h3>
                    <h5>{work.name}</h5>
                    <p>{work.desc}</p>
                    <h4>{work.date}</h4>
                    
                    </div>
                  </div>
                 
              </>
            )
        })}
        </div>
        {/* </div> */}
      </>
      
    )}
    </>
  
  )
}

export default HomeWork
