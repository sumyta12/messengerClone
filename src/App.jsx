import SignUpFrom from "./Component/Form/SignUpFrom";
import LogInFrom from "./Component/LoginIn/Index";
import LoginPrivateRoute from "./Component/PrivateRoute/LoginPrivateRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotLoggedIn from "./Component/PrivateRoute/NotLoggedIn";
import ForgetPassword from "./Component/LoginIn/ForgetPassword";
import Welcomehome from "./Component/WelcomePage";
import Home from "./Component/WelcomePage/Home/Home";
import MessagePage from "./Component/MessagePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

      
          <Route element={<LoginPrivateRoute />}>
            <Route path="/" element={<Welcomehome/>} >
              <Route path="/" element={<Home/>} />
              <Route path="/message" element={<MessagePage/>} />
            </Route>
          </Route>

          <Route element={<NotLoggedIn />}>
            <Route path="/register" element={<SignUpFrom />} />
            <Route path="/login" element={<LogInFrom />} />
            <Route path="/forget" element={<ForgetPassword/>} />
          </Route>
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
