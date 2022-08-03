import React from "react";
import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
import { Breadcrumb, Col, Row, Card } from "react-bootstrap";
import * as dashboard from "../../data/dashboard/dashboard";
import { Link } from "react-router-dom";
import { GetContext } from "../context/Context";
export default function Dashboard() {
  const { userInfo } = GetContext()
  alert(JSON.stringify({ "dashboard": userInfo?.email }));
  return (
    <div>
      <div className="page-header ">
        <div>
          <h1 className="page-title">Dashboard 01</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Dashboard 01 {userInfo?.email}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
}
