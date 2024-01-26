import { useState } from "react";
import "../styles/Calibration.css";
import Avatar from "../components/Avatar";
import { useNavigate } from "react-router-dom";
import CircularMetric from "../components/CircularMetrics";
import CalibrationInstruction from "../components/CalibrationInstruction";


function Calibration() {
   const [bend, setBend] = useState(4);
   const navigate = useNavigate();

   return (
      <div className={"instruction-container"}>
         <div className={"internal-instruction-container"}>
            <h1 className={"calibration-header"}>Calibration Model</h1>

            <Avatar bend={bend} setBend={setBend} />

            {/* instruction button: we will likely need to store the appropriate bend value to the backend
            - TODO: figure out database structure
            - TODO: set up API route to POST max/min bend calibration values to database
            - TODO: establish various basic API routes (get, post, etc.) */}

            <button className={"instruction-button"}>
               ✨ this is as far as I can go ✨
            </button>
            <button
               onClick={() => {
                  navigate("/");
               }}
            >
               Go to Home Page
            </button>
         </div>
         <CalibrationInstruction instruction_number="2" flexion_score={90} extension_score={50}></CalibrationInstruction>
        </div>
    );
}

export default Calibration;
