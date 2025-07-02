import axios from 'axios'
import './HomeworkLogin.css'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HomeworkLogin() {
	const [username, setusername] = useState("")
	const [password, setpassword] = useState("")
	const [Status, setStatus] = useState("")

	const navigator = useNavigate();
	
	async function checklogin(res) {
		console.log(res)
		const Status = res.data.Status 
		setStatus(Status)
		if(Status === "no_username") {
			toast.error("not is a username")
			setusername("")
			setpassword("")
		}else if(Status === "password is incorrect") {
			toast.error("password is incorrect")
			setpassword("")
		}else if(Status === "Success") {
			toast.success("Login Success")
			setTimeout(() => {
				window.localStorage.setItem("loginhomework", res.data.username)
				navigator("/homework")
			}, 2000)
		}
	}



	async function submitloginhomework(e) {
		e.preventDefault();
		// toast.success("Success")//err
		// setusername("")
		try{
			await axios.post('https://homework-api-9ftf.onrender.com/loginhomework', {username, password})
			.then(res => {
				checklogin(res)
			})
			.catch(err => console.log(err))
		}

		catch(err) {
			console.log(err)
		}

			// console.log(Status)
		
		// if(Status == "no_username") {
		// 	alert("no username")
		// }else if(Status == "the password is incorrect.") {
		// 	alert("the password is incorrect.")
		// }else if(Status == "Success") {
		// 	alert("Success")
		// }
	}

		// if(Status === "no_username") {
		// 	alert("no username")
		// }else if(Status === "the password is incorrect.") {
		// 	alert("the password is incorrect.")
		// }else if(Status === "Success") {
		// 	alert("Success")
		// }

  return (
    <>
        <div class="containerlogin">
	    <div class="screen">
		<div class="screen__content">
             <div className="logouser">
                <img src="https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png"/>
            </div>
			<form class="login" onSubmit={submitloginhomework}>
				<div class="login__field">
					<i class="login__icon fas fa-user"></i>
					<input type="text" class="login__input" value={username} placeholder="User name" onChange={(e) => setusername(e.target.value)}/>
				</div>
				<div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					<input type="password" class="login__input" value={password} placeholder="Password" onChange={(e) => setpassword(e.target.value)}/>
				</div>
				<button class="button login__submit" type='submit'>
					<span class="button__text">Log In Now</span>
				</button>				
			</form>
			<div class="social-login">
				{/* <h3>log in via</h3> */}
				<div class="social-icons">
					<a href="#" class="social-login__icon fab fa-instagram"></a>
					<a href="#" class="social-login__icon fab fa-facebook"></a>
					<a href="#" class="social-login__icon fab fa-twitter"></a>
				</div>
			</div>
		</div>
		<div class="screen__background">
			<span class="screen__background__shape screen__background__shape4"></span>
			<span class="screen__background__shape screen__background__shape3"></span>		
			<span class="screen__background__shape screen__background__shape2"></span>
			<span class="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
<ToastContainer />
    </>
  )
}

export default HomeworkLogin