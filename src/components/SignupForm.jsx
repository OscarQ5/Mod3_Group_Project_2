import React from 'react';
import { useState } from 'react';
import "./SignUpForm.css"

const SignUpForm = () => {


    const [name, setName] = useState("")
    const [makeModel, setMakeModel] = useState("")
    const [carType, setCarType] = useState("")
    const [file, setFile] = useState();

    const handleUserSubmit = (event) => {
        event.preventDefault();
        console.log("Name: ", name);
        console.log("Car type: ", carType);
        console.log("Make/model: ", makeModel);


        console.log(event.target.files);
        setFile(URL.createObjectURL(event.target.files[0]));

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

            <h2>BackGround Check</h2>
            <p> Enter Picture of Indentification</p>

            <input type="file" onChange={handleUserSubmit}
                required
            />

            <br />
            <button type='submit' className="btn"> SignUp/Login</button>



            <div className='formResults'>
                <h2> {name}</h2>
                <h2> {makeModel}</h2>
                <h2> {carType}</h2>
                <img src= {file}/>
            </div>

        </div>


    )





}
export default SignUpForm