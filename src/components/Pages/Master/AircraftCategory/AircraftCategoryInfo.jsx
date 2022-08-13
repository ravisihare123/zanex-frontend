import React, { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import AircraftCategoryModal from "./AircraftCategoryModal";
import { Row, Card, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { authHeader, post } from "../../../../helper/api";
import * as Notification from "../../../Notifications"

export default function AircraftCategoryInfo() {
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState({});
  const [data, setData] = useState([]);

  const handleUpdateShow = (row) => {
    setState({ ...row });
  };

    const handleDelete = (row) => {
      var params = {
        id: row.id,
      };

      Notification.swatPopup().then(async (result) => {
        if (result.isConfirmed) {
          var res = await post("master/deleteaircraftcategory", params, {
            headers: authHeader(),
          });

          if (res.st) {
            Notification.swatSuccess(res.msg);
          }
          fetchAircraftCategory();
        } else if (result.isDenied) {
          Notification.swatCancel();
        }
      });
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

  const fetchAircraftCategory = async () => {
    var params = {};
    var list = await post("master/aircraftcategorylist", params, {
      headers: authHeader(),
    });

    setData(list.data);
  };

  useEffect(() => {
    fetchAircraftCategory();
  }, []);

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
      name: "CAPACITY",
      selector: (row) => [row.capacity],
      sortable: false,
    },
    {
      name: "FUAL-CHARGE",
      selector: (row) => [row.fual_charge],
      sortable: false,
    },
    {
      name: "MAINTENANCE-HOUR",
      selector: (row) => [row.maintenance_hour],
      sortable: false,
    },
    {
      name: "BLOCK-SEAT",
      selector: (row) => [row.block_seat],
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
          <h1 className="page-title">Aircraft-Category</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Master
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Aircraft-Category
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
            Add Aircraft-Category
          </Link>
          <AircraftCategoryModal
            show={showModal}
            setShow={setShowModal}
            state={state}
            setState={setState}
            fetchAircraftCategory={fetchAircraftCategory}
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
