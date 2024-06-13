import "../styles/Home.css";
import { Navbar } from "../components/Navbar";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";
import RangeSlider from "../components/RangeSlider";
import img from '../assets/spinal.png';

function Survey() {
    const { user } = UserAuth();

    const PROD_WS_URL = `wss://bmes-vr-app-backend-production.up.railway.app/?uid=${user.uid}`
    const DEV_WS_URL = `ws://localhost:8080/?uid=${user.uid}`;
    const socket = new WebSocket(PROD_WS_URL)

    const [formData, setFormData] = useState({
        painType: [],
        area: [],
        intensity: 0,
    });

    const handleCheckboxChange = (e) => {
        const {name, value, checked} = e.target;
        if (checked) {
            setFormData({
                ...formData,
                [name]: [...formData[name], value],
            });
        } else {
            setFormData({
                ...formData,
                [name]: formData[name].filter((v) => v !== value),
            });
        }
    };

    const handleSliderChange = (value) => {
        setFormData({
            ...formData,
            intensity: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        // Here you can add the code to send the form data to your backend server or WebSocket
    };

    return (
       <>
         <div className="home-wrapper">
            <Navbar className="navbar" />
            <div className="home-top-row">
                <div className="vertical-flex">
                  <h1 className="greeting">Patient Feedback Survey</h1>
                  {/* Question Card */}
                <form onSubmit={handleSubmit}>
                    <h2 className="body">type of back pain</h2>
                    <p className="body">which of the following words best describe the type of pain you are experiencing? check all that apply.</p>
                    <input type="checkbox" name="pain-type" value="shooting" onChange={handleCheckboxChange}/>
                        <label htmlFor="">shooting</label>
                    <input type="checkbox" name="pain-type" value="shooting" onChange={handleCheckboxChange}/>
                        <label htmlFor="">sharp</label>
                    <input type="checkbox" name="pain-type" value="shooting" onChange={handleCheckboxChange}/>
                        <label htmlFor="">throbbing</label>
                    <input type="checkbox" name="pain-type" value="shooting" onChange={handleCheckboxChange} />
                        <label htmlFor="">aching</label>
                  <h2 className="body">area</h2>
                    <p className="body">please identify the areas that are in pain</p>
                    <div className="spinal-img">
                    <img src={img} width={175} height={300}></img>
                    </div>
                    <input type="checkbox" name="area" value="cervical" onChange={handleCheckboxChange} />
                        <label htmlFor="">cervical</label>
                    <input type="checkbox" name="area" value="thoracic" onChange={handleCheckboxChange} />
                        <label htmlFor="">thoracic</label>
                    <input type="checkbox" name="area" value="lumbar" onChange={handleCheckboxChange} />
                        <label htmlFor="">lumbar</label>
                    <input type="checkbox" name="area" value="pelvic" onChange={handleCheckboxChange} />
                        <label htmlFor="">pelvic</label>
                  <h2 className="body">intensity of pain</h2>
                    <p className="body">please rate the instensity of your pain on a scale from 1 to 10</p> 
                    <RangeSlider min={0} max={10} value={8} step={1} onChange={handleSliderChange}/>
                    <button type="submit">Submit</button>
                </form>
                </div>
            </div>
         </div>
      </>
   );
}

export default Survey;
