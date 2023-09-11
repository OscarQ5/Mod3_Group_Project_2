import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './ProfilePage.css'

    const ProfilePage = () => {
        return (
            <>
                <h1>Meet The Code-Crafters!!!!</h1>
                    <h2>Jeremy Montes</h2>
                    <img id='profile-images' src='https://avatars.githubusercontent.com/u/129802356?v=4' alt="Jeremy Montes' profile picture" height='200' width='200' />
                    <p>✨A little something about ourselves✨</p>
                    <Link to='https://github.com/JBMontes'>
                        <h4>Jeremy Montes' Github Profile</h4>
                    </Link>
                    <Link to='https://www.linkedin.com/in/jeremy-b-montes'>
                        <h4>Jeremy Montes' LinkedIn Profile</h4>
                    </Link>
                    <br/>
                    <h2>Kenia Decoteau</h2>
                    <img id='profile-images' src='https://avatars.githubusercontent.com/u/131702982?v=4' alt="Kenia Decoteau's profile picture" height='200' width='200' />
                    <p>✨A little something about ourselves✨</p>
                    <Link to='https://github.com/KeniaD1'>
                        <h4>Kenia Decoteau's Github Profile</h4>
                    </Link>
                    <Link to='https://www.linkedin.com/in/kenia-decoteau/'>
                        <h4>Kenia Decoteau's LinkedIn Profile</h4>
                    </Link>
                    <br/>
                    <h2>Natyka Callwood</h2>
                    <img id='profile-images' src='https://avatars.githubusercontent.com/u/127881507?v=4' alt="Natyka Callwood's profile picture" height='200' width='200' />
                    <p>✨A little something about ourselves✨</p>
                    <Link to='https://github.com/NatykaC'>
                        <h4>Natyka Callwood's Github Profile</h4>
                    </Link>
                    <Link to='https://www.linkedin.com/in/natykajcallwood'>
                        <h4>Natyka Callwood's LinkedIn Profile</h4>
                    </Link>
                    <br/>
                    <h2>Oscar Quintanilla</h2>
                    <img id='profile-images' src='https://avatars.githubusercontent.com/u/127880951?v=4' alt="Oscar Quintanilla's profile picture" height='200' width='200' />
                    <p>✨A little something about ourselves✨</p>
                    <Link to='https://github.com/OscarQ5'>
                        <h4>Oscar Quintanilla's Github Profile</h4>
                    </Link>
                    <Link to='https://www.linkedin.com/in/oscarquintanilla5'>
                        <h4>Oscar Quintanilla's LinkedIn Profile</h4>
                    </Link>
                    <br/>
                
                <footer> 10.1 - Code-Crafters - 2023© </footer>
            </>
        )
    }

    export default ProfilePage;