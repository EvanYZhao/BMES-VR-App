import React from "react";

export default function Survey() {
   return (
      <div className="metrics">
        How do you feel today?
        <svg class="smiley" width="100" height="100" viewBox="0 0 256 256">
            <circle class="face-1" cx="128" cy="128" r="120"/>
            <circle class="left-eye" cx="100" cy="104" r="12"/>
            <circle class="right-eye" cx="156" cy="104" r="12"/>
            <path class="mouth" d="M100,160 Q128,190 156,160"/>
        </svg>
      </div>
   );
}
