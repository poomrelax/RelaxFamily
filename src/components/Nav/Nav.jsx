import { Link, useNavigate } from 'react-router-dom';
import './Nav.css'

{/* <Link to="/login" className='endtext'>LOGIN</Link> */}



function Nav() {
  const navigate = useNavigate()

  const logout = () => {
    window.localStorage.removeItem("loginhomework")
    navigate('/login')
  }

  return (
    <section className="Nav">
      <div className="logo">
        <h3>Poom Relax</h3>
      </div>
      <div className="end">
        <ul>
          <Link className='li' to="/content" id="home">Home</Link>
          <Link className='li'to="/information" id="Information">Information</Link>
          <Link className='li'to="/homework" id="homework">Home Work</Link>
        </ul>
      <button className='endtext' onClick={() => logout()}>Logout</button>
      </div>
    </section>
  )
}

export default Nav;