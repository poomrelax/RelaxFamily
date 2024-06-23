import React, { useEffect, useState } from 'react'
import infor from "./information.module.css"
import BarLoader from "react-spinners/BarLoader";
import Nav from '../Nav/Nav'
import axios from 'axios';
import p from './p.jpg'
import a from './a.jpg'
import new_profile from './new_profile.jpg'


function Information() {
    const [loading, setloading] = useState(true);
    const [Data, setData] = useState([])

    async function fetchData() {
      try{
        await axios.get('https://apipoomrelax.onrender.com/infor')
          .then(res => {
            console.log(res)
            setData(res.data)
          })
      }
      catch(err) {
        console.log(err)
      }

      finally{
        setloading(false)
      }
    }

    
  

    useEffect(() => {
      fetchData()
      }, []);    

  return (
    <>
    {loading ? (
      <div className="loader">
        <h2 style={{color : "#fff"}}>Loading...</h2>
        <BarLoader color={"#fde616"} loading={loading} size={20} />
      </div>
    ) : (
      <>
      <Nav/>
      <div className={infor.container}>
        <div className={infor.profile}>
        {/* <img src={p}/>  */}
        <h3>Information</h3>
           {Data.map((user ) => {
            // const image = parseInt(user.image)
            return (
                <>
                <img src={user.image}/> 
                <h2>{user.name}</h2>
                <p>ชื่อ : {user.fname}</p>
                <p>นามสกุล : {user.lname}</p>
                <p>อายุ : {user.old}</p>
                <p>อยู่ : {user.primary}</p>
                <div className={infor.detail}>
                    <div className={infor.face}>
                        <img key={user.old} src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png"/>
                        <p>{user.facebook}</p>
                    </div>
                    <div className={infor.phone}>
                    <img src="https://cdn.pixabay.com/photo/2017/01/31/14/36/blue-2024619_640.png"/>
                        <p>{user.phone}</p>
                    </div>
                </div>
                </>
            )
           })}
        </div>
      </div>
      </>
    )}
  </>
  )
}

export default Information