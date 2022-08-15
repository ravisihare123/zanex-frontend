import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AircraftModal from './AircraftModal';
import DataTable from 'react-data-table-component';
import {
  Row,
  Card,
  Col,
  Breadcrumb,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { post, authHeader } from "../../../../helper/api";
import * as Notification from "../../../Notifications";

export default function AircraftInfo() {
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState([]);
  const [state, setState] = useState({})

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

   const handleUpdateShow = (row) => {
     setState({ ...row });
  };
 const handleDelete = (row) => {
   var params = {
     id: row.id,
   };

   Notification.swatPopup().then(async (result) => {
     if (result.isConfirmed) {
       var result = await post("master/deleteaircraft", params, {
         headers: authHeader(),
       });

       if (result.status) {
         Notification.swatSuccess(result.msg);
       }
       fetchaircraft();
     } else if (result.isDenied) {
       Notification.swatCancel();
     }
   });
 };

  const fetchaircraft = async () => {
    // setLoading(true);

    var params = {
      // page: page,
      // per_page: perPage,
      // search_term: search,
    };

    var list = await post("master/aircraftList", params, {
      headers: authHeader(),
    });

    setData(list.data);
    // setTotalRows(list.total);
    // setLoading(false);
  };

  useEffect(() => {
    fetchaircraft()
  }, [])
  
  
  
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Aircraft Name",
      selector: (row) => row.name,
      sortable: false,
    },
    {
      name: "Aircraft No",
      selector: (row) => row.plane_no,
      sortable: false,
    },
    {
      name: "Category Name",
      selector: (row) => row.category_name,
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

 
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Aircraft</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Master
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Aircraft
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
            Add Aircraft
          </Link>
          <AircraftModal show={showModal}
            setShow={setShowModal}
            state={state}
            setState = {setState}
            fetchaircraft={fetchaircraft} />
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
