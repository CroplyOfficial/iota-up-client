import {createMuiTheme, responsiveFontSizes} from "@material-ui/core";
import {green, lightGreen} from "@material-ui/core/colors";

const palette = {
  primary: {
    main: green[500]
  },
  secondary: {
    main: lightGreen[500]
  }
}
const _theme = createMuiTheme({palette});
export const theme = responsiveFontSizes(_theme);

