import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./TrackingPage.css";
import Header from "../../components/Header";
import { Link } from "react-router";
import axios from "axios";
import dayjs from "dayjs";

export default function TrackingPage() {
  const [order, setOrder] = useState([]);

  const { orderId, productId } = useParams();
  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`,
      );

      setOrder(response.data);
    };

    fetchTrackingData();
  }, [orderId]);

  if (!order.products) {
    return <p>no dataaaaaaa</p>;
  }

  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  let totalDeriveryTimeMs =
    (orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs) * 0.02;

  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  const deliveryPercentage = (timePassedMs / totalDeriveryTimeMs) * 100;

  const isPrepared = deliveryPercentage < 33;
  const isShipped = deliveryPercentage >= 33 && deliveryPercentage < 100;
  const isDelivered = deliveryPercentage === 100;

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
      <title>Tracking</title>
      <Header />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercentage <= 100 ? "Arriving on" : "Delivered on"}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>

          <div className="product-info">{orderProduct.product.name}</div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPrepared && "current-status"}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipped && "current-status"}`}>
              Shipped
            </div>
            <div
              className={`progress-label ${isDelivered && "current-status"}`}
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
