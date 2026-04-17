import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://crud-app-backend-b3od.onrender.com"
const Form = () => {
    const navigate = useNavigate();

    const [student, setStudent] = useState({
        id: "",
        name: "",
        email: "",
        age: "",
        course: "",
        password:""
    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/Scholar`, student);
            alert("Student added successfully");
            console.log(student);
            navigate("/");
        } catch (error) {
            console.log(error);
            alert("Student not added");
        }
    }

    return (
        <>
            <div className="container">
                <h2>Add new Student</h2>
                <form onSubmit={ handleSubmit } >
                    <div>
                        <label>Id: </label>
                        <input type="text"
                            name="id"
                            value={ student.id }
                            onChange={ handleChange }
                            required
                        />
                    </div>
                    <div>
                        <label>Name: </label>
                        <input type="text"
                            name="name"
                            value={ student.name }
                            onChange={ handleChange }
                        />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="email"
                            name="email"
                            value={ student.email }
                            onChange={ handleChange }
                        />
                    </div>
                    <div>
                        <label>Age: </label>
                        <input type="number"
                            name="age"
                            value={ student.age }
                            onChange={ handleChange }
                        />
                    </div>
                    <div>
                        <label>Course: </label>
                        <input type="text"
                            name="course"
                            value={ student.course }
                            onChange={ handleChange }
                        />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="text"
                            name="password"
                            value={ student.password }
                            onChange={ handleChange }
                            required
                        />
                    </div>
                    <button
                        type="submit">Add Student</button>
                </form>
            </div>
        
        </>
    )
}
export default Form;