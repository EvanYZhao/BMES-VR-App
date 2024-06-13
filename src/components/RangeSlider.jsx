import React, {useState, useEffect, useRef} from "react";
import "../styles/Home.css";

function RangeSlider({min, max, value, step}){
    const [sliderRange, setSliderRange] = useState(value);
    const [inputValue, setInputValue] = useState(value);
    const sliderRef = useRef(null);

    function handleSliderInput() {
        const range = max - min;
        const distance = sliderRef.current.value - min;
        const percentage = (distance / range) * 100;
        setSliderRange(percentage);
        setInputValue(sliderRef.current.value);
    }

    useEffect(() => {
        if (sliderRef.current) {
            handleSliderInput();
        }
    }, [sliderRef]);

    useEffect(() => {
        setSliderRange(value);
        setInputValue(value);
    }, [value]);

    return (
        <div className="range-slider">
            <div className="slider-values">
                <div className="horizontal-flex">
                <small>{min}</small>
                <div></div>
                <small>{max}</small>
                </div>
            </div>
            <div className="slider-container">
                <input type="range" className="slider"/>
                <div className="slider-thumb"
                style={{left: `calc(${sliderRange}% - 0.5em)`}}
                >
                </div>
                <div className="progress"
                style={{width: `${sliderRange}%`}}
                ></div>
            </div>
        </div>
    )

}

export default RangeSlider;