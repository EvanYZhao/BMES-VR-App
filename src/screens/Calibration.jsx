import { useState } from "react";
import "../styles/Calibration.css";
import Avatar from "../components/Avatar";
import { useNavigate } from "react-router-dom";
import Progress from 'react-circle-progress-bar'
import CircularMetric from "../components/CircularMetrics";

function Calibration() {
    const [bend, setBend] = useState(4);
    const navigate = useNavigate();

    return (
    
        <div className={"instruction-container"}>
          <div className = {"internal-instruction-container"}>
            <h1 className={"calibration-header"}>Calibration Model</h1>

            <Avatar bend={bend} setBend={setBend} />

            {/* instruction button: we will likely need to store the appropriate bend value to the backend
            - TODO: figure out database structure
            - TODO: set up API route to POST max/min bend calibration values to database
            - TODO: establish various basic API routes (get, post, etc.) */}

            <button className={"instruction-button"}>
                ✨ this is as far as I can go ✨
            </button>
            <button onClick={navigateHome}>Go to Home Page</button>
         </div>
         <div className={"text-container"}>
          <h1>Instruction 1: Move forward and back</h1>
          {/* TODO: make progress bar stuff into a component */}
          <div className={"circular-metrics"}>
            <div className = {"flexion-metric"}>
            <CircularMetric  name="flexion" flexion_score={80}></CircularMetric>
            </div>
            <div className = {"extension-metric"}>
            <CircularMetric name="extension" flexion_score={50}></CircularMetric>
            </div>
          </div>
          <button>press this button when you can't move anymore!</button>
         </div>
        </div>
    );
}

export default Calibration;
