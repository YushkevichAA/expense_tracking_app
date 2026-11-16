import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#1976d2",
    },

    background: {
      default: "#f4f7fb",
      paper: "#ffffff",
    },

    text: {
      primary: "#172b4d",
      secondary: "#71809b",
    },

    divider: "#e6ecf4",

    success: {
      main: "#2e7d32",
    },

    error: {
      main: "#d32f2f",
    },
  },

  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    fontSize: 14,

    h5: {
      fontSize: "20px",
      fontWeight: 700,
    },

    h6: {
      fontSize: "18px",
      fontWeight: 700,
    },

    body1: {
      fontSize: "14px",
    },

    body2: {
      fontSize: "12px",
    },

    caption: {
      fontSize: "11px",
      color: "#71809b",
    },

    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },

  shape: {
    borderRadius: 8,
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 5,
          textTransform: "none",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        size: "small",
        variant: "outlined",
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          borderRadius: 5,

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e3e9f2",
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #e6ecf4",
          padding: "12px 16px",
        },

        head: {
          color: "#71809b",
          fontSize: 12,
          fontWeight: 500,
        },
      },
    },

    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        color: "inherit",
      },
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #edf0f4",
        },
      },
    },
  },
});
