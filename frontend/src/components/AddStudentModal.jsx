import {useState} from "react";
import {Button, Modal, ModalFooter, Form} from "react-bootstrap";

const AddStudentModal = ({ show, handleClose, onStudentAdded }) => {

    const [formData, setFormData] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        RegistrationNo: "",
        Course: "",
    })

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/students/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then((data) => {
                if (data.id) {
                    onStudentAdded(data)
                    handleClose()
                } else {
                    setError('Failed to add students. Please try again later');
                }
            })
            .catch((error) => {
                setError('Failed to add students. Please try again later');
                console.log('Error fetching students: ', error);
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <p className='text-danger'>{error}</p>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type='text' name='FirstName' onChange={handleChange} required></Form.Control>
                    </Form.Group>
                     <Form.Group className='mb-3'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type='text' name='LastName' onChange={handleChange} required></Form.Control>
                    </Form.Group>
                     <Form.Group className='mb-3'>
                        <Form.Label>Registration No</Form.Label>
                        <Form.Control type='text' name='RegistrationNo' onChange={handleChange} required></Form.Control>
                    </Form.Group>
                     <Form.Group className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' name='Email' onChange={handleChange} required></Form.Control>
                    </Form.Group>
                     <Form.Group className='mb-3'>
                        <Form.Label>Course</Form.Label>
                        <Form.Control type='text' name='Course' onChange={handleChange} required></Form.Control>
                    </Form.Group>
                    <Button variant='primary' type='submit'>Add Student</Button>

                </Form>
            </Modal.Body>
            <ModalFooter>
                <Button variant='secondary' onClick={handleClose}>Close</Button>
            </ModalFooter>
        </Modal>
    )
}

export default AddStudentModal