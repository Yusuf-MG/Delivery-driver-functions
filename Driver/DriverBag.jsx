/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import {
  Container, Form, Button, Table, Card, Toast, ToastContainer, Modal,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DriverStyle.css';
import driverService from '../../services/driver/driverService';

function DriverBag() {
  const [bags, setBags] = useState([]);
  const [show, setShow] = useState(false);
  const [showToast, setToast] = useState(false);
  const [message, setMessage] = useState('');
  const [orderId, setOrderId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setOrderId(id);
    setShow(true);
  };

  async function fetchData() {
    try {
      const response = await driverService.getList();
      setBags(response.orders);
    } catch (error) {
      setBags([]);
    }
  }

  const handleRemoveOrderFromBag = async (id) => {
    try {
      const response = await driverService.removeOrder(id);
      if (response) {
        await fetchData();
        setMessage('Order delivery confirmed');
      } else {
        setMessage('Error confirming order delivery');
      }
    } catch (error) {
      setMessage(error);
    }
    handleClose();
    setTimeout(() => {
      setToast(true);
    }, 200);
  };

  const displayValue = (value) => `$${parseFloat(value).toFixed(2)}`;

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="content-block">

      <h1 className="center-title">Delivery Bag</h1>

      <Container className="text-center align-items-center driver-bag">
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
            <Table striped responsive="sm">
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
                {(bags || []).map((bag) => (
                  <tr key={bag.order._id}>
                    <td>{bag.order.number}</td>
                    <td>{`${bag.order.user.firstName} ${bag.order.user.lastName}`}</td>
                    <td>{bag.order.user.street}</td>
                    <td>{bag.order.items.map((item) => item.quantity).reduce((prev, cur) => prev + cur, 0)}</td>
                    <td>{displayValue(bag.order.total)}</td>
                    <td>{new Date(bag.order.createdOn).toLocaleString()}</td>
                    <td>
                      <div className="d-grid gap-2">
                        <Button
                          className="btn search-btn col-sm-6 driver-btn"
                          variant="outline-light"
                          onClick={() => handleShow(bag.order._id)}
                        >
                          <FontAwesomeIcon icon="fa-solid fa-clipboard-check" />
                        </Button>
                        <Link
                          className="btn search-btn col-sm-6 driver-btn"
                          role="button"
                          to={`/order/${bag.order._id}`}
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
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className="modal-message">
            <Modal.Title><h2>Confirmation</h2></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6 className="modal-message">Are you sure you want to confirm the delivery?</h6>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn search-btn" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="modal-confirm-btn" onClick={() => handleRemoveOrderFromBag(orderId)}>Confirm</Button>
          </Modal.Footer>
        </Modal>
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
export default DriverBag;
