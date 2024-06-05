import React, { useState } from "react";
import Metrics from "./Metrics";
import Survey from "./Survey";
import wip from "../assets/wip.png";

export default function Controls({ socket }) {
    const [pumpsOn, togPumps] = useState(false);
    const [solOn, togSols] = useState(false);

    const togglePumps = () => {
        togPumps(!pumpsOn);
        const payload = {
            pump_power: !pumpsOn,
        };
        socket.send(JSON.stringify(payload));
    };

    const toggleSolenoids = () => {
        togSols(!solOn);
        const payload = {
            solenoid_power: !solOn,
        };
        socket.send(JSON.stringify(payload))
    };

    return (
        <div>
            <div className="control-header">Control</div>
            <div className="controls-bg">
                <div className="row-flex">
                    <button
                        onClick={() => togglePumps()}
                        className="pump-air-button"
                    >
                        {pumpsOn ? "Stop Air" : "Pump Air"}
                    </button>
                    <button
                        onClick={() => toggleSolenoids()}
                        className="toggle-solenoid-button"
                    >
                        {solOn ? "Stop Deflating" : "Deflate"}
                    </button>

                    {/* <div className="metric-card">
                        Amount of Air
                        <br />
                        <div className="metric-score">
                            <img className="wip-img" src={wip} />
                        </div>
                    </div> */}
                    <div className="metric-card">
                        Degrees
                        <br />
                        <div className="metric-score">
                            <img className="wip-img" src={wip} />
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
