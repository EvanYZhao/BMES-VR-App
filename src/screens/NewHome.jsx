import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";
import Controls from "../components/Controls";
import Metrics from "../components/Metrics";
import "../styles/NewHome.css";
import Calendar from "react-calendar";
import CircularMetric from "../components/CircularMetrics";



import { UserAuth } from "../context/AuthContext";
import { userCollection } from "../database/firestore";

function NewHome() {
    const [bend, setBend] = useState(4); // -30 < x < 41
    const navigate = useNavigate();

    /* Temporarily changing background color of page */
    const [color, setColor] = useState("#1B1B27")
    const click = color => {
      setColor(color)
    }

    useEffect(() => {
      document.body.style.backgroundColor = color
    }, [color])

   return (
    <>        
      <div className="home-wrapper">
        <div className="content-container">
        <div className="side-bar"></div>

        <div className="avatar-container">
            <h1 className="header">Hello, User</h1>
            <div className="inner-avatar-container">
            <Avatar bend={bend} setBend={setBend} />
            </div>
        </div>
        <div>
        <div className="card-container">
            <div className='card-and-header'>
            <h2 className='header'>Metrics</h2>
            <div className="card">
              <CircularMetric size="sm"/>
            </div>
            <h2 className='header'>Trends</h2>
            <div className="card">
                hi
            </div>
            </div>
        </div>
        </div>
        
        </div>
      </div>
      </>
   );
}

export default NewHome;
