import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import Geolocation from './components/Geolocation.jsx'
import './App.css'
import SignUpForm from '../components/SignupForm'
import Header from './components/Header.jsx'
import ProfilePage from './components/ProfilePage.jsx'


function App() {

  return (
    <>
    <Header />
    <Geolocation />
    <SignUpForm />
    <ProfilePage/>
    </>
  )
}

export default App
