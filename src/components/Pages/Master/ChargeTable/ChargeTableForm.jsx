import React,{useEffect} from 'react';
import {
  Button,
  Form,
  Modal,
  Table,
  Col,
  Row,
  Breadcrumb,
  Card,
} from "react-bootstrap";
import { useChargeTableContext } from './ChargeTableContext';
import Select from "react-select";
import { authHeader, get, post } from "../../../../helper/api";

export default function ChargeTableForm() {

  const {
    count,
    setPTypeData
  
  } = useChargeTableContext()
  
  const fetchPax = async () => {
    const result = await get("master/getpax", {
      headers: authHeader()
    })
    // alert(JSON.stringify(result.data))
    setPTypeData(result.data)
  }

  useEffect(() => {
   fetchPax()
  }, [])
  
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Charge-Table</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Master
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Charge-Table
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Row className=" row-sm">
        <Col lg={12}>
          <Card>
            <Card.Body>
              <h6> {count} of 4</h6>

              {count === 1 ? <Form1 /> : null}
              {count === 2 ? <Form2 /> : null}
              {count === 3 ? <Form3 /> : null}
              {count === 4 ? <Form4 /> : null}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );

 
};
const Form1 = () => {
  const {
    count,
    setCount,
    chargeName,
    setChargeName,
    convenienceCharge,
    setConvenienceCharge,
    overWeightCharge,
    setOverWeightCharge
  } = useChargeTableContext();
  
  const validateNextStep = () => {

    setCount(count+1)
    
  }
   return (
     <>
       <h1>Basic Detatils</h1>
       <Form>
         <br />
         <Row className="g-2">
           <Col md>
             <Form.Group className="mb-3">
               <b>
                 <Form.Label>Enter Charge Name</Form.Label>
               </b>
               <Form.Control
                 placeholder="Charge Name"
                 type="text"
                 value={chargeName}
                 onChange={(e) => setChargeName(e.target.value)}
                 required
               />
             </Form.Group>
           </Col>
           <Col md>
             <div className="row">
               <div className="col-md">
                 <Form.Group controlId="formFile">
                   <b>
                     <Form.Label>Enter Convenience Charge</Form.Label>
                   </b>
                   <Form.Control
                     placeholder="Convenience Charge"
                     type="number"
                     value={convenienceCharge}
                     onChange={(e) => setConvenienceCharge(e.target.value)}
                     required
                   />
                 </Form.Group>
               </div>
             </div>
           </Col>

           <br />
         </Row>
         <Row>
           <Col md>
             <Form.Group controlId="formFile" className="mb-3">
               <b>
                 <Form.Label>Enter Over Weight Charge</Form.Label>
               </b>
               <Form.Control
                 placeholder="over Weight Charge"
                 type="number"
                 value={overWeightCharge}
                 onChange={(e) => setOverWeightCharge(e.target.value)}
                 required
               />
             </Form.Group>
           </Col>
           <br />
         </Row>

         <button
           className="btn btn-primary"
           type="submit"
           onClick={validateNextStep}
           disabled={count > 3}
         >
           Next
         </button>
       </Form>
     </>
   );
};
 
const Form2 = () => {
  const {
    count,
    setCount,
    setTaxType,
    setValue,
    setHours,
    pTypeData,
    rebooking,
    setRebooking,   
  } = useChargeTableContext()

  const getRebookingData = (e) => {
    var temp = rebooking;

    temp.push({
      id: e.value,
      type: e.label,
      code: e.code,
    });

    console.log("Temp:", temp);
    setRebooking([...temp]);
  }
  return (
    <>
      <h1>Rebooking Detatils</h1>
      <Form>
        <br />
        <Row className="g-2">
          <Col md>
            <Form.Group controlId="formFile" className="mb-3">
              <b>
                <Form.Label>Pax Type</Form.Label>
              </b>

              <Select
                onChange={(e) => getRebookingData(e)}
                options={pTypeData}
              />
            </Form.Group>
            {rebooking.length === 0 ? (
              "No Data Found"
            ) : (
              <>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Pax Type</th>
                      <th>Tax Type</th>
                      <th>Value</th>
                      <th>Hour</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rebooking.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.type}</td>
                          <td>
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              onChange={(e) => {
                                setTaxType(e.target.value);
                                var temp = rebooking;
                                temp[index].tax_type = e.target.value;
                                setRebooking([...temp]);
                              }}
                              value={item.tax_type}
                            >
                              <option selected disabled>
                                Select Tax-Type
                              </option>
                              <option value="Fixed">Fixed</option>
                              <option value="Percentage">Percentage</option>
                            </select>
                          </td>
                          <td>
                            <Form.Group controlId="formFile" className="mb-3">
                              <Form.Control
                                placeholder="Value"
                                type="number"
                                value={item.value}
                                onChange={(e) => {
                                  setValue(e.target.value);
                                  var temp = rebooking;
                                  temp[index].value = e.target.value;
                                  setRebooking([...temp]);
                                }}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group controlId="formFile" className="mb-3">
                              <Form.Control
                                placeholder="Hours"
                                type="time"
                                value={item.hours}
                                onChange={(e) => {
                                  setHours(e.target.value);
                                  var temp = rebooking;
                                  temp[index].hours = e.target.value;
                                  setRebooking([...temp]);
                                }}
                              />
                            </Form.Group>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </>
            )}
          </Col>

          <br />
        </Row>

        <br />
      </Form>
      <button
        className="btn btn-primary mx-3"
        type="submit"
        onClick={() => setCount(count - 1)}
        disabled={count < 2}
      >
        Back
      </button>
      <button
        className="btn btn-primary"
        type="submit"
        onClick={() => setCount(count + 1)}
        disabled={count > 3}
      >
        Next
      </button>
    </>
  );
};

