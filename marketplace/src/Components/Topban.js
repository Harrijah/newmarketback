import React from "react";

export default function Topban({user}) {
  return (
    <div className="prsnlban">
      <div className="greetings">
        <span>Bonjour {user.prenom}, </span> &nbsp;
        <span>Points de fidélité : {user.points} points </span>
      </div>
    </div>
  );
}
