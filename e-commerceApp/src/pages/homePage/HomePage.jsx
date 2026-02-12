import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import "./HomePage.css";
import Header from "../../components/Header";
import ProductsGrid from "./ProductsGrid";

export default function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    const fetchProductData = async () => {
      const urlPath = search
        ? `/api/products?search=${search}`
        : "/api/products";

      const response = await axios.get(urlPath);

      setProducts(response.data);
    };

    fetchProductData();
  }, [search]);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
