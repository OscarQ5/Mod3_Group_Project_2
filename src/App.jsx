import { useState } from 'react'
import ProfilePage from './components/ProfilePage.jsx'
import './App.css'
import SignUpForm from './components/SignupForm'
import Header from './components/Header.jsx'
import AboutPage from './components/AboutPage.jsx'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState(null)

  return (
    <>
      <Router>
        <Header isAuthenticated={isAuthenticated}/>

        <Routes>

          {isAuthenticated ? (
            <Route path="/Profile" element={<ProfilePage user={userData} />} />
          ) : (
            <Route path="/" element={<SignUpForm setIsAuthenticated={setIsAuthenticated} setUserData={setUserData} />} />
          )}
          <Route path="/About" element={<AboutPage />} />

        </Routes>

      </Router>

    </>
  )
}

export default App
