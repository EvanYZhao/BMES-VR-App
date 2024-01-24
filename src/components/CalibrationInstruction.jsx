import { useState } from "react";
import "../styles/Calibration.css";
import { useNavigate } from "react-router-dom";
import CircularMetric from "../components/CircularMetrics";

export default function CalibrationInstruction({ flexion_score, extension_score }) {
    const [counter, setCounter] = useState(0);
    
    //reset counter
    const reset = () =>{
        setCounter(0)
    }

    //increase counter
    const increase = () => {
      if(counter == 2){
        reset();
      }
      else{
        setCounter(count => count + 1);
      }
    };

    //handle first click to allow to move to next instruction
    const handleInputValue = () => {
    {/* TODO: make it so that next instruction is not clickable until user clicks the "this is as far as I can go"*/}
    } 

    return (
    
        <div className={"instruction-container"}>
          
         <div className={"text-container"}>

        {
            {
                '0':
                <div>
                <h1 className={"calibration-header"}>follow the series of calibration instructions</h1> 
                <h1 className={"calibration-header"}>click the button below to begin!</h1> 
                <button onClick={increase}>begin</button>
                </div>,
                '1':
                <div>
                <h1 className={"calibration-header"}>step 1: bend forward</h1>
                <div className={"circular-metrics"}>
                <div className = {"flexion-metric"}>
                    <CircularMetric  name="flexion" flexion_score={80}></CircularMetric>
                </div>
                <div className = {"extension-metric"}>
                    <CircularMetric name="extension" flexion_score={50}></CircularMetric>
                </div>
                </div>
                <div className="button-holder">
                    <button>this is as far as I can go!</button>
                    <button onClick={increase}>next instruction</button>
                </div>
                </div> ,
                '2':
                <div>
                <h1 className={"calibration-header"}>step 2: bend backwards</h1>
                <div className={"circular-metrics"}>
                <div className = {"flexion-metric"}>
                    <CircularMetric  name="flexion" flexion_score={80}></CircularMetric>
                </div>
                <div className = {"extension-metric"}>
                    <CircularMetric name="extension" flexion_score={50}></CircularMetric>
                </div>
                </div>
                <div className="button-holder">
                    <button>this is as far as I can go!</button>
                    <button onClick={increase}>next instruction</button>
                </div>                
                </div> ,
            }[counter]
        }  
         </div>
        </div>
    );
}

