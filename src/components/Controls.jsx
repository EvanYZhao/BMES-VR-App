import React from "react";
import { userCollection } from "../database/firestore";
import Metrics from "./Metrics";

export default function Controls() {
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
      <div>
      <h2>Controls</h2>
      <div className="controls-bg">
         <button
               onClick={() => saveMetric(3, 80)}
               className="pump-air-button"
            >
               Pump Air
            </button>
      </div> 
      <h2 style={{ textAlign: "left" }}>Metrics</h2>
      <div className="controls-bg">
      <Metrics flexion_score={30} extension_score={50}></Metrics>
      </div>
      </div>
   );
}
