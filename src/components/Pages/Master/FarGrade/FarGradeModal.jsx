import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from "react-bootstrap";
import { get, authHeader, post } from "../../../../helper/api";
import { GetContext } from "../../../context/Context";
import * as Notification from "../../../Notifications"
export default function FarGradeModal({show, setShow, state, setState,fetchFareGrade}) {

  const [Id, setId] = useState("");
  const [gradeName, setGradeName] = useState("");
  const [paxTypes, setPaxTypes] = useState("");
  const [taxableAmount, setTaxableAmount] = useState("");
  const [tax, setTax] = useState("");
  const [pTypeData, setPTypeData] = useState([]);
  const { userInfo } = GetContext();
  
  const handleClose = () => {
    setId("");
    setGradeName("");
    setPaxTypes("");
    setTaxableAmount("");
    setTax("");
    setPTypeData([]);
    setState({});
    setShow(false);
  };
  const fetchPax = async (req, res) => {
    var result = await get("master/getpax", {
      headers: authHeader()
    })
    setPTypeData(result.data)
  }
  useEffect(() => {
    if (state.id) {
      setShow(true)
      setId(state.id)
      setGradeName(state.grade_name)
      const detail = JSON.parse(state.detail)
      const temp = detail.map((item) => ({ label:item.pax_type,  taxableAmt:item.taxableAmt,tax:item.tax }))
      setPTypeData([...temp]);
    }
    fetchPax();
  }, [state])
  

  const handleSubmit = async(e) => {
    e.preventDefault()
    var params = {
      uid: userInfo.uid,
      id: Id,
      grade_name: gradeName,
      detail: pTypeData.map((item) => ({
        pax_type: item.label,
        taxableAmt: item.taxableAmt,
        tax: item.tax,
      })),
    };
    var result = await post("master/insertEditFarGrade", params, {
      headers: authHeader()
    })
    if (result.status) {
      Notification.swatSuccess(result.msg);
      setShow(false);
      fetchFareGrade()
      setId("");
      setGradeName("");
      setPaxTypes("");
      setTaxableAmount("");
      setTax("");
      setState({});
      setPTypeData([]);
    } else {
      alert(result.msg);
    }
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
              <Form.Label>Enter Grade Name</Form.Label>
            </b>
            <Form.Control
              placeholder="Enter Grade Name"
              type="text"
              value={gradeName}
              onChange={(e) => setGradeName(e.target.value)}
              required
            />
          </Form.Group>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Pax Type</th>
                <th>Taxable Amount</th>
                <th>Tax</th>
              </tr>
            </thead>
            <tbody>
              {pTypeData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.label}</td>
                    <td>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control
                          placeholder="Taxable Amount"
                          type="text"
                          value={item.taxableAmt}
                          onChange={(e) => {
                            setTaxableAmount(e.target.value);
                            var temp = pTypeData;
                            temp[index].taxableAmt = e.target.value;
                            setPTypeData([...temp]);
                          }}
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control
                          placeholder="Tax"
                          type="text"
                          value={item.tax}
                          onChange={(e) => {
                            setTax(e.target.value);
                            var temp = pTypeData;
                            temp[index].tax = e.target.value;
                            setPTypeData([...temp]);
                          }}
                        />
                      </Form.Group>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
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
