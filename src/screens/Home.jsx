import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";
import Controls from "../components/Controls";
import Metrics from "../components/Metrics";
import "../styles/Home.css";

function Home() {
    const [bend, setBend] = useState(4);
    const navigate = useNavigate();

    return (
        <div className="home-wrapper">
            <div className="home-top-row">
                <div className="avatar-and-controls">
                    <Avatar bend={bend} setBend={setBend} />
                    <Controls />
                </div>
                <Metrics flexion_score={33} extension_score={78} />
            </div>
            <div className="home-bottom-row">
                <button onClick={() => navigate('/test')}className="pump-air-button">Pump Air</button>
                <button onClick={() => navigate('/calibration')} className="recalibrate-button">Recalibrate</button>
            </div>
        </div>
    );
}

export default Home;
