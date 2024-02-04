import { useState } from "react";
import "../styles/Calibration.css";
import Avatar from "../components/Avatar";
import { useNavigate } from "react-router-dom";
import CalibrationInstruction from "../components/CalibrationInstruction";

function Calibration() {
   const [bend, setBend] = useState(4);
   const navigate = useNavigate();

   console.log("bend: " + bend)

   return (
      <div className={"instruction-container"}>
         <CalibrationInstruction/>
        </div>
    );
}

export default Calibration;