const Form3 = () => {

  const { 
    count,
    setCount,
    noshow,
    setNoshow,
    setTaxType,
    setValue,
    pTypeData
  } = useChargeTableContext()

  const getShowData = (e) => {
        var temp = noshow;

        temp.push({
          id: e.value,
          type: e.label,
          code: e.code,
        });

        console.log("Temp:", temp);
        setNoshow([...temp]);
  }
  return (
    <>
      <h1>NoShow Detatils</h1>
      <Form>
        <br />
        <Row className="g-2">
          <Col md>
            <Form.Group controlId="formFile" className="mb-3">
              <b>
                <Form.Label>Pax Type</Form.Label>
              </b>

              <Select onChange={(e) => getShowData(e)} options={pTypeData} />
            </Form.Group>
            {noshow.length === 0 ? (
              "No Data Found"
            ) : (
              <>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Pax Type</th>
                      <th>Tax Type</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {noshow.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.code}</td>
                          <td>
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              onChange={(e) => {
                                setTaxType(e.target.value);
                                var temp = noshow;
                                temp[index].tax_type = e.target.value;
                                setNoshow([...temp]);
                              }}
                              value={item.tax_type}
                            >
                              <option selected disabled>
                                Select Tax-Type
                              </option>
                              <option value="Fixed">Fixed</option>
                              <option value="Percentage">Percentage</option>
                            </select>
                          </td>
                          <td>
                            <Form.Group controlId="formFile" className="mb-3">
                              <Form.Control
                                placeholder="Value"
                                type="number"
                                value={item.value}
                                onChange={(e) => {
                                  setValue(e.target.value);
                                  var temp = noshow;
                                  temp[index].value = e.target.value;
                                  setNoshow([...temp]);
                                }}
                              />
                            </Form.Group>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </>
            )}
          </Col>

          <br />
        </Row>

        <br />
      </Form>
      <button
        // variant="primary mx-3"
        className="btn btn-primary mx-3"
        type="submit"
        onClick={() => setCount(count - 1)}
        disabled={count < 2}
      >
        Back
      </button>
      <button
        className="btn btn-primary"
        type="submit"
        onClick={() => setCount(count + 1)}
        disabled={count > 3}
      >
        Next
      </button>
    </>
  );
};

const Form4 = () => {
  const {
    chargeName,
    setChargeName,
    count,
    setCount,
    convenienceCharge,
    setConvenienceCharge,
    overWeightCharge,
    setOverWeightCharge,
    setPaxTypes,
    setTaxType,
    setValue,
    setHours,
    Id,
    setId,
    pTypeData,
    rebooking,
    setRebooking,
    noshow,
    setNoshow,
    cancel,
    setCancel,
  } = useChargeTableContext();
  const getCancelData = (e) => {
    
     var temp = cancel;

     temp.push({
       id: e.value,
       type: e.label,
       code: e.code,
     });

     console.log("Temp:", temp);
     setCancel([...temp]);
  }
  const handleEditSubmit = () => {
    
  }
  return (
    <>
      <h1>Cancel Detatils</h1>
      <Form>
        <br />
        <Row className="g-2">
          <Col md>
            <Form.Group controlId="formFile" className="mb-3">
              <b>
                <Form.Label>Pax Type</Form.Label>
              </b>

              <Select onChange={(e) => getCancelData(e)} options={pTypeData} />
            </Form.Group>
            {cancel.length === 0 ? (
              "No Data Found"
            ) : (
              <>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Pax Type</th>
                      <th>Tax Type</th>
                      <th>Value</th>
                      <th>Hour</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cancel.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.code}</td>
                          <td>
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              onChange={(e) => {
                                setTaxType(e.target.value);
                                var temp = cancel;
                                temp[index].tax_type = e.target.value;
                                setCancel([...temp]);
                              }}
                              value={item.tax_type}
                            >
                              <option selected disabled>
                                Select Tax-Type
                              </option>
                              <option value="Fixed">Fixed</option>
                              <option value="Percentage">Percentage</option>
                            </select>
                          </td>
                          <td>
                            <Form.Group controlId="formFile" className="mb-3">
                              <Form.Control
                                placeholder="Value"
                                type="number"
                                value={item.value}
                                onChange={(e) => {
                                  setValue(e.target.value);
                                  var temp = cancel;
                                  temp[index].value = e.target.value;
                                  setCancel([...temp]);
                                }}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group controlId="formFile" className="mb-3">
                              <Form.Control
                                placeholder="Hours"
                                type="time"
                                value={item.hours}
                                onChange={(e) => {
                                  setHours(e.target.value);
                                  var temp = cancel;
                                  temp[index].hours = e.target.value;
                                  setCancel([...temp]);
                                }}
                              />
                            </Form.Group>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </>
            )}
          </Col>

          <br />
        </Row>

        <br />
      </Form>
      <Button
        className="btn btn-primary mx-3"
        type="submit"
        onClick={() => setCount(count - 1)}
        disabled={count < 2}
      >
        Back
      </Button>
      <Button
        variant="primary"
        type="submit"
        onClick={(e) => {
          handleEditSubmit(e);
        }}
      >
        Submit
      </Button>
    </>
  );
};
