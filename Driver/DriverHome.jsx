import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import peaches from '../../images/peaches.jpg';
import corn from '../../images/corn-category.jpg';

function DriverHome() {
  return (
    <div className="content-block">
      <h1 className="center-title">Driver Home</h1>
      <div className="d-flex justify-content-center">
        <Row>
          <Col className="d-flex">
            <a href="/driver-orders">
              <Card className="d-flex text-white text-center align-items-center home-card" border="secondary" style={{ width: '18rem' }}>
                <Card.Img src={peaches} alt="peaches" className="peaches-pic" />
                <Card.ImgOverlay>
                  <Card.Title />
                  <Card.Link href="/driver-orders" className="link-light fs-1 fw-bold position-absolute top-50 start-50 translate-middle ">Available Orders</Card.Link>
                </Card.ImgOverlay>
              </Card>
            </a>
          </Col>
          <Col>
            <h1> </h1>
          </Col>
          <Col>
            <a href="/driver-bag">
              <Card className="d-flex text-white text-center align-items-center home-card" border="secondary" style={{ width: '18rem' }}>
                <Card.Img src={corn} alt="corn" className="peaches-pic" />
                <Card.ImgOverlay>
                  <Card.Title />
                  <Card.Link href="/driver-bag" className="link-light fs-1 fw-bold position-absolute top-50 start-50 translate-middle">Delivery Bag</Card.Link>
                </Card.ImgOverlay>
              </Card>
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default DriverHome;
