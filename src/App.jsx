import Geolocation from './components/Geolocation.jsx'
import './App.css'
import SignUpForm from './components/SignupForm'
import Header from './components/Header.jsx'
import AboutPage from './components/AboutPage.jsx'
import { BrowserRouter as Router,Routes, Route, Link } from "react-router-dom";


function App() {

  return (
    <>
    <Router>
    <Header />
    
    <Routes>

    <Route path="/Profile" element={<Geolocation />} />
    <Route path="/" element={<SignUpForm />} />
    <Route path="/About" element={<AboutPage/>} />

    </Routes>
   
    </Router>

    </>
  )
}

export default App
