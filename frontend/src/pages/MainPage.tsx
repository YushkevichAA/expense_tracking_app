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

import { LogoutOutlined } from "@mui/icons-material";
import { useLoaderData, useMatches, useNavigate } from "react-router";
import { SideBar } from "../shared/components";
import { Outlet } from "react-router";
import { getAllTransactions, signOutService } from "../services/server.service";
import { useEffect } from "react";
import { useOperationsActions, useUserActions } from "../store";
import type { TUser } from "../store/userStore";

export function MainPage() {
  const { setOperations } = useOperationsActions();
  const { setUser } = useUserActions();
  const loadedUser: TUser = useLoaderData();
  const navigate = useNavigate();
  const matches = useMatches();

  // const { data: transactions } = await getAllTransactions();
  // useUserStore.getState().actions.setUser(userData);
  // useOperationStore.getState().actions.setOperations(transactions);

  useEffect(() => {
    const fetchDataTransactions = async () => {
      const response = await getAllTransactions();
      if (!response?.data) {
        return;
      }
      setOperations(response.data);
    };
    fetchDataTransactions();
    setUser(loadedUser);
    console.log("прошла загрузка пользователя");
  }, []);

  const title =
    [...matches]
      .reverse()
      .map((match) => (match.handle as { title: string } | undefined)?.title)
      .find((value) => value !== undefined) ?? "ФинПлан";

  // const currentPage = navigationList.find((item) =>
  //   matchPath(
  //     {
  //       path: item.path,
  //       end: item.path === "/",
  //     },
  //     pathname,
  //   ),
  // );

  useEffect(() => {
    document.title = `${title} — ФинПлан`;
  }, [title]);

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
    <>
      {loadedUser && (
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
              <Typography
                sx={{ color: "primary", fontWeight: 700, fontSize: 17 }}
              >
                ФинПлан
              </Typography>
            </Box>
            <SideBar />

            <Divider sx={{ my: 2, mx: 0.75 }} />
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
            <AppBar
              position="static"
              color="inherit"
              elevation={0}
              sx={{ borderBottom: "1px solid #f3f4f6" }}
            >
              <Toolbar
                sx={{ minHeight: "54px !important", px: "26px !important" }}
              >
                <Box sx={{ flexGrow: 1 }}></Box>
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
      )}
    </>
  );
}
