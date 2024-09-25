import React from "react";

export default function Leftlateralcolumn({leftColumnRef, button }) {
    return (
        <div ref={leftColumnRef} className="column01">
            <div className="block01">
                {button}
            </div>
        </div>
    )
}