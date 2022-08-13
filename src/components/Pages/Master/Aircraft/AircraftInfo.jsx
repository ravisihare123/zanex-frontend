import React, { useState } from 'react'
import {
  Row,
  Card,
  Col,
  Breadcrumb,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link } from 'react-router-dom';
import AircraftModal from './AircraftModal';

export default function AircraftInfo() {
    const [showModal, setShowModal] = useState(false)
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
                  <AircraftModal
              show={showModal}
                    setShow={setShowModal} 
                />
              </div>
          </div>
          
    </div>
  )
}
