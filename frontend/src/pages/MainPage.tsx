import { Typography } from "@mui/material";
import React from "react";

export const MainPage = () => {
  return (
    <div>
      <div>
        <Typography component="a" href="/auth/sign-up" color="primary">
          Выйти из системы
        </Typography>
      </div>
      Это главная страница,авторизованного пользователя
    </div>
  );
};
