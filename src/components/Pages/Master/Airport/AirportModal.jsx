import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function AirportModal({ show, setShow, fetchAirport }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [terminal, setTerminal] = useState("");
  const handleClose = () => {
    setShow(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    var params = {
      name: name,
      code: code,
      terminal: terminal,
    };
    const result = await axios.post(
      "http://localhost:5000/master/insertEdit_airport",
      params
    );
    if (result.status) {
      Notification.swatSuccess(result.msg);
      setShow(false);
        fetchAirport();
      //   setId("");
      setName("");
      setCode("");
      setTerminal("");
    } else {
      alert(result.msg);
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Airport form data</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <b>
              <Form.Label>Enter Air-port Name</Form.Label>
            </b>
            <Form.Control
              type="text"
              placeholder="Enter airport name"
              onChange={(e) => setName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <b>
              <Form.Label>Enter code</Form.Label>
            </b>
            <Form.Control
              type="text"
              placeholder="Enter code"
              onChange={(e) => setCode(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <b>
              <Form.Label>Enter Terminal</Form.Label>
            </b>
            <Form.Control
              type="text"
              placeholder="Enter terminal"
              onChange={(e) => setTerminal(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            close
          </Button>
          <Button variant="primary" type="submit">
            {" "}
            inserted
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
