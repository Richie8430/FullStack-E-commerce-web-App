import React, { useState } from "react";
import { formatMoney } from "../../utils/money";

function CartItemDetails({ cartItem, deleteCartItem, loadCart }) {
  const [isEditingQuantity, setIsEditingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const updateQuantity = async () => {
    if (isEditingQuantity) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity),
      });

      await loadCart();
      setIsEditingQuantity(false);
    } else {
      setIsEditingQuantity(true);
    }
  };

  const handleQuantityKeyDown = (event) => {
    const keyPress = event.key;

    if (keyPress === "Enter") {
      updateQuantity();
    } else if (keyPress === "Escape") {
      setQuantity(cartItem.quantity);
      setIsEditingQuantity(false);
    }
  };
  return (
    <>
      <img className="product-image" src={cartItem.product.image} />
      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isEditingQuantity ? (
              <input
                type="text"
                className="textbox"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                onKeyDown={handleQuantityKeyDown}
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateQuantity}
          >
            {isEditingQuantity ? "Confirm" : "Update"}
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}

export default CartItemDetails;
