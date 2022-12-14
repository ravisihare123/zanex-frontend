import React, { useEffect, useState } from "react";
import Header from "../../../layouts/Header/Header";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserModal from "./UserModal";
import { Row, Col, Card,OverlayTrigger,Tooltip } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { post, API_URL, authHeader } from "../../../helper/api";
import * as Notification from "../../../components/Notifications/index"



export default function UserInfo() {
    const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([])
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(5)
  const [page, setPage] = useState(1)
  const [state, setState] = useState({})
  


  const fetchUser = async () => {
    var params = {
      perpage: perPage,
      page: page
    }
    var list = await post("user/displayUser", params, {
      headers: authHeader()
    })
    setData(list.data)
    setTotalRows(list.total)
  
  }

useEffect(() => {
 fetchUser()
}, [perPage, page])


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

    Notification.swatPopup().then(async (result) => {
      if (result.isConfirmed) {
          var res = await post("user/delete",{userid: row.userid})
      }
      if (res.status) {
        Notification.swatSuccess(res.msg);
       
        fetchUser()
      }
      else if (result.isDenied) {
        Notification.swatCancel();
        
      }
      })

  //   var result = post("user/delete", { userid: row.userid })
  //   if (result) {
  //     alert("deleted")
  //   }
  //   else {
  //     alert("not deleted")
  //   }
    
  }


  const handleUpdate = (row) => {

    // Notification.swatPopup().then(async (result) => {
    //   if (result.isConfirmed) {
    //     var res = await post("user/delete",{userid:row.userid})
    //   }
    //   if (res.status) {
    //     Notification.swatSuccess(res.msg)
    //   }
    //   else if (res.isDenied) {
    //     Notification.swatCancel()
    //   }
    // })
    setState({ ...row })
    
  }
    

  const columns = [
    {
      name: "ID",
      selector: (row) => [row.userid],
      sortable: false,
    },
    {
      name: "First Name",
      selector: (row) => [row.first_name],
      sortable: false,
    },
    {
      name: "Last Name",
      selector: (row) => [row.last_name],
      sortable: false,
    },
    {
      name: "Phone Number",
      selector: (row) => [row.phone_number],
      sortable: false,
    },
    {
      name: "Image",
      selector: (row) => <img src={`${API_URL}/images/${row.user_image}`} />,
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
                onClick={() => handleUpdate(row)}
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

          <UserModal
            show={showModal}
            setShow={setShowModal}
            state={state}
            setState={setState}
            fetchUser={ fetchUser} />
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
                    paginationTotalRows={totalRows}
                    onChangeRowsPerPage={(perPage) => setPerPage(perPage)}
                    onChangePage={(page) => setPage(page)}
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
