import React from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export const Navbar = () => {
    const navigate = useNavigate();

    return (
        <>
        <div className="navbar-bg">
        <div className="logo">
            VerteFLEX
        </div>
        <nav>
        <div className="button-wrap">
                <button className="navbar-buttons" onClick={() =>
                  navigate("/", { state: { isNewUser: false } })
               }>Home</button>
            <button className="navbar-buttons" onClick={() =>
                  navigate("/calibration", { state: { isNewUser: false } })
               }>Calibrate</button>
            <button className="navbar-buttons" onClick={() =>
                  navigate("/", { state: { isNewUser: false } })
            }>Metrics</button>
            <button className="navbar-buttons" style={{ color: "#ff002f" }} onClick={() =>
                  navigate("/", { state: { isNewUser: false } })
            }>Log Out</button>
        </div>
        </nav>
        </div>
        </>
    )
}