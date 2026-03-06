import React from "react";
import "./Checkout-header.css";
import logo from "../../../assets/images/logo.png";
import mobilelogo from "../../../assets/images/mobile-logo.png";
import checkoutLock from "../../../assets/images/icons/checkout-lock-icon.png";
import { Link } from "react-router";

export default function CheckoutHeader({ cart }) {
  let totalItems = 0;

  cart.forEach((cartItem) => {
    totalItems += cartItem.quantity;
  });
  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src={logo} />
              <img className="mobile-logo" src={mobilelogo} />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              {totalItems}
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src={checkoutLock} />
          </div>
        </div>
      </div>
    </>
  );
}
