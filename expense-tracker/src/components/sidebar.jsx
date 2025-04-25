import { useState } from "react";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";
import sideBarstyles from "../styles/sidebar.module.css";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { NavLink } from "react-router-dom";

export const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar is open by default

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle sidebar open/collapsed state
  };

  const menuItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <RiDashboardHorizontalFill />,
    },
    {
      path: "/expense-tracker",
      name: "Expenses",
      icon: <GrMoney />,
    },
  ];

  return (
    <div className={sideBarstyles["layout"]}>
      <div
        style={{
          width: isOpen ? "250px" : "55px",
          padding: isOpen ? "20px" : "20px 0", // Conditional padding based on the sidebar state
        }}
        className={sideBarstyles["sidebar"]}
      >
        <div className={sideBarstyles["top-section"]}>
          {isOpen && <h1 className={sideBarstyles["logo"]}>X-Track</h1>}
          <div className={sideBarstyles["sidebar-icon"]} onClick={toggleSidebar}>
            <TbLayoutSidebarLeftCollapseFilled />
          </div>
        </div>
        <div className={sideBarstyles["menu"]}>
          {menuItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                isActive ? sideBarstyles["link"] + " " + sideBarstyles["active"] : sideBarstyles["link"]
              }
              style={{margin: isOpen ? "0" : "0 2px"}}
            >
              <div className={sideBarstyles["icon"]}>{item.icon}</div>
              {isOpen && <div className={sideBarstyles["link-text"]}>{item.name}</div>}
            </NavLink>
          ))}
        </div>
      </div>
      <main className={sideBarstyles["main"]}>{children}</main>
    </div>
  );
};
