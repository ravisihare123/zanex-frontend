import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { authHeader, post } from "../../../../helper/api";
import * as  Notification from "../../../Notifications"
import { GetContext } from "../../../context/Context";
import axios from "axios";

export default function PaxModal({ show, setShow, state, setState, fetchPax }) {
  
   const [Id, setId] = useState("");
   const [type, setType] = useState("");
   const [code, setCode] = useState("");
   const [ageGroup, setAgeGroup] = useState("");
  const [description, setDescription] = useState("");
  const {userInfo} = GetContext()

   const handleClose = () => {
     setId("");
     setType("");
     setCode("");
     setAgeGroup("");
     setDescription("");
     setState({});
     setShow(false);
   };

  useEffect(() => {
    if (state.id) {
      setId(state.id)
      setType(state.type)
      setCode(state.code)
      setAgeGroup(state.age_group)
      setDescription(state.description)
      setShow(true)
    }
  },[state])
  
  const submitPax = async (e) => {
    e.preventDefault();

    var params = {
      uid: userInfo.uid,
      id: Id,
      type: type,
      code: code,
      age_group: ageGroup,
      description: description,
    };

    const res = await post("master/insertEditPax", params, {
      headers: authHeader(),
    });

    // console.log(res.st);

    if (res.status) {
      Notification.swatSuccess(res.msg);
      setShow(false);
      fetchPax();
      setId("");
      setType("");
      setCode("");
      setAgeGroup("");
      setDescription("");
    } else {
      alert(res.msg);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{Id === "" ? "Insert" : "Update"} Form Data</Modal.Title>
      </Modal.Header>

      <Form onSubmit={submitPax}>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <b>
              <Form.Label>Enter Type</Form.Label>
            </b>
            <Form.Control
              placeholder="Enter Type"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <b>
              <Form.Label>Enter Code</Form.Label>
            </b>
            <Form.Control
              placeholder="Enter Code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <b>
              <Form.Label>Enter Age Group</Form.Label>
            </b>
            <Form.Control
              placeholder="Enter Age Group"
              type="text"
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <b>
              <Form.Label>Enter Description</Form.Label>
            </b>
            <Form.Control
              placeholder="Enter Description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" type="submit">
            {Id === "" ? "Inserted" : "Updated"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
