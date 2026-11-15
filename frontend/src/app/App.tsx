import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router";
import { StyledEngineProvider } from "@mui/material/styles";
import { router } from "./router";

export function App() {
  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <RouterProvider router={router} />
    </StyledEngineProvider>
  );
}
