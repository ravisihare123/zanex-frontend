import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import {Row,Card,Col,Breadcrumb,OverlayTrigger,Tooltip,} from "react-bootstrap";

export default function ChargeTableInfo() {
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
            to="/master/ChargeTable/InsertEdit"
            className="btn btn-primary btn-icon text-white me-3"
          >
            <span>
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Add Charge-Table
          </Link>
        </div>
      </div>
    </div>
  );
}
