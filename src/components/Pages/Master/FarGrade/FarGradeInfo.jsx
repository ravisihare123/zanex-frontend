import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { Row, Card, Col, Breadcrumb, OverlayTrigger, Tooltip, } from "react-bootstrap"
import FarGradeModal from "./FarGradeModal";
import DataTable from 'react-data-table-component';
import * as Notification from "../../../Notifications"
import { authHeader, post } from '../../../../helper/api';
import { GetContext } from '../../../context/Context';

export default function FarGradeInfo() {
  const [showModal, setShowModal] = useState(false)
  const [state, setState] = useState({})
  const [data, setData] = useState([])
  const {userInfo} = GetContext()

  const fetchFareGrade = async () => {
    var params = {
      
    }
    var result = await post("master/fareGradeList",params, {
      headers:authHeader()
    })
    setData(result.data);
  }
  useEffect(() => {
    
    fetchFareGrade()
  }, [])
  
   const columns = [
     {
       name: "ID",
       selector: (row) => row.id,
       sortable: true,
     },
     {
       name: "Grade Name",
       selector: (row) => row.grade_name,
       sortable: false,
     },
     {
       name: "Pax Type",
       cell: (row) => paxType(row),
       sortable: false,
     },
     {
       name: "Taxable Amount",
       cell: (row) => TaxableAmt(row),
       sortable: false,
     },
     {
       name: "Tax",
       cell: (row) => Tax(row),
       sortable: false,
     },
     {
       name: "Action",
       cell: (row) => (
         <>
           <OverlayTrigger
             placement="bottom"
             delay={{ show: 250, hide: 400 }}
             overlay={editTooltip}
           >
             <i
               className="fe fe-edit fa-2x"
               onClick={() => handleUpdateShow(row)}
             ></i>
           </OverlayTrigger>
           <OverlayTrigger
             placement="bottom"
             delay={{ show: 250, hide: 400 }}
             overlay={deleteTooltip}
           >
             <i
               className="mx-4 fe fe-trash-2 fa-2x text-red"
               onClick={() => handleDelete(row)}
             ></i>
           </OverlayTrigger>
         </>
       ),
     },
  ];

  const paxType = (row) => {
    if (row !== "") {
      var data = JSON.parse(row.detail);
      return data.map((item) => (
        <>
          {item.pax_type}
          <br />
        </>
      ));
    }
  };

  const TaxableAmt = (row) => {
    if (row !== "") {
      var data = JSON.parse(row.detail);
      return data.map((item) => (
        <>
          {item.taxableAmt}
          <br />
        </>
      ));
    }
  };

  const Tax = (row) => {
    if (row !== "") {
      var data = JSON.parse(row.detail);
      return data.map((item) => (
        <>
          {item.tax}
          <br />
        </>
      ));
    }
  };

  const handleUpdateShow = (row) => {
    setState({ ...row });
  };

  const deleteTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Delete
    </Tooltip>
  );
  const editTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Edit
    </Tooltip>
  );
 const handleDelete = (row) => {
   var params = {
     uid: userInfo.uid,
     id: row.id,
   };

   Notification.swatPopup().then(async (result) => {
     if (result.isConfirmed) {
       var result = await post("master/deleteFareGrade", params, {
         headers: authHeader(),
       })

       if (result.status) {
         Notification.swatSuccess(result.msg);
       }
       fetchFareGrade()
     } else if (result.isDenied) {
       Notification.swatCancel();
     };
   });
 };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Fare-Grade</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Master
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Fare-Grade
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link
            to="#"
            className="btn btn-primary btn-icon text-white me-3"
            onClick={() => {
              setShowModal(true);
            }}
          >
            <span>
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Add FareGrade
          </Link>
          <FarGradeModal
            show={showModal}
            setShow={setShowModal}
            state={state}
            setState={setState}
            fetchFareGrade={ fetchFareGrade} />
        </div>
      </div>
      <Row className=" row-sm">
        <Col lg={12}>
          <Card>
            <Card.Body>
              <div className="table-responsive">
                <div className="table">
                  <DataTable
                    columns={columns}
                    data={data}
                    defaultSortField="id"
                    defaultSortAsc={false}
                    striped={true}
                    center={true}
                    persistTableHead
                    subHeader
                    subHeaderComponent={
                      <Row>
                        <Col>
                          <input
                            placeholder="Search here .."
                            className="form-control"
                            type="text"
                            // onChange={(e) => setSearch(e.target.value)}
                          />
                        </Col>
                      </Row>
                    }
                    pagination
                    highlightOnHover
                    paginationServer
                    // progressPending={loading}
                    // paginationTotalRows={totalRows}
                    // onChangeRowsPerPage={(perPage) => setPerPage(perPage)}
                    // onChangePage={(page) => setPage(page)}
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
