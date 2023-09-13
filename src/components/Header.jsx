import { Link } from "react-router-dom"
import AboutPage from "./AboutPage"
import "./Header.css"


function Header(){

    return(

    <>
  
<div className="header-nav">

<h1> Take My Parking</h1>


<div className="dropdown">
  <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
    Menu
  </button>
  <div className="dropdown-menu">


    <a className="dropdown-item" href="/">Home</a>
    <a className="dropdown-item" href="/Profile">Profile</a>
    <a className="dropdown-item" href="/">SignOut</a>
    <a className="dropdown-item" href="/About">About</a>

  </div>
</div>




</div>

    </>

)

}


export default Header