import React, { useState } from 'react'
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

export default function PaxInfo() {
  const [showModal, setShowModal] = useState(false)
  const [state, setState] = useState({})
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
          <PaxModal show={showModal}
            setShow={setShowModal}
            state={state}
            setState={setState } />
        </div>
        </div>
    </div>
  )
}
