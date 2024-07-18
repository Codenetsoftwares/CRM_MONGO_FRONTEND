import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  // Add fade class and set animation delay for each element
  return (
    <div className="content-wrapper bg-white">
      <Outlet />
    </div>
  );
};

export default Layout;
