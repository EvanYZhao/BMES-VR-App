import { useContext, createContext, useState, useEffect } from "react";
import { calibrationCollection } from "../database/firestore";
import { UserAuth } from "./AuthContext";

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
   const { user } = UserAuth();
   const [calibrationData, setCalibrationData] = useState(null);

   useEffect(() => {
      if (!user) return;
      calibrationCollection
         .getCalibration(user.uid)
         .then((data) => {
            setCalibrationData(data);
         })
         .catch((error) => {
            if (typeof error === "string" || error instanceof String) return;
            console.error(error);
         });
   }, [user]);

   return (
      <DataContext.Provider value={{ calibrationData }}>
         {children}
      </DataContext.Provider>
   );
};

export const UserData = () => {
   return useContext(DataContext);
};
