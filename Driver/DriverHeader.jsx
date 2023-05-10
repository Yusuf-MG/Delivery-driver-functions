import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const React = require('react');

function Header() {
  return (
    <div className="header content-block">
      <Container fluid>
        <Row>
          <Col md={5}>
            <div className="title">
              <h1 className="title-2">Driver</h1>
            </div>
          </Col>
        </Row>
      </Container>
    </div>

  );
}

export default Header;
