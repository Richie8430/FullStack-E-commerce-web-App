import { it, expect, describe, vi } from "vitest";
import Product from "./Product";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

vi.mock("axios");

describe("Product component", () => {
  const product = {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: 1090,
    keywords: ["socks", "sports", "apparel"],
  };
  const loadCart = vi.fn();

  // beforeEach(() => {
  //   product = {
  //     id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  //     image: "images/products/athletic-cotton-socks-6-pairs.jpg",
  //     name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
  //     rating: {
  //       stars: 4.5,
  //       count: 87,
  //     },
  //     priceCents: 1090,
  //     keywords: ["socks", "sports", "apparel"],
  //   };

  //   loadCart = vi.fn();
  // });
  it("displays the product details correctly");

  render(<Product product={product} loadCart={loadCart} />);
  expect(
    screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs"),
  ).toBeInTheDocument();

  expect(screen.getByText("$10.90")).toBeInTheDocument();

  expect(screen.getByTestId("product-image")).toHaveAttribute(
    "src",
    "images/products/athletic-cotton-socks-6-pairs.jpg",
  );
  expect(screen.getByTestId("product-rating")).toHaveAttribute(
    "src",
    "images/ratings/rating-45.png",
  );
  expect(screen.getByText("87")).toBeInTheDocument();

  it("Adds a product to cart", async () => {
    render(<Product product={product} loadCart={loadCart} />);

    const user = userEvent.setup();
    const addToCartbutton = screen.getByTestId("addTocart-btn");
    await user.click(addToCartbutton);

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
    });
    expect(loadCart).toHaveBeenCalled();
  });
});
