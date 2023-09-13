import { useState } from 'react'
import Geolocation from './components/Geolocation.jsx'
import './App.css'
import SignUpForm from './components/SignupForm'
import Header from './components/Header.jsx'
import AboutPage from './components/AboutPage.jsx'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <>
      <Router>
        <Header isAuthenticated={isAuthenticated}/>

        <Routes>

          {isAuthenticated ? (
            <Route path="/Profile" element={<Geolocation />} />
          ) : (
            <Route path="/" element={<SignUpForm setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated}/>} />
          )}
          <Route path="/About" element={<AboutPage />} />

        </Routes>

      </Router>

    </>
  )
}

export default App
