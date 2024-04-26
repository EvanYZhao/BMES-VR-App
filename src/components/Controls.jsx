import React, { useState } from "react";
import { userCollection } from "../database/firestore";
import Metrics from "./Metrics";
import Survey from "./Survey";

export default function Controls({ socket }) {
   const [on, toggle] = useState(false);

   const togglePumps = () => {
      toggle(!on)
      const payload = {pump_power: !on, angular_vel1: null, angular_vel2: null, cflex: null, tflex: null, lflex: null}
      socket.send(JSON.stringify(payload))
   }

   return (
      <div>
         <div className="control-header">Controls</div>
         <div className="controls-bg">
            <div className="row-flex">
               <button onClick={() => togglePumps()} className="pump-air-button">
                  {on ? "Stop Air" : "Pump Air"}
               </button>
               <div className="metric-card">
                  Amount of Air
                  <br />
                  <div className="metric-score">1 atm</div>
               </div>
               <div className="metric-card">
                  Degrees
                  <br />
                  <div className="metric-score">0°</div>
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
