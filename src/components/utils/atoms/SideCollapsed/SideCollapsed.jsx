import { useState } from "react";
import "./sidecollapsed.css";

export const CollapsedSidebar = (props) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
      <button onClick={toggleSidebar} className="toggle-btn">
        {isSidebarCollapsed ? "«" : "»"}
      </button>
      {isSidebarCollapsed ? null : (
        <div className="sidebar-content">{props.children}</div>
      )}
    </div>
  );
};
