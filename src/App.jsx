import { useState, useEffect } from 'react'
import Geolocation from './components/Geolocation.jsx'
import './App.css'
import SignUpForm from './components/SignupForm'

import Header from './components/Header.jsx'

function App() {

  return (
    <>
    <Geolocation />
    <Header />
    <SignUpForm />
    </>
  )
}

export default App
