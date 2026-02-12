import React from "react";
import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import OrderDetailsGrid from "./OrderDetailsGrid";
import OrdersHeader from "./OrdersHeader";

function OrdersGrid({ orders, loadCart }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">
            <OrdersHeader order={order} />

            <OrderDetailsGrid order={order} loadCart={loadCart} />
          </div>
        );
      })}
    </div>
  );
}

export default OrdersGrid;
