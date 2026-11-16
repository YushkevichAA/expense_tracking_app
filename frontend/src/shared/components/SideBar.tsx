import { NavLink, useLocation } from "react-router";
import { NavItem } from "./NavItem";
import {
  DashboardOutlined,
  ReceiptLongOutlined,
  SchoolOutlined,
} from "@mui/icons-material";

export const SideBar = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <nav>
      <NavLink to="/" end>
        <NavItem
          icon={<DashboardOutlined fontSize="small" />}
          selected={pathname === "/"}
        >
          Обзор
        </NavItem>
      </NavLink>
      <NavLink to="/operations">
        <NavItem
          icon={<ReceiptLongOutlined fontSize="small" />}
          selected={pathname === "/operations"}
        >
          Операции
        </NavItem>
      </NavLink>
      <NavLink to="/tuition">
        <NavItem
          icon={<SchoolOutlined fontSize="small" />}
          selected={pathname === "/tuition"}
        >
          Платежи за обучение
        </NavItem>
      </NavLink>
    </nav>
  );
};
