import React, { useEffect, useState } from 'react'
import infor from "./information.module.css"
import BarLoader from "react-spinners/BarLoader";
import Nav from '../Nav/Nav'
import axios from 'axios';


function Information() {
    const [loading, setloading] = useState(false);
    const [Data, setData] = useState([])

    async function fetchData() {
      const res = await fetch("https://apipoomrelax.onrender.com/infor/");
      res
        .json()
        .then((res) => setData(res))
        .catch((err) => console.log(err));
    }

    fetchData()
  

    useEffect(() => {
        setloading(true); //true
        setTimeout(() => {
          setloading(false);
        }, [3000]);
      }, []);    

  return (
    <>
    {loading ? (
      <div className="loader">
        <h2>Loading...</h2>
        <BarLoader color={"#fde616"} loading={loading} size={20} />
      </div>
    ) : (
      <>
      <Nav/>
      <div className={infor.container}>
        <div className={infor.profile}>
        <h3>Information</h3>
           {Data.map((user) => {
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