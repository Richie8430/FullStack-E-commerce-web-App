import React, { useState } from "react";
import "./Header.css";
import mobileLogo from "../assets/images/mobile-logo-white.png";
import whiteLogo from "../assets/images/logo-white.png";
import searchIcon from "../assets/images/icons/search-icon.png";
import cartIcon from "../assets/images/icons/cart-icon.png";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router";

export default function Header({ cart = [] }) {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const searchText = searchParams.get("search");

  const [search, setSearch] = useState(searchText || "");

  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <>
      <div className="header">
        <div className="left-section">
          <Link to="/" className="header-link">
            <img className="logo" src={whiteLogo} />
            <img className="mobile-logo" src={mobileLogo} />
          </Link>
        </div>

        <div className="middle-section">
          <input
            className="search-bar"
            type="text"
            name="search"
            placeholder="Search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />

          <button
            type="button"
            className="search-button"
            onClick={() => {
              navigate(`/?search=${search}`);
            }}
          >
            <img className="search-icon" src={searchIcon} />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <Link className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src={cartIcon} />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>
    </>
  );
}
