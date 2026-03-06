import React, { Fragment } from "react";
import buyAgain from "../../assets/images/icons/buy-again.png";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router";
import axios from "axios";

function OrderDetailsGrid({ order, loadCart }) {
  const navigate = useNavigate();
  return (
    <div className="order-details-grid">
      {order.products.map((orderProduct) => {
        const addToCart = async () => {
          await axios.post("/api/cart-items", {
            productId: orderProduct.product.id,
            quantity: 1,
          });

          await loadCart();
          navigate("/checkout");
        };
        return (
          <Fragment key={orderProduct.product.id}>
            <div className="product-image-container">
              <img src={orderProduct.product.image} />
            </div>
            <div className="product-details">
              <div className="product-name">{orderProduct.product.name}</div>
              <div className="product-delivery-date">
                Arriving on:{" "}
                {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM D")}
              </div>
              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button
                className="buy-again-button button-primary"
                onClick={addToCart}
              >
                <img className="buy-again-icon" src={buyAgain} />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>
            <div className="product-actions">
              <Link to={`/tracking/${order.id}/${orderProduct.product.id}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </Link>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

export default OrderDetailsGrid;
