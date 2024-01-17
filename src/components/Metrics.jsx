import React from "react";

export default function Metrics({ flexion_score, extension_score }) {
  return (
    <div>
      <h2 style={{textAlign: "center"}}>Metrics</h2>
      <h3>Flexion Score: {flexion_score}%</h3>
      <h3>Extension Score: {extension_score}%</h3>
      <h3>Total Score: {(flexion_score + extension_score) / 2}%</h3>
    </div>
  );
}
