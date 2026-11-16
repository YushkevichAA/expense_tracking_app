import { useLoaderData } from "react-router";
import { LogoutButton } from "../widgets/Logout";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

export const MainPage = () => {
  const loadedUser = useLoaderData();
  console.log(loadedUser);
  const [operationList, setOprationsList] = useState([]);

  useEffect(() => {}, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <div>
        <div>
          <LogoutButton />
        </div>
        Добро пожаловать {loadedUser.username}
      </div>
    </Box>
  );
};
