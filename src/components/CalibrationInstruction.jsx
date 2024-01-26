import { useState } from "react";
import "../styles/Calibration.css";
import { useNavigate } from "react-router-dom";
import CircularMetric from "../components/CircularMetrics";
import { calibrationCollection } from "../database/firestore";
import { UserAuth } from "../context/AuthContext";

export default function CalibrationInstruction({
   flexion_score,
   extension_score,
}) {
   const [counter, setCounter] = useState(0);
   const [input, setInput] = useState(0);
   const { user } = UserAuth();

   //reset counter
   const reset = () => {
      setCounter(0);
   };

   //increase counter
   const increase = () => {
      setCounter((count) => count + 1);
   };

   //handle first click to allow to move to next instruction
   const handleInputValue = () => {
      if (input == 0 && counter == 1) {
         setInput((count) => count + 1);
      } else if (input == 1 && counter == 2) {
         setInput((count) => count + 1);
      }
   };

   const storeCalibrationData = () => {
      calibrationCollection
         .storeCalibration(user.uid, {
            extension: -30,
            flexion: 41,
         })
         .then(() => {
            console.log("Successfully saved calibration data");
            navigate("/");
         })
         .catch((error) => {
            console.log("Error occurred during calibration storing:", error);
         });
   };

   const navigate = useNavigate();

   console.log("counter: " + counter);
   console.log("input: " + counter);

   return (
      <div className={"instruction-container"}>
         <div className={"text-container"}>
            {
               {
                  0: (
                     <div>
                        <h1 className={"calibration-header"}>
                           follow the series of calibration instructions
                        </h1>
                        <h1 className={"calibration-header"}>
                           click the button below to begin!
                        </h1>
                        <button onClick={increase}>begin</button>
                     </div>
                  ),
                  1: (
                     <div>
                        <h1 className={"calibration-header"}>
                           step 1: bend forward
                        </h1>
                        <div className={"circular-metrics"}>
                           <div className={"flexion-metric"}>
                              <CircularMetric
                                 name="flexion"
                                 flexion_score={80}
                              ></CircularMetric>
                           </div>
                           <div className={"extension-metric"}>
                              <CircularMetric
                                 name="extension"
                                 flexion_score={50}
                              ></CircularMetric>
                           </div>
                        </div>
                        <div className="button-holder">
                           <button onClick={handleInputValue}>
                              this is as far as I can go!
                           </button>
                           <button onClick={increase} disabled={input == 0}>
                              next
                           </button>
                        </div>
                     </div>
                  ),
                  2: (
                     <div>
                        <h1 className={"calibration-header"}>
                           step 2: bend backwards
                        </h1>
                        <div className={"circular-metrics"}>
                           <div className={"flexion-metric"}>
                              <CircularMetric
                                 name="flexion"
                                 flexion_score={80}
                              ></CircularMetric>
                           </div>
                           <div className={"extension-metric"}>
                              <CircularMetric
                                 name="extension"
                                 flexion_score={50}
                              ></CircularMetric>
                           </div>
                        </div>
                        <div className="button-holder">
                           <button onClick={handleInputValue}>
                              this is as far as I can go!
                           </button>
                           <button onClick={increase} disabled={input == 1}>
                              next
                           </button>
                        </div>
                     </div>
                  ),
                  3: (
                     <div>
                        <button onClick={() => storeCalibrationData()}>
                           i'm done calibrating!
                        </button>
                     </div>
                  ),
               }[counter]
            }
         </div>
      </div>
   );
}
