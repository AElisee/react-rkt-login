import React from "react";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  return (
    <div>
      <p>home</p>
      <Link to={"settings"}>Go settings</Link>
    </div>
  );
};

export default DashboardHome;
