import React from "react";
import Progress from "react-circle-progress-bar"

export default function CircularMetric({ name, flexion_score, extension_score }) {
    return (
        <div>
                <Progress progress={flexion_score} color={"red"}></Progress>
                <h2>{name}</h2>
        </div>
    );
}
