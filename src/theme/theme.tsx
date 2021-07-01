import {createMuiTheme, responsiveFontSizes} from "@material-ui/core";
import {green} from "@material-ui/core/colors";

const palette = {
  primary: {
    main: "#1B8271",
  },
}
const _theme = createMuiTheme({palette});
export const theme = responsiveFontSizes(_theme);

