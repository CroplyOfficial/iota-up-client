import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

const palette = {
  primary: {
    main: "#1B8271",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#FF7468",
    contrastText: "#ffffff",
  },
  disabled: {
    main: "#9d9d9d",
    contrastText: "#9d9d9d",
  },
};
const _theme = createMuiTheme({ palette });
export const theme = responsiveFontSizes(_theme);
