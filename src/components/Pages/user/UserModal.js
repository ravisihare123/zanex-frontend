import { NotificationsActive } from '@mui/icons-material';
import React, {useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { post } from "../../../helper/api" 
import axios from 'axios';


export default function UseModal({ show, setShow }) {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState({ bytes: '', filename:""})

  const handleImage = (event) => {
    setImage({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
  }
  const handleClose = () => {
    // lastName (""),
    // firstName ("")
    // phoneNumber(""),
    // image ("")
      setShow(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    var formData = new FormData()
    formData.append("firstname", firstName)
    formData.append("lastname", lastName)
    formData.append("phonenumber", phoneNumber)
    formData.append("img",image.bytes)
    // var params = {
    //   firstname: firstName,
    //   lastname: lastName,
    //   phonenumber: phoneNumber,
    //   img: image
      
    // }
    alert(JSON.stringify(image));
    
    const result = await axios.post("http://localhost:5000/user/insertUser", formData, {
      Headers:{"content-type":"multipart/formdata"}
    });
    if (result.status) {
      alert("success")
      // Notification.swatSuccess();
    }
    else {
      alert("data not insert!!")
    }
    setShow(false)
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Insert User Details</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <b>
              <Form.Label> First Name</Form.Label>
            </b>
            <Form.Control
              placeholder="Enter First Name"
              type="text"
              //   value={ageGroup}
                onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <b>
              <Form.Label>Last Name</Form.Label>
            </b>
            <Form.Control
              placeholder="Enter Last Name"
              type="text"
              //   value={description}
                onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <b>
              <Form.Label>Phone Number</Form.Label>
            </b>
            <Form.Control
              placeholder="Enter Number"
              type="number"
              onChange={(e)=>setPhoneNumber(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <b>
              <Form.Label>Image</Form.Label>
            </b>
            <Form.Control
              type="file"
              onChange={(event)=>handleImage(event)}
              required
            ></Form.Control>
          </Form.Group>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" type='submit' >
            {/* {true === "" ? "Inserted" : "Updated"} */}
            Inserted
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
