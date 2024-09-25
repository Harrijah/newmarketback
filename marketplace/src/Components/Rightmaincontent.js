import React from "react";

export default function Rightmaincontent({content, rightContentRef}) {
  return (
    <div ref={rightContentRef} className="column02">
      <div className="contentcontainer">{content}</div>
    </div>
  );
}
