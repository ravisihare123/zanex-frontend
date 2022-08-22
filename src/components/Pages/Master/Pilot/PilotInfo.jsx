import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Card,
  Col,
  Breadcrumb,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { API_URL, authHeader, post } from "../../../../helper/api";

import * as Notification from "../../../Notifications"
import PilotModal from "./PilotModal"
import { GetContext } from "../../../context/Context";

export default function PilotInfo() {
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState([]);
  const [state, setState] = useState({})
  const { userInfo } = GetContext()
  
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: false,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
      sortable: false,
    },
    {
      name: "Alt Mobile",
      selector: (row) => row.alt_mobile,
      sortable: false,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: false,
    },
    {
      name: "Licence No",
      selector: (row) => row.licence_no,
      sortable: false,
    },
    {
      name: "Licence Doc",
      button: true,
      cell: (row) => (
        <a
          href={`${API_URL}/images/${row.licence_doc}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="primary" type="button">
            View
          </Button>
        </a>
      ),
    },
    {
      name: "Gov Doc",
      button: true,
      cell: (row) => (
        <a
          href={`${API_URL}/images/${row.gov_doc}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="primary" type="button">
            View
          </Button>
        </a>
      ),
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
            {/* </Link> */}
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
  const fetchPilot = async () => {
    var params = { 
    }
    var result = await post("master/pilotlist", params, {
      headers: authHeader(),
    });
    setData(result.data)
  }

  useEffect(() => {
    fetchPilot()
  },[])
 const handleDelete = (row) => {
   var params = {
     uid: userInfo.uid,
     id: row.id,
   };

   Notification.swatPopup().then(async (result) => {
     if (result.isConfirmed) {
       var res = await post("master/deletepilot", params, {
         headers: authHeader(),
       });

       if (res.status) {
         Notification.swatSuccess(res.msg);
       }
       fetchPilot();
     } else if (result.isDenied) {
       Notification.swatCancel();
     }
   });
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
  
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Pilot</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Master
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Pilot
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
            Add Pilot
          </Link>
          <PilotModal show={showModal}
            setShow={setShowModal}
            state={state }
            setState={setState }
            fetchPilot={ fetchPilot} />
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
