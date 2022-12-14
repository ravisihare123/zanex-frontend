import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { authHeader, post } from "../../../../helper/api";
import * as Notification from "../../../Notifications";
import {GetContext} from "../../../context/Context"
import axios from "axios";

function PilotModal({ show, setShow, state, setState,fetchPilot }) {
  const { userInfo } = GetContext();

  const [Id, setId] = useState("");
  const [name, setName] = useState("");
  const [mobile, setmMobile] = useState("");
  const [altMobile, setAltMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [licenceNo, setLicenceNo] = useState("");
  const [licenceDoc, setLicenceDoc] = useState({ bytes: "", filename: "" });
  const [govDoc, setGovDoc] = useState({ bytes: "", filename: "" });


  const licenceChange = (e) => {
    setLicenceDoc({ bytes: e.target.files[0], filename: URL.createObjectURL(e.target.files[0]) });
  
  };
  
  const GovChange = (e) => {
    setGovDoc({
      bytes: e.target.files[0],
      filename: URL.createObjectURL(e.target.files[0]),
    })
  };

  const handleClose = () => {
    setId("");
    setName("");
    setmMobile("");
    setAltMobile("");
    setEmail("");
    setAddress("");
    setLicenceNo("");
    setLicenceDoc({});
    setGovDoc({});
    setState({});
    setShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("uid", userInfo.uid);
    formData.append("id", Id);
    formData.append("name", name);
    formData.append("mobile", mobile);
    formData.append("alt_mobile", altMobile);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("licence_no", licenceNo);
    formData.append("licence_doc", licenceDoc.bytes);
    formData.append("gov_doc", govDoc.bytes);

    const res = await post("master/insertEditPilot", formData,
      {headers: authHeader()}
    );

    if (res.status) {
      // alert(res.status)
      Notification.swatSuccess(res.msg);
      setShow(false);
      fetchPilot();
      setId("");
      setName("");
      setmMobile("");
      setAltMobile("");
      setEmail("");
      setAddress("");
      setLicenceNo("");
      setLicenceDoc({});
      setGovDoc({});
    } else {
      alert(res.msg);
    }
  };

  useEffect(() => {
    if (state.id) {
      setId(state.id);
      setName(state.name);
      setmMobile(state.mobile);
      setAltMobile(state.alt_mobile);
      setEmail(state.email);
      setAddress(state.address);
      setLicenceNo(state.licence_no);
      setLicenceDoc(state.licence_doc);
      setGovDoc(state);
      setShow(true);
    }
  }, [state]);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{Id === "" ? "Insert" : "Update"} Form Data</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <pre>{ }</pre>
          <Form.Group controlId="formFile" className="mb-3">
            <b>
              <Form.Label>Enter Pilot Name</Form.Label>
            </b>
            <Form.Control
              placeholder="Enter Pilot Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <b>
              <Form.Label>Enter Mobile</Form.Label>
            </b>
            <Form.Control
              placeholder="Enter Mobile"
              type="text"
              value={mobile}
              maxlength="10"
              pattern="[6789][0-9]{9}"
              onChange={(e) => setmMobile(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <b>
              <Form.Label>Enter alt Mobile</Form.Label>
            </b>
            <Form.Control
              placeholder="Enter alt Mobile"
              type="text"
              value={altMobile}
              maxlength="10"
              pattern="[6789][0-9]{9}"
              onChange={(e) => setAltMobile(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-2">
            <b>
              <Form.Label>Enter email</Form.Label>
            </b>
            <Form.Control
              placeholder="Enter email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <b>
              <Form.Label>Enter address</Form.Label>
            </b>
            <Form.Control
              placeholder="Enter address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <b>
              <Form.Label>Enter licenceNo</Form.Label>
            </b>
            <Form.Control
              placeholder="Enter licenceNo"
              type="text"
              value={licenceNo}
              onChange={(e) => setLicenceNo(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <b>
              <Form.Label>Enter Licence Doc</Form.Label>
            </b>
            <Form.Control
              type="file"
              size="lg"
              placeholder="Licence Doc"
              // value={licenceDoc.filename}
              onChange={licenceChange}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <b>
              <Form.Label>Enter Gov Doc</Form.Label>
            </b>
            <Form.Control
              type="file"
              size="lg"
              placeholder="Gov Doc"
              onChange={GovChange}
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

export default PilotModal;
