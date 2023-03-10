import React, { useContext } from "react";
import { Store } from "../Store";
import Dropdown from 'react-bootstrap/Dropdown'
const OptionMenu = () => {
    const { state} = useContext(Store);
    const {
      userInfo,
    } = state;
  
  return userInfo && userInfo.isAdmin === true ? (
    <div className="option-menu">
      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-basic"
          style={{
            backgroundColor: "#f0c140",
            border: "none",
            color: "#111",
            margin: "3px",
          }}
        >
          Admin
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="https://shoppee-center.netlify.app/admin/dashboard">
            Dashboard
          </Dropdown.Item>
          <Dropdown.Item href="https://shoppee-center.netlify.app/admin/products">
            Products
          </Dropdown.Item>
          <Dropdown.Item href="https://shoppee-center.netlify.app/admin/users">
            Users
          </Dropdown.Item>
          <Dropdown.Item href="https://shoppee-center.netlify.app/admin/categories">
            Categories
          </Dropdown.Item>
          <Dropdown.Item href="https://shoppee-center.netlify.app/admin/orders">
            Orders
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  ) : (
    ""
  );
}

export default OptionMenu