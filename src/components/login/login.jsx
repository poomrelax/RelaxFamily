import React, { useEffect, useState } from 'react'
import loginstyle from "./Login.module.css"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import FadeLoader from "react-spinners/FadeLoader";
// import axios from 'axios'


function Login() {
  
  const token = localStorage.getItem("loginhomework")
  const navigator = useNavigate();

  const url = 'https://homework-api-9ftf.onrender.com/mainhomework/'

  if(token) {
    navigator('/homework')
  }


  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [submitloading, setsubmitloading] = useState(false)

  async function checklogin(res) {
		const data = res.data
    console.log(data)

    if(data.message === "loginAdmin Success") {
      toast.success("เข้าสู่ระบบ สำเร็จ")
      localStorage.setItem("loginhomework", JSON.stringify({
        "id": data.id,
        "user": data.user
      }))
      setTimeout(() => {
        navigator('/homeworkadmin')
        setsubmitloading(false)
      }, 2000)
    }else if(data.message === "loginAdmin fail") {
        toast.error("รหัสไม่ถูกต้อง")
      setpassword("")
      setsubmitloading(false)
    }else if(data.status === "no_password") {
      toast.error("รหัสไม่ถูกต้อง")
      setpassword("")
      setsubmitloading(false)
    }else if(data.status === "no_user") {
      toast.error("ชื่อuser ไม่ถูกต้องง")
      setusername("") 
      setpassword("")
      setsubmitloading(false)
    }else if(data.message === "loginfamily success") {
      toast.success("เข้าสู่ระบบ สำเร็จ")
      localStorage.setItem("loginhomework", JSON.stringify({
        "id": data.id,
        "user": data.user
      }))
      setTimeout(() => {
        navigator('/homework')
        setsubmitloading(false)
      }, 2000)
    }
	}


	async function submitloginhomework(e) {
		e.preventDefault();
		// toast.success("Success")//err
		// setusername("")

    const data = {
      username: username,
      password: password
    }

		try{
      setsubmitloading(true)
			await axios.post(url + "login", data)
			.then(res => {
				checklogin(res)
			})
			.catch(err => console.log(err))
		}

		catch(err) {
			console.log(err)
		}

    finally{
      submitloading(false)
    }
  }


  const proceedLogin = (e) => {
    e.preventDefault();
    if(validate()) {
      // axios.post('http://localhost:3000/user')
      submitloginhomework(e)
    }
  }

  const validate = () => {
    let result = true;
    if(username === '' || username === null) {
      result = false;
      toast.warning('โปรดใส่username')
    }
    if(password === '' || password === null) {
      result = false;
      toast.warning('โปรดใส่password')
    }
    return result;
  }

  return (
    <>
    <ToastContainer/>
      <form onSubmit={proceedLogin}>
        <div className={loginstyle.container}>
          <div className={loginstyle.content}>
            <h2>Login/เข้าสู่ระบบ</h2>
            <div className={loginstyle.input}>
              <input type="text" id="username" value={username} placeholder='username' onChange={e => setusername(e.target.value)} />
              <input type="password" id="password" value={password} placeholder='password' onChange={e => setpassword(e.target.value)} />
            </div>
            <div className={loginstyle.btn}>
            {submitloading ? (
              <>
              <div style={{background: '#ccc', width: '100%', display: 'flex', justifyContent: 'center', fontSize: '12px', borderRadius: '5px', padding: '10px'}}><FadeLoader color={"#000"} loading={submitloading}  /></div>
              </>
            ) : (
              <>
              <button type='submit' id="submit">SUBMIT/ตกลง</button>
              </>
            )}
            </div>
            <div className={loginstyle.register}>
              <p>ต้องการสมัครใช่ไหม </p><a href="/register">สมัครสมาชิค</a>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Login