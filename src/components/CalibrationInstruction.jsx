import { useState } from "react";
import "../styles/Calibration.css";
import Avatar from "../components/Avatar";
import { Navigate, useNavigate } from "react-router-dom";
import CircularMetric from "../components/CircularMetrics";

export default function CalibrationInstruction({ flexion_score, extension_score }) {
    const [counter, setCounter] = useState(0);
    const [input, setInput] = useState(0);
    const [bend, setBend] = useState(4);

    //reset counter
    const reset = () => {
        setCounter(0)
        setInput(0)
    }

    //increase counter
    const increase = () => {
        setCounter(count => count + 1);
    };

    //handle first click to allow to move to next instruction
    const handleInputValue = () => {
        if (input == 0 && counter == 1) {
            setInput(count => count + 1);
        }
        else if (input == 1 && counter == 2) {
            setInput(count => count + 1);
        }
    }

    const navigate = useNavigate();

    return (
        <div className={"instruction-container"}>

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
                                    <div className="metrics-instruction-container">
                                        <h1 className={"calibration-header"}>step 1: bend forward</h1>
                                        <div className={"circular-metrics"}>
                                            <div className={"flexion-metric"}>
                                                <CircularMetric name="flexion" flexion_score={80}></CircularMetric>
                                            </div>
                                            <div className={"extension-metric"}>
                                                <CircularMetric name="extension" flexion_score={50}></CircularMetric>
                                            </div>
                                        </div>
                                        <div className="button-holder">
                                            <button onClick={handleInputValue}>this is as far as I can go!</button>
                                            <button onClick={increase} disabled={input == 0}>next</button>
                                        </div>
                                    </div>
                                </div>,
                            '2':
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
                                    <div className="metrics-instruction-container">
                                    <h1 className={"calibration-header"}>step 2: bend backwards</h1>
                                    <div className={"circular-metrics"}>
                                        <div className={"flexion-metric"}>
                                            <CircularMetric name="flexion" flexion_score={80}></CircularMetric>
                                        </div>
                                        <div className={"extension-metric"}>
                                            <CircularMetric name="extension" flexion_score={50}></CircularMetric>
                                        </div>
                                    </div>
                                    <div className="button-holder">
                                        <button onClick={handleInputValue}>this is as far as I can go!</button>
                                        <button onClick={increase} disabled={input == 1}>next</button>
                                    </div>
                                </div>
                                </div>,
                            '3':
                                <div>
                                    <h1>congrats! you're done calibrating :{")"}</h1>
                                    <button onClick={() => navigate("/")}>
                                        take me home
                                    </button>
                                    <button onClick={reset}>
                                        restart calibration
                                    </button>
                                </div>
                        }[counter]
                    }
                </div>
            </div>
        </div>
    );
}

