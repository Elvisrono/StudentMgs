import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import AddStudentModal from "./AddStudentModal";
import StudentActionsModal from "./StudentActionsModal";
import "../App.css";

const Manage = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/students/")
            .then((res) => res.json())
            .then((data) => setStudents(data))
            .catch(() => setError("Failed to load students. Please try again later."));
    }, []);

    // Add new student
    const handleStudentAdded = (newStudent) => {
        setStudents([...students, newStudent]);
    };

    // Update student details
    const handleStudentUpdated = (updatedStudent) => {
        setStudents(students.map((student) => (student.id === updatedStudent.id ? updatedStudent : student)));
    };

    // Delete student
    const handleStudentDeleted = (studentId) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            fetch(`http://127.0.0.1:8000/students/${studentId}/`, {
                method: "DELETE",
            })
            .then((res) => {
                if (res.status === 204) {
                    setStudents(students.filter((student) => student.id !== studentId));
                    alert("Student deleted successfully!");
                } else {
                    alert("Failed to delete student. Please try again.");
                }
            })
            .catch(() => alert("Failed to delete student. Please check your network."));
        }
    };

    return (
        <div className="container-fluid side-container">
            <div className="row side-row">
                <h3 className="text-center mb-3">Manage Students</h3>
                <div className="d-flex justify-content-center mb-3">
                    <Button className="btn btn-success" onClick={() => setShowAddModal(true)}>Add Student</Button>
                </div>
                <Table striped bordered hover className="tabled" id="dataTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Registration No</th>
                            <th>Email</th>
                            <th>Course</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {error && <tr><td colSpan="7" className="text-danger text-center">{error}</td></tr>}
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.FirstName}</td>
                                <td>{student.LastName}</td>
                                <td>{student.RegistrationNo}</td>
                                <td>{student.Email}</td>
                                <td>{student.Course}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        className="me-2"
                                        onClick={() => { setSelectedStudent(student); setShowEditModal(true); }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleStudentDeleted(student.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Add Student Modal */}
            <AddStudentModal show={showAddModal} handleClose={() => setShowAddModal(false)} onStudentAdded={handleStudentAdded} />

            {/* Edit Student Modal */}
            {selectedStudent && (
                <StudentActionsModal
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    student={selectedStudent}
                    onStudentUpdated={handleStudentUpdated}
                />
            )}
        </div>
    );
};

export default Manage;
