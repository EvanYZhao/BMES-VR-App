import { useContext, createContext, useState, useEffect } from "react";
import { userCollection } from "../database/firestore";
import { UserAuth } from "./AuthContext";

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
   const { user } = UserAuth();
   const [calibrationData, setCalibrationData] = useState(null);

   useEffect(() => {
      if (!user) return;
      userCollection
         .getData(user.uid)
         .then((data) => {
            setCalibrationData({extension: data.extension, flexion: data.flexion});
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
