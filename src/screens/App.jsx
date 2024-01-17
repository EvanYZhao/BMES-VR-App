import { useState } from "react";
import Avatar from "../components/Avatar";
import "../styles/App.css"

function App() {
  const [bend, setBend] = useState(4);

  return <Avatar bend={bend} setBend={setBend} />;
}

export default App;
