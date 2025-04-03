import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Signin } from "./pages/signinpage";
import { Signup } from "./pages/signuppage";
import { Forgotpassword } from "./pages/forgotpasswordpage";
import { Otpform } from "./pages/Otp-page";
import { UpdatePassword } from "./components/updatepassword";
import { PageWrapper } from "./components/PageWrapper"; // Import wrapper

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/signin" element={<PageWrapper><Signin /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
        <Route path="/forgotpassword" element={<PageWrapper><Forgotpassword /></PageWrapper>} />
        <Route path="/enterOtp" element={<PageWrapper><Otpform /></PageWrapper>} />
        <Route path="/updatepassword" element={<PageWrapper><UpdatePassword /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
};

export default App;


