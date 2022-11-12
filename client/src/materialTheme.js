import { createTheme } from "@material-ui/core";
import { COLORS } from "./constants/colors";

const defaultTheme = createTheme();

export const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.BLUE,
    },
    secondary: {
      main: COLORS.LIGHT_BLUE,
    },
    dark: {
      main: COLORS.BLACK,
    },
    lightGrey: {
      main: COLORS.GREY
    }
  },
  overrides: {
    MuiAutocomplete: {
      popper: {
        zIndex: 4000,
      }
    },
    MuiInputAdornment: {
      root: {
        fontSize: "40px"
      }
    },
    MuiInputBase: {
      root: {
        borderRadius: "8px !important",
        color: COLORS.BLACK,
        fontWeight: "400",
        height: "45px",
        [defaultTheme.breakpoints.up("md")]: {
          height: "75px",
        },
      },
      input: {
        color: COLORS.BLACK,
        opacity: "1",
        backgroundColor: "#fff",
        paddingLeft: "14px !important",
        fontSize: "15px !important",
        [defaultTheme.breakpoints.up("md")]: {
          fontSize: "24px !important",
        },
      },
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: `${COLORS.BLUE} !important`,
        borderRadius: "9px !important"
      },
      input: {
        padding: "0 14px",
      }
    },
    MuiButton: {
      root: {
        borderRadius: "10px !important",
        height: "45px",
        [defaultTheme.breakpoints.up("md")]: {
          height: "75px",
        },
        "&:hover": {
          opacity: 0.85
        },
      },
      sizeLarge: {
        padding: "16px 12px !important",
        fontSize: "20px !important",
        fontWeight: "600",
      },
    },
    MuiToggleButton: {
      select: {
        backgroundColor: "#0159c2 !important",
      },
    },
    MuiSelect: {
      root: {
        padding: "0 14px",
        fontSize: "16px",
        [defaultTheme.breakpoints.up("md")]: {
          fontSize: "24px",
        },
      },
      select: {
        "&:focus": {
          background: "none !important",
        },
      },
      outlined: {
        borderRadius: "9px",
        paddingRight: "0 !important",
        [defaultTheme.breakpoints.up("md")]: {
          paddingRight: "unset",
        },
      }
    },
    MuiMenuItem: {
      root: {
        border: `1px solid ${COLORS.BLUE}`,
        height: "43px",
        [defaultTheme.breakpoints.up("md")]: {
          height: "63px",
        },
        "&:last-child": {
          borderRadius: "0 0 10px 10px",
        }
      }
    },
    MuiMenu: {
      list: {
        padding: "0",
      },
      paper: {
        borderRadius: "0 0 10px 10px"
      }
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: "#ff00ff !important"
      }
    }
  },
  typography: {
    fontFamily: [
      "Colfax",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    button: {
      textTransform: "none",
    },
    h1: {
      fontSize: "45px",
      fontFamily: "Colfax Bold !important",
    },
    h2: {
      fontFamily: "Colfax Bold !important",
      fontSize: "20px !important",
      [defaultTheme.breakpoints.up("md")]: {
        fontSize: "35px !important",
      },
    },
    h3: {
      fontFamily: "Colfax Bold !important",
      fontSize: "20px !important",
      [defaultTheme.breakpoints.up("md")]: {
        fontSize: "30px !important",
      },
    },
    h4: {
      fontSize: "24px",
      fontFamily: "Colfax Bold !important",
    },
    h5: {
      fontFamily: "Colfax Medium !important",
      fontSize: "16px !important",
      [defaultTheme.breakpoints.up("md")]: {
        fontSize: "20px !important",
      },
    },
    h6: {
      fontSize: "16px",
      fontFamily: "Colfax Medium !important",
    },
    body1: {
      fontFamily: "Colfax Regular !important",
      fontSize: "15px !important",
      lineHeight: "19px !important",
      [defaultTheme.breakpoints.up("md")]: {
        fontSize: "16px !important",
      },
    },
    body2: {
      [defaultTheme.breakpoints.up("xs")]: {
        fontFamily: "Colfax Regular !important",
        fontSize: "16px !important",
        lineHeight: "30px !important",
      },
    },
    subtitle1: {
      fontSize: "16px !important",
      [defaultTheme.breakpoints.up("md")]: {
        fontSize: "20px !important",
      },
    },
    subtitle2: {
      [defaultTheme.breakpoints.up("xs")]: {
        fontSize: "16px !important",
        fontFamily: "Colfax Bold",
        lineHeight: "16px !important",
      },
    },
  },
});
