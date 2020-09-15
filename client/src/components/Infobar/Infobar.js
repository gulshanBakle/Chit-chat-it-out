import React from "react";
import "./Infobar.css";
import closeIcon from "../../images/closeIcon.png";
import onlineIcon from "../../images/onlineIcon.png";

function Infobar({ room }) {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online" />
      </div>
      <h2>{room}</h2>
      <div className="rightInnerContainer">
        <a href="/">
          <img className="closeIcon" src={closeIcon} alt="close" />
        </a>
      </div>
    </div>
  );
}

export default Infobar;
