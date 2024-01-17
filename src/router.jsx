import { Routes, Route } from 'react-router-dom';
import App from './screens/App';
import Calibration from './screens/Calibration';

const Router = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<App />} />
          <Route path="/calibration" element={<Calibration />} />
       </Routes>
    </>
 );
};

export default Router;