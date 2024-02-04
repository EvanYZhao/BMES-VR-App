import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";
import Controls from "../components/Controls";
import Metrics from "../components/Metrics";
import "../styles/Home.css";
import { UserAuth } from "../context/AuthContext";
import { userCollection } from "../database/firestore";

function Home() {
   const [bend, setBend] = useState(4); // -30 < x < 41
   const navigate = useNavigate();

   const { logOut, user } = UserAuth();

   const handleSignOut = async () => {
      try {
         await logOut();
      } catch (error) {
         console.log(error);
      }
   };

   const saveMetric = (numPumps=0, postureScore=null) => {
      userCollection
         .addMetric(user.uid, numPumps, postureScore)
         .then((r) => {
            console.log(r);
         })
         .catch((e) => {
            console.log("Error occurred saving metric:", e);
         });
   };

   return (
      <div className="home-wrapper">
         <div className="home-top-row">
            <div className="avatar-and-controls">
               <Avatar bend={bend} setBend={setBend} />
               <Controls />
            </div>
            <Metrics flexion_score={33} extension_score={78} />
         </div>
         <div className="home-bottom-row">
            <button
               onClick={() => saveMetric(3, 80)}
               className="pump-air-button"
            >
               Pump Air
            </button>
            <button
               onClick={() =>
                  navigate("/calibration", { state: { isNewUser: false } })
               }
               className="recalibrate-button"
            >
               Recalibrate
            </button>
         </div>
         <div className="home-log-out-row">
            <button style={{ color: "#970C10" }} onClick={handleSignOut}>
               Log Out
            </button>
         </div>
      </div>
   );
}

export default Home;
