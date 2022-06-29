import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">DOLCE TENTAZIONE</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">0</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">0</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://i.ibb.co/3vV3Pz2/logo-removebg-preview.png" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
