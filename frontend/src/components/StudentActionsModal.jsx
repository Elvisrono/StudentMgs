import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const StudentActionsModal = ({ show, handleClose, student, onStudentUpdated, onStudentDeleted }) => {
    const [formData, setFormData] = useState(student);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Update Student
    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`http://127.0.0.1:8000/students/${student.id}/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.id) {
                    onStudentUpdated(data);
                    handleClose();
                } else {
                    setError("Failed to update student. Please try again.");
                }
            })
            .catch(() => setError("Failed to update student. Please check your network."));
    };

    // Delete Student
    const handleDelete = () => {
        fetch(`http://127.0.0.1:8000/students/${student.id}/`, {
            method: "DELETE",
        })
            .then((res) => {
                if (res.ok) {
                    onStudentDeleted(student.id);
                    handleClose();
                } else {
                    setError("Failed to delete student. Please try again.");
                }
            })
            .catch(() => setError("Failed to delete student. Please check your network."));
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <p className="text-danger">{error}</p>}
                <Form onSubmit={handleUpdate}>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="FirstName"
                            value={formData.FirstName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="LastName"
                            value={formData.LastName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Registration No</Form.Label>
                        <Form.Control
                            type="text"
                            name="RegistrationNo"
                            value={formData.RegistrationNo}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Course</Form.Label>
                        <Form.Control
                            type="text"
                            name="Course"
                            value={formData.Course}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update Student
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDelete}>
                    Delete Student
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default StudentActionsModal;
