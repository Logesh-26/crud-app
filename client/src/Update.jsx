import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [getDetails, setGetDetails] = useState({
        id: "",
        name: "",
        email: "",
        age: "",
        course: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/Scholar/${ id }`);
                setGetDetails(response.data)
                console.log(response.data)
            } catch (error) {
                console.log("Error fetching data", error)
            }
        }
        fetchData();
    }, [id]);


    const handleChange = (e) => {
        setGetDetails({ ...getDetails, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/Scholar/${ id }`, getDetails);
            alert("data is updated successfully");
            navigate("/");
        } catch (error) {
            console.error("Error occurs while update",error)
        }
    }
    return (
        <>
            <div className="form-container">
                <h2>Update data</h2>
                <form onSubmit={ handleSubmit }>
                    <label>Id: </label>
                    <input type="text"
                        name="id"
                        value={ getDetails._id }
                        onChange={ handleChange }
                        className="readonly-input"
                        required
                        readOnly
                    />
                    <label>Name: </label>
                    <input type="text"
                        name="name"
                        value={ getDetails.name }
                        onChange={ handleChange }
                    />
                    <label>Email: </label>
                    <input type="email"
                        name="email"
                        value={ getDetails.email }
                        onChange={ handleChange }
                    />
                    <label>Age: </label>
                    <input type="number"
                        name="age"
                        value={ getDetails.age }
                        onChange={ handleChange }
                    />
                    <label>Course: </label>
                    <input type="text"
                        name="course"
                        value={ getDetails.course }
                        onChange={ handleChange }
                    />
                    <button type="submit" className="submit-btn">Update</button>
                </form>
            </div>
            <Link to={ "/" }>
            <button className="back-btn">Back</button></Link>
        </>
    )
}
export default Update;