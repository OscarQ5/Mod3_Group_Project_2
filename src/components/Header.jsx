import { Link } from "react-router-dom"
import AboutPage from "./AboutPage"
import "./Header.css"


function Header(){

    return(

    <>
  
<div className="header-nav">

<h1> Take My Parking</h1>


<div class="dropdown">
  <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
    Menu
  </button>
  <div class="dropdown-menu">


    <a class="dropdown-item" href="/">Home</a>
    <a class="dropdown-item" href="/Profile">Profile</a>
    <a class="dropdown-item" href="/">SignOut</a>
    <a class="dropdown-item" href="/About">About</a>
 

  </div>
</div>




</div>

    </>

)

}


export default Header