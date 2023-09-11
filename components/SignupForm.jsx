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

        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }




    return (
        <div class='signUp'>
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
            <img src={file} />


            <br />
            <button type='submit'  class="btn"> SignUp/Login</button>
        </div>


    )





}
export default SignUpForm