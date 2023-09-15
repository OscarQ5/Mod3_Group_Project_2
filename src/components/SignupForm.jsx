import React from 'react';
import { useState, useEffect } from 'react';
import "./SignUpForm.css"
import userData from "../UserData.json"
import { useNavigate } from "react-router-dom"

const SignUpForm = ({ setIsAuthenticated, setUserData }) => {

    const [signUp, setSignUp] = useState(false)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [makeModel, setMakeModel] = useState("")
    const [carType, setCarType] = useState("")
    const [carColor, setCarColor] = useState("")
    const [file, setFile] = useState();

    const handleUserSubmit = (event) => {
        event.preventDefault();
        console.log("Name: ", name);
        console.log("Car type: ", carType);
        console.log("Make/model: ", makeModel);


        console.log(event.target.files);
        setFile(URL.createObjectURL(event.target.files[0]));
    }

    const submitForm = (event) => {
        event.preventDefault()
        if (signUp) {
            if (name && makeModel && carType && carColor && username && password) {
                const newUser = {
                    id: userData.length + 1,
                    name,
                    username,
                    password,
                    userLocations: {
                        latitude: 0,
                        longitude: 0
                    },
                    car: {
                        makeModel,
                        carType,
                        carColor
                    }
                };
                userData.push(newUser)
                setUserData(newUser)
                setIsAuthenticated(true)
                navigate('/Profile')
            } else {
                alert("Please fill out all required fields.")
            }
        } else {
            const user = userData.users.find((user) => user.username === username && user.password === password);
            if (user) {
                setIsAuthenticated(true);
                setUserData(user)
                navigate("/Profile")
                console.log(`User ${user.name} logged in.`);
            } else {
                console.error("Authentication failed. Invalid username or password.");
            }
        }
    }


    return (

        <div className='signUp'>

            <h2> Sign Up Form</h2>
            <label> Name</label>
            <br />
            <input
                type="text"

                placeholder='Enter Name'
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
            />
            <br />
            <label> Make / Model</label>
            <br />
            <input
                type="text"
                placeholder='Enter Make/Model'
                value={makeModel}
                onChange={(event) => setMakeModel(event.target.value)}
                required
            />
            <br />
            <label> Car Type / Size </label>
            <br />
            <input
                type='text'
                placeholder='Enter Car Type/ Size'
                value={carType}
                onChange={(event) => setCarType(event.target.value)}
                required
            />
            <br />
            <label> Car Color </label>
            <br />
            <input
                type='text'
                placeholder='Enter Car Color'
                value={carColor}
                onChange={(event) => setCarColor(event.target.value)}
                required
            />
            <br />

            <h2>BackGround Check</h2>
            <p> Enter Picture of Indentification</p>

            <input type="file" onChange={handleUserSubmit}
                required
            />

            <br />
            <label>Username</label>
            <br />
            <input
                type="text"
                placeholder='Enter Username'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
            />
            <br />
            <label>Password</label>
            <br />
            <input
                type="password"
                placeholder='Enter Password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
            />
            <br />
            <button type='submit' className="btn" onClick={submitForm}>{signUp ? "Sign Up" : "Login"}</button>
            <button type='submit' className="btn" onClick={() => setSignUp((prevSignUp) => !prevSignUp)}>
                {signUp ? 'Switch to Login' : 'Switch to Sign Up'}
            </button>



            <div className='formResults'>
                <h2> {name}</h2>
                <h2> {makeModel}</h2>
                <h2> {carType}</h2>
                <img src={file} />
            </div>

        </div>


    )





}
export default SignUpForm