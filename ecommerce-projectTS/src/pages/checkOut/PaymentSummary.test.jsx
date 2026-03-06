import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PaymentSummary from "./PaymentSummary";
import { MemoryRouter } from "react-router";

describe("payment summary component", () => {
  let paymentsummary = {
    totalItems: 1,
    productCostCents: 1090,
    shippingCostCents: 0,
    totalCostBeforeTaxCents: 1090,
    taxCents: 109,
    totalCostCents: 1199,
  };

  let loadCart = vi.fn();

  it("checks basic components", async () => {
    render(
      <MemoryRouter>
        <PaymentSummary loadCart={loadCart} paymentsummary={paymentsummary} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Items (1):")).toBeInTheDocument();

    expect(
      within(screen.getByTestId("payment-summary-product-cost")).getByText(
        "$10.90",
      ),
    ).toBeInTheDocument();

    expect(
      within(screen.getByTestId("payment-summary-shipping-cost")).getByText(
        "$0.00",
      ),
    ).toBeInTheDocument();

    expect(
      within(screen.getByTestId("payment-summary-total-before-tax")).getByText(
        "$10.90",
      ),
    ).toBeInTheDocument();

    expect(
      within(screen.getByTestId("payment-summary-tax")).getByText("$1.09"),
    ).toBeInTheDocument();

    expect(
      within(screen.getByTestId("payment-summary-total-cost")).getByText(
        "$11.99",
      ),
    ).toBeInTheDocument();
  });
});
