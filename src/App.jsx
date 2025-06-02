import React, { useState, useEffect } from "react";
import "./App.css";
import { FaArrowCircleUp } from "react-icons/fa";
import { Route, Link, Navigate, useNavigate } from "react-router-dom";
import Home from "./Home";
import PacmanLoader from "react-spinners/PacmanLoader";
import Login from "./components/login/login";

function App() {
  const loginhomework = localStorage.getItem("loginhomework");
  const navigator = useNavigate();

  if (!loginhomework) {
    navigator("/login");
  }

  navigator('/adminhomework')

  const [loading, setloading] = useState(false);

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
          <PacmanLoader color={"#fde616"} loading={loading} size={20} />
        </div>
      ) : (
        <>
          <div className="container">
            <Home />
          </div>
        </>
      )}
    </>
  );
}

export default App;
