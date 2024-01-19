import { Routes, Route } from 'react-router-dom';
import Home from "./screens/Home.jsx";
import Calibration from './screens/Calibration';

const Router = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calibration" element={<Calibration />} />
       </Routes>
    </>
 );
};

export default Router;