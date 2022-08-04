import { NotificationsActive } from '@mui/icons-material';
import React, {useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { post } from "../../../helper/api" 


export default function UseModal({ show, setShow }) {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const[image, setImage] = useState("")

  const handleClose = () => {
    // lastName (""),
    // firstName ("")
    // phoneNumber(""),
    // image ("")
      setShow(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    var params = {
      firstname: firstName,
      lastname: lastName,
      phonenumber: phoneNumber,
      img: image
      
    }
    const result = await post("user/insertUser", params)
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
              onChange={(e)=>setImage(e.target.value)}
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
