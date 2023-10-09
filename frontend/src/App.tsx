import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./config/firebase-config";
import Cookies from "js-cookie";
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
  CreateEvent,
  ForgotPassword,
  ResetPassword,
} from "./pages";
import Sidebar from "./components/Sidebar/Sidebar";
import ProtectedRoutes from "./pages/utils/ProtectedRoutes";
import { useDispatch } from "react-redux";
import { loginSuccess, logoutSuccess } from "./store/Slices/userSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        // @ts-ignore
        Cookies.set("accessToken", user?.accessToken);
        dispatch(
          loginSuccess({
            userUid: uid,
          })
        );
      } else {
        Cookies.remove("accessToken");
        dispatch(logoutSuccess());
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/bookmark" element={<BookMark />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
