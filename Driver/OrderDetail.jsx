/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Image, Table, Button, Row, Container, Col, ListGroup, ListGroupItem,
} from 'react-bootstrap';
import './OrderDetail.css';
import orderService from '../../services/order/orderService';
import OrderStatus from '../Order/OrderStatus';
import OrderTrack from '../Order/OrderTrack';

function OrderDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [count, setCount] = useState('');
  const [total, setTotal] = useState('');
  const [items, setItems] = useState([]);

  const displayValue = (value) => `$${parseFloat(value).toFixed(2)}`;

  const loadData = async () => {
    try {
      const data = await orderService.getDetail(id);
      const order = data[0];
      setNumber(order.number);
      setName(`${order.user.firstName} ${order.user.lastName}`);
      setAddress(`${order.user.street}, ${order.user.city}, ${order.user.postal_code}`);
      setDate(new Date(order.createdOn).toLocaleString());
      setStatus(order.status);
      setTotal(displayValue(order.total));
      setCount(order.items.length);
      setItems(order.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="content-block">
      <h1>Order Details</h1>
      <Container>
        <Col>
          <Row>
            <Col>
              <Container className="">
                <Table responsive="sm" className="order-detail-table table-content">
                  <tbody>
                    {(items || []).map((item) => (
                      <tr key={item._id}>
                        <td>
                          <Image
                            src={item?.product?.image}
                            className="img-fluid rounded-3 product-image"
                            alt={item?.product?.name}
                          />
                        </td>
                        <td>
                          <ListGroup className="list-content">
                            <ListGroupItem><h2 className="color-font">{item?.product?.name}</h2></ListGroupItem>
                            <ListGroupItem className="group-item">
                              Item Quantity:&nbsp;
                              {item.quantity}
                            </ListGroupItem>
                            <ListGroupItem className="group-item">
                              Cost per item&nbsp;
                              {displayValue(item.price)}
                            </ListGroupItem>
                            <ListGroupItem className="group-item">
                              Total Cost:&nbsp;
                              {displayValue(item.total)}
                            </ListGroupItem>
                          </ListGroup>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Container>
            </Col>
            <Col>
              <Container>
                <Row>
                  <h5 className="detail-data">
                    Order#&nbsp;
                    <span className="color-data">{number}</span>
                  </h5>
                  <h5 className="detail-data">
                    Customer name:&nbsp;
                    <span className="color-data">{name}</span>
                  </h5>
                  <h5 className="detail-data">
                    Address:&nbsp;
                    <span className="color-data">{address}</span>
                  </h5>
                  <h5 className="detail-data">
                    Ordered @&nbsp;
                    <span className="color-data">{date}</span>
                  </h5>
                  <h5 className="detail-data">
                    Total:&nbsp;
                    {' '}
                    <span className="color-data">{total}</span>
                  </h5>
                  <h5 className="detail-data">
                    Item count:&nbsp;
                    {' '}
                    <span className="color-data">{count}</span>
                  </h5>
                  <h5 className="detail-data">
                    Status&nbsp;
                    <OrderStatus status={status} />
                    {/* <span className="color-data">{status}</span> */}
                  </h5>
                  <h5 className="detail-data">Tracking</h5>
                  <OrderTrack status={status} />
                  <Button className="prev-button" onClick={() => navigate(-1)}>Previous Page</Button>
                </Row>
              </Container>
            </Col>
          </Row>
        </Col>
      </Container>
    </div>
  );
}

export default OrderDetail;
