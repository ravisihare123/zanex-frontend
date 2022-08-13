import axios from "axios";
import React, { useState,useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { authHeader } from "../../../../helper/api";
import * as Notification from "../../../Notifications"
import {post } from "../../../../helper/api"

export default function AirportModal({ show, setShow, state, setState, fetchAirport }) {
  const [id, setId] = useState("")
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [terminal, setTerminal] = useState("");

  const handleClose = () => {
    setId("")
    setName("")
    setCode("")
    setTerminal("")
    setShow(false);
  };

  useEffect(() => {
    if (state.id) {
      setId(state.id)
      setName(state.name)
      setCode(state.code)
      setTerminal(state.terminal)
      setShow(true)
    }
  }, [state])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    var params = {
      id: id,
      name: name,
      code: code,
      terminal: terminal,
    
    };
    const result = await post(
      "master/insertEdit_airport",
      params, {
        headers:authHeader()
      }
    );
    if (result.status) {
      Notification.swatSuccess(result.msg);
      setShow(false);
        fetchAirport();
        setId("");
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
        <Modal.Title>
          {id == "" ? "Inserted" : "updated"}  Airport form data
        </Modal.Title>
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
              value={name}
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
              value={code}
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
              value={terminal}
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            close
          </Button>
          <Button variant="primary" type="submit">
            {id===""?"inserted ":"updated"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
