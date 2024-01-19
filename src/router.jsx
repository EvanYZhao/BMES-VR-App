import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Calibration from "./screens/Calibration";
import Test from "./screens/Test";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calibration" element={<Calibration />} />
                <Route path="/test" element={<Test />} />
            </Routes>
        </>
    );
};

export default Router;
