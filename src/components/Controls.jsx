import React from "react";
import { userCollection } from "../database/firestore";
import Metrics from "./Metrics";
import Survey from "./Survey";

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
      <div className="control-header">Controls</div>
      <div className="controls-bg">
         <div className="row-flex">
         <button
               onClick={() => saveMetric(3, 80)}
               className="pump-air-button"
            >
               Pump Air
            </button>
         <div className="metric-card">
            Amount of Air
            <br/> 
         <div className="metric-score">
         1 atm
         </div>
         </div>
         <div className="metric-card">
            Degrees
            <br/> 
         <div className="metric-score">
         0°
         </div>
         </div>
         </div>
      </div> 
      <div>
      <div className="control-header">Metrics</div>
      <div className="controls-bg">
      <Metrics flexion_score={30} extension_score={50}></Metrics>
      </div>
      </div>
      </div>
   );
}
