import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link} from "react-router-dom";

function Read() {

    const { id } = useParams();
    const [getDetails, setGetDetails] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/Scholar/${ id }`);
                setGetDetails(response.data)
            } catch (error) {
                console.log("Error Fetching Data", error);
            }
        }
        fetchdata();
    },[id])

    return (
        <div className="read-container">

            <h2>Student Data</h2>
            <form>
                <label>Id</label>
                <input type="text" value={ getDetails._id }/>
                
                <label>Name</label>
                <input type="text" value={ getDetails.name } />
                
                <label>Email</label>
                <input type="email" value={ getDetails.email } />
                <label>Age</label>
                <input type="number" value={ getDetails.age } />
                <label>Course</label>
                <input type="text" value={getDetails.course}/>
            </form>
            <Link to={ "/" }>
            <button className="back-btn">Back</button></Link>
        </div>
    )
}

export default Read;
