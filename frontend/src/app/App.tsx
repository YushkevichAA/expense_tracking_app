import { RouterProvider } from "react-router";
import { router } from "./router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
