import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './AboutPage.css'

const AboutPage = () => {
    return (
        <>
            <div className="aboutPage">

                <div className="team">
                <h2>Jeremy Montes</h2>
                <img id='profile-images' src='https://avatars.githubusercontent.com/u/129802356?v=4' alt="Jeremy Montes' profile picture" height='200' width='200' />
                <p>✨Lifesaver, musician, gamer, and early career software engineer seeking optimal solutions to complex problems.✨</p>
                <Link to='https://github.com/JBMontes'>
                   <img src="src/assets/5201D372-43A2-4466-A37B-AC9889C73C0D.png" height="50"/>
                </Link>
                <Link to='https://www.linkedin.com/in/jeremy-b-montes'>
                    <img src="src/assets/03A36429-DFDE-4BC9-8CE8-847D28A5F623.png" height="50"/>
                </Link>
                </div>
                <br />
                <div className="team">
                <h2>Kenia Decoteau</h2>
                <img id='profile-images' src='https://avatars.githubusercontent.com/u/131702982?v=4' alt="Kenia Decoteau's profile picture" height='200' width='200' />
                <p>✨I am a Pursuit fellow future Software Developer I find joy in sharing my knowledge with others that may lack the resources .✨</p>
                <Link to='https://github.com/KeniaD1'>
                <img src="src/assets/5201D372-43A2-4466-A37B-AC9889C73C0D.png" height="50"/>
                </Link>
                <Link to='https://www.linkedin.com/in/kenia-decoteau/'>
                <img src="src/assets/03A36429-DFDE-4BC9-8CE8-847D28A5F623.png" height="50"/>
                </Link>
                </div>
                <br />
                <div className="team">
                <h2>Natyka Callwood</h2>
                <img id='profile-images' src='https://avatars.githubusercontent.com/u/127881507?v=4' alt="Natyka Callwood's profile picture" height='200' width='200' />
                <p>✨Software engineer student studying. My dream is to take my new skills and help improve our daily lives.✨</p>
                <Link to='https://github.com/NatykaC'>
                <img src="src/assets/5201D372-43A2-4466-A37B-AC9889C73C0D.png" height="50"/>
                </Link>
                <Link to='https://www.linkedin.com/in/natykajcallwood'>
                <img src="src/assets/03A36429-DFDE-4BC9-8CE8-847D28A5F623.png" height="50"/>
                </Link>
                </div>
                <br />
                <div className="team">
                <h2>Oscar Quintanilla</h2>
                <img id='profile-images' src='https://avatars.githubusercontent.com/u/127880951?v=4' alt="Oscar Quintanilla's profile picture" height='200' width='200' />
                <p>✨Software engineer student looking to significantly progress my skills in coding and obtain a position in tech.✨</p>
                <Link to='https://github.com/OscarQ5'>
                <img src="src/assets/5201D372-43A2-4466-A37B-AC9889C73C0D.png" height="50"/>
                </Link>
                <Link to='https://www.linkedin.com/in/oscarquintanilla5'>
                <img src="src/assets/03A36429-DFDE-4BC9-8CE8-847D28A5F623.png" height="50"/>
                </Link>
                </div>
                <br />

            </div>

            <footer> 10.1 - Code-Crafters - 2023© </footer>
        </>
    )
}


export default AboutPage;

