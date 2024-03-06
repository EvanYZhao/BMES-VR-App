import React from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { userCollection } from "../database/firestore";


export const Navbar = () => {
    const navigate = useNavigate();

    const { logOut, user } = UserAuth();

    const handleSignOut = async () => {
       try {
          await logOut();
       } catch (error) {
          console.log(error);
       }
    };
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
            <button className="navbar-buttons" style={{ color: "#ff002f" }} onClick={handleSignOut}>Log Out</button>
        </div>
        </nav>
        </div>
        </>
    )
}