import { Route, Routes } from "react-router";
import HomePage from "./pages/homePage/HomePage";
import CheckOut from "./pages/checkOut/CheckOutPage";
import Orders from "./pages/Orders/OrdersPage";
import TrackingPage from "./pages/tracking/TrackingPage";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);
  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route
        path="checkout"
        element={<CheckOut cart={cart} loadCart={loadCart} />}
      />
      <Route path="orders" element={<Orders cart={cart} />} />
      <Route path="tracking/:orderId/:productId" element={<TrackingPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
