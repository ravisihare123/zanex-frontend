import React, { useState, useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import AirportModal from "./AirportModal";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { authHeader, post } from "../../../../helper/api";
import * as Notification from "../../../../components/Notifications";
import { GetContext } from "../../../context/Context";

export default function AirportInfo() {
  const {userInfo} = GetContext()
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [state, setState] = useState({});

  const handleDelete = (row) => {
    var params = {
      uid: userInfo.uid,
      id: row.id,
    };

    Notification.swatPopup().then(async (result) => {
      if (result.isConfirmed) {
        var res = await post("master/delete_airport", params, {
          headers: authHeader(),
        });

        if (res.st) {
          Notification.swatSuccess(res.msg);
        }
        fetchAirport();
      } else if (result.isDenied) {
        Notification.swatCancel();
      }
    });
  };

  const handleUpdateShow = (row) => {
    setState({ ...row });
  };
  const fetchAirport = async () => {
    const params = {};
    var list = await post("master/airportlist", params, {
      headers: authHeader(),
    });
    setData(list.data);
  };

  useEffect(() => {
    fetchAirport();
  }, []);

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

  const columns = [
    {
      name: "ID",
      selector: (row) => [row.id],
      sortable: false,
    },
    {
      name: "NAME",
      selector: (row) => [row.name],
      sortable: false,
    },
    {
      name: "CODE",
      selector: (row) => [row.code],
      sortable: false,
    },
    {
      name: "TERMINAL",
      selector: (row) => [row.terminal],
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
          <h1 className="page-title">Airport</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Master
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              airport
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
            Add airport
          </Link>
          <AirportModal
            show={showModal}
            setShow={setShowModal}
            fetchAirport={fetchAirport}
            state={state}
            setState={setState}
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
                            // onChange={(e) => setSearch(e.target.value)}
                          />
                        </Col>
                      </Row>
                    }
                    pagination
                    highlightOnHover
                    paginationServer
                    // progressPending={loading}
                    //   paginationTotalRows={totalRows}
                    //   onChangeRowsPerPage={(perPage) => setPerPage(perPage)}
                    //   onChangePage={(page) => setPage(page)}
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
