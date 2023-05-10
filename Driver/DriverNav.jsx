import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DriverStyle.css';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../services/login/AuthContext';
import { loginService } from '../../services/login/loginService';

function DriverNav() {
  // eslint-disable-next-line no-unused-vars
  const { role } = useContext(AuthContext);

  const r = loginService.getUserInfo().role;
  const doRender = (r === 'driver' || r === 'admin');

  return (doRender
    && (
      <NavDropdown title="Driver" id="navbarScrollingDropdown">
        <NavDropdown.Item as={Link} to="/driver">Home</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/driver-bag">Delivery Bag</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/driver-orders">Orders</NavDropdown.Item>
      </NavDropdown>
    )
  );
}
export default DriverNav;
