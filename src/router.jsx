import { Routes, Route } from "react-router-dom";
import Calibration from "./screens/Calibration";
import Home from "./screens/Home";
import SignIn from "./screens/SignIn";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import Protected from "./components/Protected.jsx";

const Router = () => {
   return (
      <AuthContextProvider>
         <Routes>
            <Route
               path="/"
               element={
                  <Protected>
                     <Home />
                  </Protected>
               }
            />
            <Route
               path="/calibration"
               element={
                  <Protected>
                     <Calibration />
                  </Protected>
               }
            />
            <Route path="/signin" element={<SignIn />} />
         </Routes>
      </AuthContextProvider>
   );
};

export default Router;
