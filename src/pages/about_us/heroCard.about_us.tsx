import { makeStyles, createStyles, Typography, Theme } from "@material-ui/core";

enum AboutUsHeroCardVariants {
  "flat" = "flat",
  "outlined" = "outlined",
  "shadow" = "shadow",
}
interface IProps {
  header: string | React.ReactNode;
  subHeader: string | React.ReactNode;
  variant?: keyof typeof AboutUsHeroCardVariants;
  icon?: any;
}
export const AboutUsHeroCard = (
  props: IProps & React.HTMLProps<HTMLElement>
) => {
  const { header, subHeader, variant, icon, onClick } = props;
  const isFlat = variant === AboutUsHeroCardVariants.flat;
  const hasShadow = variant === AboutUsHeroCardVariants.shadow;
  const isOutlined = variant === AboutUsHeroCardVariants.outlined;

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: "750px",
        height: "182.53px",
        borderRadius: "15px",
        cursor: "pointer",
        WebkitBoxShadow: isFlat
          ? ""
          : "3px 3px 5px 6px #f5f5f5" /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */,
        MozBoxShadow: isFlat
          ? ""
          : "3px 3px 5px 6px #f5f5f5" /* Firefox 3.5 - 3.6 */,
        boxShadow: isFlat
          ? ""
          : "3px 3px 5px 6px #f5f5f5" /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      }
      },

      column: {
        width: "80%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      },
      header: {
        fontFamily: "Poppins",
        fontWeight: 800,
        fontStyle: "normal",
        fontSize: "24px",
        lineHeight: "36px",
        paddingBottom: "10px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "18px",
        lineHeight: "26px",
      }
      },
      subHeader: {
        fontFamily: "Open Sans",
        fontWeight: 400,
        fontStyle: "normal",
        fontSize: "16px",
        lineHeight: "28px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "12px",
        lineHeight: "20px",
        }
      },
      iconWrapper: {},
      icon: {
        height: "50px",
        width: "50px",
      },
    })
  );
  const classes = useStyles();
  return (
    <div className={props.className} style={props.style} onClick={onClick}>
      <div className={classes.root}>
        <div className={classes.iconWrapper}>{icon}</div>
        <div className={classes.column}>
          <Typography variant="h2" className={classes.header}>
            {header}
          </Typography>
          <Typography variant="body1" className={classes.subHeader}>
            {subHeader}
          </Typography>
        </div>
      </div>
    </div>
  );
};
