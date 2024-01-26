import { Routes, Route } from "react-router-dom";
import Calibration from "./screens/Calibration";
import Home from "./screens/Home";
import SignIn from "./screens/SignIn";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { DataContextProvider } from "./context/DataContext.jsx";
import Protected from "./components/Protected.jsx";
import AuthRedirect from "./components/AuthRedirect.jsx";

const Router = () => {
   return (
      <AuthContextProvider>
         <DataContextProvider>
            <AuthRedirect />
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
         </DataContextProvider>
      </AuthContextProvider>
   );
};

export default Router;
