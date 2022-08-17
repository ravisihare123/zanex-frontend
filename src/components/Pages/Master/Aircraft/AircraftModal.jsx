import React,{useEffect, useState} from 'react'
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { post, get, authHeader } from "../../../../helper/api";
import * as Notification from "../../../Notifications"
import { GetContext } from '../../../context/Context';

export default function AircraftModal({ show, setShow, state, setState, fetchaircraft }) {
  const [Id, setId] = useState("");
  const [name, setName] = useState("");
  const [pnumber, setPNumber] = useState("");
  const [aircraftCategoryList, setAircraftCategoryList] = useState([]);
  const [categoryId, setcategoryId] = useState("");
  const { userInfo} = GetContext()

  const handleClose = () => {
    setId("");
    setName("");
    setPNumber("");
    setcategoryId("");
       setState({});
    setShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    var params = {
      uid: userInfo.uid,
      id: Id,
      name: name,
      plane_no: pnumber,
      category_id: categoryId,
    };

    const result = await post("master/inserteditaircraft", params, {
      headers: authHeader(),
    });

    if (result.status) {
      Notification.swatSuccess(result.msg);
      setShow(false);
      fetchaircraft();
      setId("");
      setName("");
      setPNumber("");
      setcategoryId("");
    } else {
      alert(result.msg);
    }
  };

  //// fetch aircraftcategory name
  const getAircraftCategory = async () => {
    const result = await get("master/getaircraftcategory", {
      headers: authHeader(),
    });

    setAircraftCategoryList(result.data);
  };

  useEffect(() => {
    if (state.id) {
      setId(state.id)
      setName(state.name)
      setPNumber(state.plane_no)
      setcategoryId(state.category_id)
      setShow(true)
    }
    getAircraftCategory();
  }, [state]);
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
