import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userCollection } from "../database/firestore";
import { UserAuth } from "../context/AuthContext";

const AuthRedirect = () => {
   const navigate = useNavigate();
   const { user } = UserAuth();

   useEffect(() => {
      const checkUserEntry = async () => {
         if (user) {
            try {
               const userEntry = await userCollection.getData(user.uid);
               if (userEntry) {
                  navigate("/");
               } else {
                  navigate("/calibration", { state: { isNewUser: true } });
               }
            } catch (error) {
               console.error("Error checking user entry:", error);
               navigate("/calibration", { state: { isNewUser: true } });
            }
         }
      };

      checkUserEntry();
   }, [user]);

   return null;
};

export default AuthRedirect;
