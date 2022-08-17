import React, { useState,useEffect } from 'react'
import { Link } from "react-router-dom";
import {
  Row,
  Card,
  Col,
  Breadcrumb,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import PaxModal from "./PaxModal";
import DataTable from "react-data-table-component"
import { authHeader, post } from '../../../../helper/api';
import { GetContext } from '../../../context/Context';
import * as Notification from "../../../Notifications"

export default function PaxInfo() {
  const [showModal, setShowModal] = useState(false)
  const [state, setState] = useState({})
  const [data, setData] = useState([])
  const [search, setSearch] = useState(1);


  const { userInfo} = GetContext()


  const fetchPax = async () => {
    var params = {
    search_item:search 
  }
  
    var result = await post('master/paxList',params, {
      headers:authHeader()
    })
    setData(result.data)
  }
  useEffect(() => {
    fetchPax()
  }, [search])
  
  
  

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
        var res = await post("master/deletePax", params, {
          headers: authHeader(),
        });

        if (res.status) {
          Notification.swatSuccess(res.msg);
        }
        fetchPax();
      } else if (result.isDenied) {
        Notification.swatCancel();
      }
    });
  };

const columns = [
  {
    name: "ID",
    selector: (row) => [row.id],
    sortable: false,
  },
  {
    name: "TYPE",
    selector: (row) => [row.type],
    sortable: false,
  },
  {
    name: "CODE",
    selector: (row) => [row.code],
    sortable: false,
  },
  {
    name: "AGE-GROUP",
    selector: (row) => [row.age_group],
    sortable: false,
  },
  {
    name: "DESCRIPTION",
    selector: (row) => [row.description],
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
          <h1 className="page-title">Pax</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Master
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Pax
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
            Add Pax
          </Link>
          <PaxModal
            show={showModal}
            setShow={setShowModal}
            state={state}
            setState={setState}
            fetchPax = {fetchPax}
          />
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
                            onChange={(e) => setSearch(e.target.value)}
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
