import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";
import Controls from "../components/Controls";
import Metrics from "../components/Metrics";
import "../styles/Home.css";
import { UserAuth } from "../context/AuthContext";
import { userCollection } from "../database/firestore";

function Home() {
   const { logOut, user } = UserAuth();
   const WS_URL = `bmes-vr-app-backend-production.up.railway.app?uid=${user.uid}`; // Change after server deployment
   const connection = useRef(null);
   const [bend, setBend] = useState(4); // -34.69 < x < 81.40
   const [degrees, setDegrees] = useState(0); // -90 < x < 180
   const navigate = useNavigate();

   const handleSignOut = async () => {
      try {
         await logOut();
      } catch (error) {
         console.log(error);
      }
   };

   const saveMetric = (numPumps = 0, postureScore = null) => {
      userCollection
         .addMetric(user.uid, numPumps, postureScore)
         .then((r) => {
            console.log(r);
         })
         .catch((e) => {
            console.log("Error occurred saving metric:", e);
         });
   };

   const degreesToBend = (deg) => {
      const fac = 0.43;
      return deg * fac + 4;
   };

   useEffect(() => {
      const socket = new WebSocket(WS_URL);

      socket.addEventListener("open", (ws) => {
         connection.current = ws;
      });

      socket.addEventListener("close", () => {
         connection.current = null;
      });

      socket.addEventListener("message", (data) => {
         setBend(degreesToBend(parseFloat(data.data)));
         setDegrees(data.data);
      });
   }, []);

   return (
      <div className="home-wrapper">
         <div className="home-top-row">
            <div className="avatar-and-controls">
               <Avatar bend={bend} setBend={setBend} degrees={degrees} />
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
