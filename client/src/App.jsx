import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./components/Login/LoginComponent";
import HomeComponent from "./components/HomeComponent/HomeComponent";
import "./App.css";
import Carts from "./pages/Carts/Carts";
import Orders from "./pages/Orders/Orders";
import Wishlist from "./pages/Wishlists/Wishlist";
import CertainProduct from "./pages/CertainProduct/CertainProduct";
import AuthHandlerComponet from "./components/AuthHandlerComponent/AuthHandlerComponent";
import Payment from "./pages/Payment/Payment";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import GiftBoxes from "./pages/GiftBoxes/GiftBoxes";
import HairTreatment from "./pages/HairTreatment/HairTreatment";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ContactPage from "./pages/ContactPage/ContactPage";
import TermsOfUse from "./pages/TermsOfUse/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import HowToOrder from "./pages/HowToOrder/HowToOrder";
import Faq from "./pages/Faq/Faq";
import ReturnAndRefund from "./pages/ReturnAndRefund/ReturnAndRefund";
import Accessibility from "./pages/Accessibility/Accessibility";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import SignUp from "./pages/SignUp/SignUp";

const stripePromise = loadStripe('pk_test_51JqdR4GtNhHP2MJKDVgOZjeeYZypmfio8tz0KajoalMGBMLoEpqZP8Y0YtQzabWxkhlhPLbiqGLekfadlPKmAPeI00a6LdNakJ');

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  AuthHandlerComponet();

  return (
    <>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<HomeComponent />} />
          <Route
            path="/carts"
            element={isAuthenticated ? <Carts /> : <Login />}
          />
          <Route path="/wishlists" element={<Wishlist />} />
          <Route path="/product/:id" element={<CertainProduct />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/return-refund" element={<ReturnAndRefund />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/how-to-order" element={<HowToOrder />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy/policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/gift-boxes" element={<GiftBoxes />} />
          <Route path="/hair-creams" element={<HairTreatment />} />
          <Route path="/forgot-password" element={ <ForgotPassword />} />
          <Route path="/resetpassword/:reset_token" element={<ResetPassword />} />
          <Route path="/change/password" element={<ChangePassword />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
