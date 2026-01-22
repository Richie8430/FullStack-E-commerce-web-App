import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CheckOutPage.css";
import CheckoutHeader from "./checkoutHeader/Checkout-header";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";

export default function CheckOut({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentsummary, setPaymentsummary] = useState(null);

  useEffect(() => {
    const fetchCheckOutData = async () => {
      let response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime",
      );

      setDeliveryOptions(response.data);

      response = await axios.get("/api/payment-summary");
      setPaymentsummary(response.data);
    };

    fetchCheckOutData();
  });

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
      <title>Check out</title>
      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />

          <PaymentSummary paymentsummary={paymentsummary} />
        </div>
      </div>
    </>
  );
}
