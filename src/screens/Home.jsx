import { useRef } from "react";
import Avatar from "../components/Avatar";
import Controls from "../components/Controls";
import "../styles/Home.css";
import { UserAuth } from "../context/AuthContext";
import { userCollection } from "../database/firestore";
import { Navbar } from "../components/Navbar";

function Home() {
   const { user } = UserAuth();

   const PROD_WS_URL = `wss://bmes-vr-app-backend-production.up.railway.app/?uid=${user.uid}`
   const DEV_WS_URL = `ws://localhost:8080/?uid=${user.uid}`;
   const socket = new WebSocket(PROD_WS_URL)

   return (
      <>
         <div className="home-wrapper">
            <Navbar className="navbar" />
            <div className="home-top-row">
               <div className="vertical-flex">
                  <h1 className="greeting">Hello, {user.displayName}</h1>
                  <Controls socket={socket} />
               </div>
               <div className="avatar-and-controls">
                  <Avatar socket={socket} className="avatar" />
               </div>
            </div>
            <div className="home-bottom-row"></div>
         </div>
      </>
   );
}

export default Home;
