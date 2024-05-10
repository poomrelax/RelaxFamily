import "./content.css";
import React, { useState, useEffect } from "react";
function Content() {

  const [data, setdata] = useState([]);

  async function fetchData() {
    const res = await fetch("https://apipoomrelax.onrender.com/video/");
    res
      .json()
      .then((res) => setdata(res))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="video">
      {data.map((name) => {
        return (
          <>
          <a href={name.Link}>
            <div className="items">
              <img key={name.id} src={name.url} />
              <div className="detail">
                <h3>{name.name}</h3>
                <p>{name.detail}</p>
              </div>
            </div>
            </a>
          </>
        );
      })}
    </div>
  );
}

export default Content;
