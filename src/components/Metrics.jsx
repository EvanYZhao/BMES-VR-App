import React from "react";
import wip from '../assets/wip.png'

export default function Metrics({ flexion_score, extension_score }) {
   return (
      <div className="metrics">
         <div className="row-flex">
         <div className="metric-card">
         Flexion 
         <br/> 
         <div className="metric-score">
         <img className="wip-img" src={wip} />
         </div>
         </div>
         <div className="metric-card">
            Extension
         <br/> 
         <div className="metric-score">
         <img className="wip-img" src={wip} />
         </div>
         </div>
         <div className="metric-card">
         Total
         <br/> 
         <div className="metric-score">
         <img className="wip-img" src={wip} />   
         </div>
         </div>
         </div>
      </div>
   );
}
