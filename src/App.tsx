import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin } from './pages/signinpage';
import { Signup } from './pages/signuppage';
import { Forgotpassword } from './pages/forgotpasswordpage';
import { Otpform } from './pages/Otp-page';
import { UpdatePassword } from './components/updatepassword';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/forgotpassword" element={<Forgotpassword/>}/>
      <Route path='/enterOtp' element={<Otpform/>}/>
      <Route path='/updatepassword' element={<UpdatePassword/>}/>
      </Routes>
  </BrowserRouter>
  )
}

export default App
