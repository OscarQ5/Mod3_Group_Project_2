import { Link } from "react-router-dom"
import AboutPage from "./AboutPage"
import "./Header.css"


function Header({isAuthenticated}){
    const signOut = () => {
      setIsAuthenticated(false)
    }

    return(

    <>
  
<div className="header-nav">

<h1> Take My Parking</h1>


<div className="dropdown">
  <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
    Menu
  </button>
  <div className="dropdown-menu">


  {!isAuthenticated && <Link className="dropdown-item" to="/">Home</Link>}
    {isAuthenticated && <Link className="dropdown-item" to="/Profile">Profile</Link>}
    <Link className="dropdown-item" to="/" onClick={signOut}>SignOut</Link>
    <Link className="dropdown-item" to="/About">About</Link>

  </div>
</div>




</div>

    </>

)

}


export default Header