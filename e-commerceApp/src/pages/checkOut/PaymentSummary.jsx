import React from "react";
import { formatMoney } from "../../utils/money";
import axios from "axios";
import { useNavigate } from "react-router";

function PaymentSummary({ paymentsummary, loadCart }) {
  const navigate = useNavigate();

  const createOrder = async () => {
    await axios.post("/api/orders");
    await loadCart();
    navigate("/orders");
  };

  return (
    <div className="payment-summary">
      <div className="payment-summary-title">Payment Summary</div>
      {paymentsummary && (
        <>
          <div
            className="payment-summary-row"
            data-testid="payment-summary-product-cost"
          >
            <div>Items ({paymentsummary.totalItems}):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentsummary.productCostCents)}
            </div>
          </div>
          <div
            className="payment-summary-row"
            data-testid="payment-summary-shipping-cost"
          >
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentsummary.shippingCostCents)}
            </div>
          </div>
          <div
            className="payment-summary-row subtotal-row"
            data-testid="payment-summary-total-before-tax"
          >
            <div>Total before tax:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentsummary.totalCostBeforeTaxCents)}
            </div>
          </div>
          <div
            className="payment-summary-row"
            data-testid="payment-summary-tax"
          >
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentsummary.taxCents)}
            </div>
          </div>
          <div
            className="payment-summary-row total-row"
            data-testid="payment-summary-total-cost"
          >
            <div>Order total:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentsummary.totalCostCents)}
            </div>
          </div>
          <button
            className="place-order-button button-primary"
            onClick={createOrder}
          >
            Place your order
          </button>
        </>
      )}
    </div>
  );
}

export default PaymentSummary;
