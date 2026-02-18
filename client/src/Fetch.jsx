import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Fetch = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/Scholar`);
            console.log(response.data)
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (del) => {
        try {
            await axios.delete(`http://localhost:3000/Scholar/${ del }`);
            alert("Student Deleted");
            fetchData();
        } catch (error) {
            console.error("unable to delete", error);
        }
    };

    useEffect(() => {
        (async () => {
            await fetchData();
        }) ();
    },[])

    return (
        <>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>AGE</th>
                            <th>COURSE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        { data.map((user, index) => (
                            <tr key={ index } >
                                <td>{ user._id }</td>
                                <td>{ user.name }</td>
                                <td>{ user.email } </td>
                                <td>{ user.age } </td>
                                <td>{ user.course } </td>
                                <td>{ user.actions }
                                    <Link to={`/Read/${user._id}`}>
                                    <button>Read</button>
                                    </Link>

                                    <Link to={ `/Update/${ user._id }` }>
                                        <button>Update</button>
                                    </Link>
                                    <button onClick={()=>handleDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="btn"
                onClick={() => navigate(`/Form`)}>Add Students</button>
            </div>
        </>
    )
}
export default Fetch;