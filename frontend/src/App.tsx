import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  ErrorPage,
  Login,
  Signup,
  BookMark,
  PurchaseHistory,
  Events,
} from "./pages";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/bookmark" element={<BookMark />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
