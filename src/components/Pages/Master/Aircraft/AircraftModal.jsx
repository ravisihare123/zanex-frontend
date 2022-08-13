import React,{useState} from 'react'
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";

export default function AircraftModal({ show, setShow }) {
    
     const [Id, setId] = useState("");
     const [name, setName] = useState("");
     const [pnumber, setPNumber] = useState("");
     const [aircraftCategoryList, setAircraftCategoryList] = useState([]);
    const [categoryId, setcategoryId] = useState("");
    
     const handleClose = () => {
       setId("");
       setName("");
       setPNumber("");
       setcategoryId("");
    //    setState({});
       setShow(false);
    };
    
    const handleSubmit = () => {
        
    }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{Id === "" ? "Insert" : "Update"} Form Data</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <b>
              <Form.Label>Enter Aircraft Name</Form.Label>
            </b>
            <Form.Control
              placeholder="Enter Aircraft Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <b>
              <Form.Label>Enter Aircraft Number</Form.Label>
            </b>
            <Form.Control
              placeholder="Enter Aircraft Number"
              type="text"
              value={pnumber}
              onChange={(e) => setPNumber(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <b>
              <Form.Label>Enter Aircraft Category Name</Form.Label>
            </b>
            <FloatingLabel
              controlId="floatingSelectGrid"
              label="Aircraft Category Name"
            >
              <Form.Select
                aria-label="Floating label select example"
                value={categoryId}
                onChange={(e) => setcategoryId(e.target.value)}
              >
                <option>select aircraft category name</option>
                {aircraftCategoryList.map((items) => (
                  <option key={items.id} value={items.id}>
                    {" "}
                    {items.name}{" "}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
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
