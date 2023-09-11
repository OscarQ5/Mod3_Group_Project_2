import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProfilePage from "./ProfilePage"

function Header(){

    return(

    <>
    
<div className='header'>

<h1> Take My Parking</h1>

    
<select className='nav-option'>

<option value="Home">Home</option>

<option value="Profile">Profile</option>

 {/* <Link to="./ProfilePage" > */}
<option value="About">About</option>
{/* </Link> */}

<option value="SignOut">SignOut</option>

</select>




</div>

    </>
    )
}

export default Header