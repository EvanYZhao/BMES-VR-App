import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { calibrationCollection } from "../database/firestore";
import { UserAuth } from "../context/AuthContext";

const AuthRedirect = () => {
   const navigate = useNavigate();
   const { user } = UserAuth();

   useEffect(() => {
      const checkUserEntry = async () => {
         if (user) {
            try {
               const userEntry = await calibrationCollection.getCalibration(
                  user.uid
               );
               if (userEntry) {
                  navigate("/");
               } else {
                  navigate("/calibration");
               }
            } catch (error) {
               console.error("Error checking user entry:", error);
               navigate("/calibration");
            }
         }
      };

      checkUserEntry();
   }, [user]);

   return null;
};

export default AuthRedirect;
