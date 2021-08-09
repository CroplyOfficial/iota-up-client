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
};
const _theme = createMuiTheme({ palette });
export const theme = responsiveFontSizes(_theme);
