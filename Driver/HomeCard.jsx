import React from 'react';
import './Driver.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function HomeCard(props) {
  return (
    <div className="wrapper content-block">
      <div className="card">
        <div className="card_body">
          <img
            className="card_image"
            src={
              // eslint-disable-next-line react/destructuring-assignment, react/prop-types
              props.img
            }
            alt="order"
          />
          <h2 className="card_title">
            {
              // eslint-disable-next-line react/destructuring-assignment, react/prop-types
              props.title
            }
          </h2>
          <p className="card_description">
            {
              // eslint-disable-next-line react/destructuring-assignment, react/prop-types
              props.description
            }
          </p>
        </div>
        <Link
          to={
            // eslint-disable-next-line react/destructuring-assignment, react/prop-types
            props.route
          }
        >
          <Button className="card_btn" type="button">
            {
              // eslint-disable-next-line react/destructuring-assignment, react/prop-types
              props.btn
            }
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HomeCard;
