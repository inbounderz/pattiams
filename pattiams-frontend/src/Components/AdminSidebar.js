import React from "react";
import "./AdminSidebar.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  const changeBg = (curr) => {
    if (location.pathname === curr) {
      return "rgba(233, 192, 198)";
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <i className="logo fab fa-sketch"></i>
        <span className="brand">Admin</span>
      </div>
      <div className="sidebar-center">
        <ul className="list">
          <Link
            to="/admin-dashboard"
            className="text-decoration-none li-link-class"
          >
            <li
              className="list-item"
              style={{ backgroundColor: changeBg("/admin-dashboard") }}
            >
              <i className="list-item-icon fas fa-home"></i>
              <span className="list-item-text">Dashboard</span>
            </li>
          </Link>
          <Link
            to="/admin-userslist"
            className="text-decoration-none li-link-class"
          >
            <li
              className="list-item"
              style={{ backgroundColor: changeBg("/admin-userslist") }}
            >
              <i className="list-item-icon fas fa-search"></i>
              <span className="list-item-text">Users' List</span>
            </li>
          </Link>
          <Link
            to="/admin-productlist"
            className="text-decoration-none li-link-class"
          >
            <li
              className="list-item"
              style={{ backgroundColor: changeBg("/admin-productlist") }}
            >
              <i className="list-item-icon fas fa-stream"></i>
              <span className="list-item-text">Products' List</span>
            </li>
          </Link>
          <Link
            to="/admin-orderlist"
            className="text-decoration-none li-link-class"
          >
            <li
              className="list-item"
              style={{ backgroundColor: changeBg("/") }}
            >
              <i className="list-item-icon fas fa-book"></i>
              <span className="list-item-text">Orders' list</span>
            </li>
          </Link>
          <li className="list-item" style={{ backgroundColor: changeBg("/") }}>
            <i className="list-item-icon fas fa-users"></i>
            <span className="list-item-text">Community</span>
          </li>
          <li className="list-item" style={{ backgroundColor: changeBg("/") }}>
            <i className="list-item-icon fas fa-toolbox"></i>
            <span className="list-item-text">Tools</span>
          </li>
          <li className="list-item" style={{ backgroundColor: changeBg("/") }}>
            <i className="list-item-icon fas fa-shopping-basket"></i>
            <span className="list-item-text">Market</span>
          </li>
          <li className="list-item" style={{ backgroundColor: changeBg("/") }}>
            <i className="list-item-icon far fa-question-circle"></i>
            <span className="list-item-text">Resources</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
