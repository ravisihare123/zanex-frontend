import React, { useState } from "react";
import Header from "../../../layouts/Header/Header";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserModal from "./UserModal";
import { Row, Col, Card,OverlayTrigger,Tooltip } from "react-bootstrap";
import DataTable from "react-data-table-component";


export default function UserInfo() {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState([])

    //  const deleteTooltip = (props) => (
    //    <Tooltip id="button-tooltip" {...props}>
    //      Delete
    //    </Tooltip>
    //  );
    //  const editTooltip = (props) => (
    //    <Tooltip id="button-tooltip" {...props}>
    //      Edit
    //    </Tooltip>
    //  );

    

//   const columns = [
//     {
//       name: "ID",
//       selector: (row) => [row.user_id],
//       sortable: false,
//     },
//     {
//       name: "First Name",
//       selector: (row) => [row.first_name],
//       sortable: false,
//     },
//     {
//       name: "Last Name",
//       selector: (row) => [row.last_name],
//       sortable: false,
//     },
//     {
//       name: "Phone Number",
//       selector: (row) => [row.Phone_number],
//       sortable: false,
//     },
//     {
//       name: "Imge",
//       selector: (row) => [row.user_image],
//       sortable: false,
//     },
//     {
//       name: "Action",
//       cell: (row) => (
//         <>
//           <OverlayTrigger
//             placement="bottom"
//             delay={{ show: 250, hide: 400 }}
//             overlay={editTooltip}
//           >
//             <i
//               className="fe fe-edit fa-2x"
//             //   onClick={() => handleUpdateShow(row)}
//             ></i>
//             {/* </Link> */}
//           </OverlayTrigger>
//           <OverlayTrigger
//             placement="bottom"
//             delay={{ show: 250, hide: 400 }}
//             overlay={deleteTooltip}
//           >
//             <i
//               className="mx-4 fe fe-trash-2 fa-2x text-red"
//             //   onClick={() => handleDelete(row)}
//             ></i>
//           </OverlayTrigger>
//         </>
//       ),
//     },
//   ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">User Info</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              user
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              user info
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
            Add User
          </Link>

          <UserModal show={showModal} setShow={setShowModal} />
        </div>
      </div>
      {/* <Row className=" row-sm">
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
      </Row> */}
    </div>
  );
}
