import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";
import Controls from "../components/Controls";
import Metrics from "../components/Metrics";
import "../styles/Home.css";
import { UserAuth } from "../context/AuthContext";
import { userCollection } from "../database/firestore";
import {Navbar} from "../components/Navbar";

function Home() {
   const [bend, setBend] = useState(4); // -30 < x < 41
   const navigate = useNavigate();

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
      <>
      <div className="home-wrapper">
      <Navbar className="navbar"/>
      <div className="home-top-row">
         <div className="vertical-flex">
         <h1 className="greeting">Hello, User</h1>
         <Controls />
         </div>
            <div className="avatar-and-controls">
               <Avatar bend={bend} setBend={setBend} />
            </div>
         </div>
         <div className="home-bottom-row">
         </div>
      </div>
      </>
   );
}

export default Home;
