import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  ErrorPage,
  Login,
  Signup,
  BookMark,
  PurchaseHistory,
  Events,
  Profile,
  EventDetailsPage,
  MusicalConcerts,
  StandUpComedies
} from "./Pages";
import Sidebar from "./components/Sidebar/Sidebar";
import ProtectedRoutes from "./Pages/utils/ProtectetRoutes";
// import EditEventModal from "./components/EditModal/EditEventModal";
import EditEventForm from "./Pages/EditEventForm";

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/musical-concerts" element={<MusicalConcerts />} />
          <Route path="/stand-up-comedies" element={<StandUpComedies />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/bookmark" element={<BookMark />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/update-event/:id" element={<EditEventForm />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
