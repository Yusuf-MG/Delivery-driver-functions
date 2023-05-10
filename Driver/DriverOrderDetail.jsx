import React from 'react';
import OrderDetail from './OrderDetail';
import OrderDetailButtons from './OrderDetailButtons';
import OrderList from './OrderList';

function DriverOrderDetail() {
  return (
    <div className="content-block">
      <h1>Driver Order Detail</h1>
      <div className="container">
        <div className="row">
          <div className="col">
            <OrderDetail />
          </div>
          <div className="col">
            <OrderList />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <OrderDetailButtons />
        </div>
      </div>
    </div>
  );
}

export default DriverOrderDetail;
