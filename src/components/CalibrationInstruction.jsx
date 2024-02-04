import { useState } from "react";
import "../styles/Calibration.css";
import Avatar from "../components/Avatar";
import { useNavigate, useLocation } from "react-router-dom";
import CircularMetric from "../components/CircularMetrics";
import { userCollection } from "../database/firestore";
import { UserAuth } from "../context/AuthContext";

export default function CalibrationInstruction() {
   const [counter, setCounter] = useState(0);
   const [input, setInput] = useState(0);
   const [bend, setBend] = useState(4);
   const [measuredExt, setMeasuredExt] = useState(null);
   const [measuredFlex, setMeasuredFlex] = useState(null);
   const navigate = useNavigate();

   const { user } = UserAuth();
   const { state } = useLocation();
   const { isNewUser } = state;

   //reset counter
   const reset = () => {
      setCounter(0);
      setInput(0);
   };

   //increase counter
   const increase = () => {
      console.log(isNewUser);
      setCounter((count) => count + 1);
   };

   //handle first click to allow to move to next instruction
   const handleInputValue = () => {
      if (input == 0 && counter == 1) {
         setMeasuredFlex(90);
         setInput((count) => count + 1);
      } else if (input == 1 && counter == 2) {
         setMeasuredExt(-60);
         setInput((count) => count + 1);
      }
   };

   // Initialize user
   const initializeUser = () => {
      userCollection
         .storeInitialData(user.uid, measuredExt, measuredFlex)
         .then((r) => {
            console.log(r);
         })
         .catch((e) => {
            console.log(`Error occurred while initializing user: ${e}`);
         });
   };

   // Update Calibration data
   const updateCalibrationData = () => {
      userCollection
         .updateCalibration(user.uid, measuredExt, measuredFlex)
         .then((r) => {
            console.log(r);
         })
         .catch((e) => {
            console.log(
               `Error occurred while updating user's calibration data: ${e}`
            );
         });
   };

   // Calls appropriate function based on user status
   const handleLastClick = () => {
      if (isNewUser) {
         initializeUser();
      } else {
         updateCalibrationData();
      }
      increase();
   };

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
                        <button
                           className={"calibration-button"}
                           onClick={increase}
                        >
                           begin
                        </button>
                     </div>
                  ),
                  1: (
                     <div className={"instruction-container"}>
                        <div className={"internal-instruction-container"}>
                           <h1 className={"calibration-header"}>
                              Calibration Model
                           </h1>

                           <Avatar bend={bend} setBend={setBend} />

                           {/* instruction button: we will likely need to store the appropriate bend value to the backend
                                        - TODO: figure out database structure
                                        - TODO: set up API route to POST max/min bend calibration values to database
                                        - TODO: establish various basic API routes (get, post, etc.) */}
                           <button
                              className={"calibration-button"}
                              onClick={() => {
                                 navigate("/");
                              }}
                           >
                              Go to Home Page 🏠
                           </button>
                        </div>
                        <div className="metrics-instruction-container">
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
                              <button
                                 className={"calibration-button"}
                                 onClick={handleInputValue}
                              >
                                 this is as far as I can go!
                              </button>
                              <button
                                 className={"calibration-button"}
                                 onClick={increase}
                                 disabled={input == 0}
                              >
                                 next
                              </button>
                           </div>
                        </div>
                     </div>
                  ),
                  2: (
                     <div className={"instruction-container"}>
                        <div className={"internal-instruction-container"}>
                           <h1 className={"calibration-header"}>
                              Calibration Model
                           </h1>

                           <Avatar bend={bend} setBend={setBend} />

                           {/* instruction button: we will likely need to store the appropriate bend value to the backend
                                        - TODO: figure out database structure
                                        - TODO: set up API route to POST max/min bend calibration values to database
                                        - TODO: establish various basic API routes (get, post, etc.) */}

                           <button
                              className={"calibration-button"}
                              onClick={() => {
                                 navigate("/");
                              }}
                           >
                              Go to Home Page 🏠
                           </button>
                        </div>
                        <div className="metrics-instruction-container">
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
                              <button
                                 className={"calibration-button"}
                                 onClick={handleInputValue}
                              >
                                 this is as far as I can go!
                              </button>
                              <button
                                 className={"calibration-button"}
                                 onClick={handleLastClick}
                                 disabled={input == 1}
                              >
                                 next
                              </button>
                           </div>
                        </div>
                     </div>
                  ),
                  3: (
                     <div className={"vertical-container"}>
                        <h1>congrats! you're done calibrating :{")"}</h1>
                        <div className={"horizontal-container"}>
                           <button
                              className={"calibration-button"}
                              onClick={() => navigate("/")}
                           >
                              take me home
                           </button>
                           <button
                              className={"calibration-button"}
                              onClick={reset}
                           >
                              restart calibration
                           </button>
                        </div>
                     </div>
                  ),
               }[counter]
            }
         </div>
      </div>
   );
}
