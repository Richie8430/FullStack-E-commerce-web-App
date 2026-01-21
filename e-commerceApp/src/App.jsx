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
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/cart-items?expand=product")
      .then((response) => {
        setCart(response.data);
      });
  }, []);
  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckOut cart={cart} />} />
      <Route path="orders" element={<Orders />} />
      <Route path="tracking" element={<TrackingPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
