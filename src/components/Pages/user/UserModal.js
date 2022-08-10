import React, {useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { API_URL, post } from "../../../helper/api" 
import axios from 'axios';
import { GetContext } from '../../context/Context';
import * as Notification from "../../../components/Notifications"


export default function UseModal({ show, setShow ,state, setState ,fetchUser }) {

  const { userInfo } = GetContext();
  const [Id, setId] = useState("")
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState({ bytes: '', filename:""})

  // alert(Id)
  const handleImage = (event) => {
    setImage({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
  }

  useEffect(() => {
    if (state.userid) {
      // alert(JSON.stringify(state))
      setId(state.userid);
      setFirstName(state.first_name);
      setLastName(state.last_name);
      setPhoneNumber(state.phone_number);
      setImage(state.user_image);
      alert((state.user_image));
      // alert(JSON.stringify(state))
      alert(JSON.stringify(image))

      setShow(true);
    }
  }, [state])
  // alert(JSON.stringify("id",Id))

  const handleClose = () => {
    setId("")
    setFirstName("")
    setLastName("")
    setPhoneNumber("")
    setImage ("")
    setShow(false)
    setState({})
  };
  // alert(JSON.stringify(Id))
  const handleSubmit = async (e) => {
    e.preventDefault();
    var formData = new FormData()
    formData.append("adminemail",userInfo?.email)
    formData.append("userid",Id )
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
    // alert(JSON.stringify(image));
    
    const result = await axios.post("http://localhost:5000/user/insertUser", formData, {
      Headers:{"content-type":"multipart/formdata"}
    });
    if (result.status) {
      // alert(result.status);
      Notification.swatSuccess(result.msg)
      setShow(false)
      fetchUser()
      setId()
      setFirstName("")
      setLastName("")
      setPhoneNumber("")
      setImage("")
    }
    else {
      // alert("data not insert!!")
      alert(result.msg)

    }
    // setShow(false)
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{Id==""?"Inserted":"Updated"} User Details</Modal.Title>
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
                value={firstName}
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
                value={lastName}
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
              type="tel"
              value={phoneNumber}
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
              // value={image.bytes}
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
            {Id === "" ? "Inserted" : "Updated"}
            {/* Inserted */}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
