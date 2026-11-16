// import { useMemo, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,

  // MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  DashboardOutlined,
  ReceiptLongOutlined,
  SchoolOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import { useLoaderData, useNavigate } from "react-router";
import { NavItem } from "../shared/components";
import { Outlet } from "react-router";
import { signOutService } from "../services/server.service";

export function MainPage() {
  const loadedUser = useLoaderData();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const request = await signOutService();
      if (!request) {
        return console.log("ошибка запроса");
      }
      navigate("/auth/sign-in");
    } catch (e) {
      console.log(e);
      // сделать лейбл отображения ошибки
    }
  };
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fff" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 190,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 190,
            boxSizing: "border-box",
            borderRight: "1px solid #f0f2f5",
            px: 1.75,
            py: 2,
          },
        }}
      >
        <Box sx={{ px: 1.25, mb: 3 }}>
          <Typography sx={{ color: "primary", fontWeight: 700, fontSize: 17 }}>
            ФинПлан
          </Typography>
        </Box>

        <NavItem icon={<DashboardOutlined fontSize="small" />}>Обзор</NavItem>
        <NavItem icon={<ReceiptLongOutlined fontSize="small" />}>
          Операции
        </NavItem>
        <NavItem icon={<SchoolOutlined fontSize="small" />} selected>
          Платежи за обучение
        </NavItem>

        <Divider sx={{ my: 2, mx: 0.75 }} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
        <AppBar
          position="static"
          color="inherit"
          elevation={0}
          sx={{ borderBottom: "1px solid #f3f4f6" }}
        >
          <Toolbar sx={{ minHeight: "54px !important", px: "26px !important" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
                Платежи за обучение
              </Typography>
            </Box>
            <Avatar
              sx={{
                width: 27,
                height: 27,
                ml: 1.5,
                bgcolor: "primary.main",
                fontSize: 12,
              }}
            >
              {loadedUser.username[0].toUpperCase()}
            </Avatar>

            <Typography sx={{ ml: 1, fontSize: 12 }}>
              {loadedUser.username}
            </Typography>

            <IconButton
              size="small"
              aria-label="выход из системы"
              sx={{ ml: 1 }}
              onClick={handleLogout}
            >
              <LogoutOutlined fontSize="small" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Outlet />
      </Box>
    </Box>
  );
}
