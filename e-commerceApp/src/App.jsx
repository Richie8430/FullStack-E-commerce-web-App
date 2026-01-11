import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CheckOut from "./pages/CheckOutPage";
import Orders from "./pages/OrdersPage";
import TrackingPage from "./pages/TrackingPage";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckOut />} />
      <Route path="orders" element={<Orders />} />
      <Route path="tracking" element={<TrackingPage />} />
    </Routes>
  );
}

export default App;
