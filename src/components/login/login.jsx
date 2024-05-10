import React, { useEffect,  useState} from 'react'
import loginstyle from "./Login.module.css"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
// import axios from 'axios'


function Login() {
  const token = localStorage.getItem("tokenuser");
  const navigator = useNavigate();

  if(token) {
    navigator('/home')
  }


  const [Dataform, setdataform] = useState({
    username: '',
    password : ''
  })


  const proceedLogin = (e) => {
    e.preventDefault();
    if(validate()) {
      // axios.post('http://localhost:3000/user')
      if(Dataform.username === 'poomrelax') {
        if(Dataform.password === '11699') {
          alert("Login successfully")
          localStorage.setItem('tokenuser', 'poomrelax')
          navigator('/')
        }else{
          alert("รหัสผ่านไม่ถูกต้อง")
          
        }
      }else{
        alert("username ไม่ถูกต้อง")

      }
    }
  }

  const validate = () => {
    let result = true;
    if(Dataform.username === '' || Dataform.username === null) {
      result = false;
      toast.warning('โปรดใส่username')
    }
    if(Dataform.password === '' || Dataform.password === null) {
      result = false;
      toast.warning('โปรดใส่password')
    }
    return result;
  }
  
  return (
   <>
   <form onSubmit={proceedLogin}>
    <div className={loginstyle.container}>
     <div className={loginstyle.content}>
      <h2>Login/เข้าสู่ระบบ</h2>
        <div className={loginstyle.input}>
          <input type="text" value={Dataform.username} placeholder='username'  onChange={e => setdataform({...Dataform, username: e.target.value})}/>
          <input type="password" value={Dataform.password} placeholder='password'  onChange={e => setdataform({...Dataform, password: e.target.value})}/>
        </div>
        <div className={loginstyle.btn}>
          <button type='submit'>SUBMIT/ตกลง</button>
        </div>
     </div>
    </div>
    </form>
   </>
  )
}

export default Login