import { Route, Routes } from "react-router";
import HomePage from "./pages/homePage/HomePage";
import CheckOut from "./pages/checkOut/CheckOutPage";
import Orders from "./pages/Orders/OrdersPage";
import TrackingPage from "./pages/tracking/TrackingPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckOut />} />
      <Route path="orders" element={<Orders />} />
      <Route path="tracking" element={<TrackingPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
