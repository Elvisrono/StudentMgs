import {Button, Table} from "react-bootstrap";
import '../App.css'
import {useEffect, useState} from "react";



const Students = () => {

    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetch('http://127.0.0.1:8000/students/')
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setStudents(data);
            })
            .catch((error) => {
                setError('Failed to load students. Please try again later');
                console.log('Error fetching students: ', error);
            })
    }, [])

    const handleStudentAdded = (newStudent) => {
        setStudents([...students, newStudent]);
    }


    return (
        <div className='container-fluid side-container'>
            <div className='row side-row'>
                <p id='before-table'></p>

                <Table striped bordered hover className='tabled' id='dataTable'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Registration No</th>
                        <th>Email</th>
                        <th>Course</th>
                    </tr>
                    </thead>
                    <tbody>
                    {error && <p className='text-danger mb-4 font-semibold '>{error}</p>}
                    {students.map((student) =>
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.FirstName}</td>
                            <td>{student.LastName}</td>
                            <td>{student.RegistrationNo}</td>
                            <td>{student.Email}</td>
                            <td>{student.Course}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>




        </div>
    )
}

export default Students;