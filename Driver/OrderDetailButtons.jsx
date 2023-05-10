import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faBagShopping,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

function OrderDetailButtons() {
  return (
    <div className="container">
      <FontAwesomeIcon icon={faLocationDot} size="4x" />
      <FontAwesomeIcon icon={faBagShopping} size="4x" />
      <FontAwesomeIcon icon={faChevronLeft} size="4x" />
    </div>
  );
}

export default OrderDetailButtons;
