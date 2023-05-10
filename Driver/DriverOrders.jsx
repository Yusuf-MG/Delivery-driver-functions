/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  Container, Form, Button, Table, Card, Toast, ToastContainer,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DriverStyle.css';
import orderService from '../../services/order/orderService';
import driverService from '../../services/driver/driverService';

function DriverOrders() {
  const [orders, setOrders] = useState([]);
  const [showToast, setToast] = useState(false);
  const [message, setMessage] = useState('');

  async function fetchData() {
    try {
      const response = await orderService.getOnlyPaid();
      setOrders(response);
    } catch (error) {
      setOrders([]);
    }
  }

  const handleAddOrderToBag = async (id) => {
    try {
      const response = await driverService.addOrder(id);
      if (response) {
        await fetchData();
        setMessage('Order added to bag');
      } else {
        setMessage('Error adding order to bag');
      }
    } catch (error) {
      setMessage(error);
    }
    setToast(true);
  };

  const displayValue = (value) => `$${parseFloat(value).toFixed(2)}`;

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="content-block">
      <h1 className="center-title">Available Orders</h1>

      <Container className="container">

        <Card>
          <Card.Header>
            <Form className="search form-inline mw-50">
              <Form.Control
                type="search"
                placeholder="Search"
                className="search-box"
                aria-label="Search"
              />
            </Form>
          </Card.Header>
          <Card.Body>
            <Table striped responsive="sm" className="table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Customer Name</th>
                  <th>Address</th>
                  <th>Items</th>
                  <th>Total Cost</th>
                  <th>Order Date</th>
                  <th className="align-action">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(orders || []).map((order) => (
                  <tr key={order._id}>
                    <td>{order.number}</td>
                    <td>{`${order.user.firstName} ${order.user.lastName}`}</td>
                    <td>{order.user.street}</td>
                    <td>{order.items.map((item) => item.quantity).reduce((prev, cur) => prev + cur, 0)}</td>
                    <td>{displayValue(order.total)}</td>
                    <td>{new Date(order.createdOn).toLocaleString()}</td>
                    <td>
                      <div className="d-grid gap-2">
                        <Button className="btn search-btn col-sm-6 driver-btn" variant="outline-light" onClick={() => handleAddOrderToBag(order._id)}>
                          <FontAwesomeIcon icon="fa-solid fa-shopping-basket" />
                        </Button>
                        <Link
                          className="btn search-btn col-sm-6 driver-btn"
                          role="button"
                          to={`/order/${order._id}`}
                          variant="outline-light"
                        >
                          <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                        </Link>
                      </div>

                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>

        </Card>
        <ToastContainer className="p-3" position="middle-center">
          <Toast
            onClose={() => setToast(false)}
            autohide
            animation="true"
            show={showToast}
            delay={3000}
            position="middle-center"
          >
            <Toast.Body className="toast-cart">{message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>

    </div>
  );
}

export default DriverOrders;
