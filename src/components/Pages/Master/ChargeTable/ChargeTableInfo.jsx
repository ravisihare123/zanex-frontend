import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Row, Card, Col, Breadcrumb, OverlayTrigger, Tooltip, } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { authHeader, post } from '../../../../helper/api';
import { GetContext } from "../../../context/Context";
import  * as Notification from "../../../Notifications"

export default function ChargeTableInfo() {

  const [data, setData] = useState([]);  
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  const {userInfo} = GetContext()

  const chargetablelist = async () => {
    var params = {
      search_term: search
    }
    var result = await post("/master/chargetablelist",params, {
       headers: authHeader()
    })
    setData(result.data)
  }
  

  useEffect(() => {
   chargetablelist()
  }, [search])
  

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Charge Name",
      selector: (row) => row.charge_name,
      sortable: false,
    },
    {
      name: "Convenience Charge",
      selector: (row) => row.convenience_charge,
      sortable: false,
    },
    {
      name: "Over Weight Charge",
      selector: (row) => row.over_weight_charge,
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
              onClick={() =>
                navigate("/master/chargetable/form", {
                  state: row.id,
                })
              }
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
        var params = {
          uid: userInfo.uid,
          id: row.id
        }
        var rsult = await post("master/deleteChargeTable", params, {
          headers: authHeader(),
        });

        if (rsult.status) {
          Notification.swatSuccess(rsult.msg);
        }
        chargetablelist();
      } else if (rsult.isDenied) {
        Notification.swatCancel();
      }
    });
  }

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
        <div className="ms-auto pageheader-btn">
          <Link
            to="/master/chargetable/form"
            className="btn btn-primary btn-icon text-white me-3"
          >
            <span>
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Add Charge-Table
          </Link>
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
