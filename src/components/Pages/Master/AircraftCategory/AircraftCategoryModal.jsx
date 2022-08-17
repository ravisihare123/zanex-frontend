import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { post, authHeader } from "../../../../helper/api";
import { GetContext } from "../../../context/Context";
import * as Notification from "../../../Notifications" 

export default function AircraftCategoryModal({
  show,
  setShow,
  state,
  setState,
  fetchAircraftCategory,
}) {
  const [Id, setId] = useState("");
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [fualCharge, setFualCharge] = useState("");
  const [maintenanceHour, setMaintenanceHour] = useState("");
  const [blockSeat, setBlockSeat] = useState("");
  const {userInfo} = GetContext()

    
  const handleClose = () => {
    setId("");
    setName("");
    setCapacity("");
    setFualCharge("");
    setMaintenanceHour("");
    setBlockSeat("");
      setState({});
      setShow(false);
    
    };
    
    useEffect(() => {
        if (state.id) {
            setId(state.id)
            setName(state.name)
            setCapacity(state.capacity)
            setFualCharge(state.fual_charge)
            setMaintenanceHour(state.maintenance_hour)
            setBlockSeat(state.block_seat)
            setShow(true)
    }    
    },[state])

  const handleSubmit = async (event) => {
    event.preventDefault();

    var params = {
      uid: userInfo.uid,
      id: Id,
      name: name,
      capacity: capacity,
      fual_charge: fualCharge,
      maintenance_hour: maintenanceHour,
      block_seat: blockSeat,
    };
    const result = await post("master/inserteditaircraftcategory", params, {
      headers: authHeader(),
    });

    if (result.status) {
      Notification.swatSuccess(result.msg);
      setShow(false);
        fetchAircraftCategory();
      setId("");
      setName("");
      setCapacity("");
      setFualCharge("");
      setMaintenanceHour("");
      setBlockSeat("");
    } else {
      alert(result.msg);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{Id === "" ? "Insert" : "Update"} Form Data</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <b>
              <Form.Label>Enter Aircraft Category Name</Form.Label>
            </b>
            <Form.Control
              placeholder="Enter Aircraft Category Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <b>
              <Form.Label>Enter Capacity</Form.Label>
            </b>
            <Form.Control
              placeholder="Enter Capacity"
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <b>
              <Form.Label>Enter Fual Charge</Form.Label>
            </b>
            <Form.Control
              placeholder="Enter Fual Charge"
              type="number"
              value={fualCharge}
              onChange={(e) => setFualCharge(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <b>
              <Form.Label>Enter Maintenance Hour</Form.Label>
            </b>
            <Form.Control
              placeholder="Enter Maintenance Hour"
              type="number"
              value={maintenanceHour}
              onChange={(e) => setMaintenanceHour(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <b>
              <Form.Label>Enter Block Seat</Form.Label>
            </b>
            <Form.Control
              placeholder="Enter Block Seat"
              type="number"
              value={blockSeat}
              onChange={(e) => setBlockSeat(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" type="submit">
            {Id == "" ? "Inserted" : "Updated"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
