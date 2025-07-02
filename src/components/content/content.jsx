import "./content.css";
import React, { useState, useEffect } from "react";
import BarLoader from "react-spinners/BarLoader";
import { useNavigate } from 'react-router-dom';
import Nav from "../Nav/Nav"
function Content() {
  const navigator = useNavigate();
  const login = localStorage.getItem("loginhomework")
   if(!login) {
    navigator('/login')
  }

  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
 

  async function fetchData() {
    try{
      const res = await fetch("https://homework-api-9ftf.onrender.com/video/");
    res
      .json()
      .then((res) => setdata(res))
      .catch((err) => console.log(err));
    }
      finally{
        setloading(false)
      }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <Nav/>
      {loading ?
       ( <div className="loader">
          <BarLoader color={"#fde616"} loading={loading} size={20} />
        </div>
        ) : (
          <>
        <div className="bg">
          <div className="video">
      {data.map((name) => {
        return (
          <>
          <a href={name.Link}>
            <div className="items">
              <img key={name.id} src={name.url} />
              <div className="detail">
                <h3>{name.name}</h3>
                {/* <p>{name.detail}</p> */}
              </div>
            </div>
            </a>
          </>
        );
      })}
          </div>
      </div>
          </>
        )}
        
    </>
  )
}
export default Content;
