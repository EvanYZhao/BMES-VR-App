import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";
import Controls from "../components/Controls";
import Metrics from "../components/Metrics";
import "../styles/Home.css";
import { UserAuth } from "../context/AuthContext";
import { userCollection } from "../database/firestore";
import {Navbar} from "../components/Navbar";

function Home() {
   const { logOut, user } = UserAuth();
   const WS_URL = `wss://monkfish-app-co2tn.ondigitalocean.app/?uid=${user.uid}`; // Change after server deployment
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
      <>
      <div className="home-wrapper">
      <Navbar className="navbar"/>
      <div className="home-top-row">
         <div className="vertical-flex">
         <h1 className="greeting">Hello, User</h1>
         <Controls />
         </div>
            <div className="avatar-and-controls">
               <Avatar className="avatar" bend={bend} setBend={setBend} degrees={degrees} />
               {/* <Controls /> */}
            </div>
         </div>
         <div className="home-bottom-row">
         </div>
      </div>
      </>
   );
}

export default Home;
