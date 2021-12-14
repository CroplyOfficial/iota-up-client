import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {LineWeight} from "@material-ui/icons";
import {CounterMask} from "../../static/icons/counter-mask";

const useStyles = makeStyles((theme: Theme)=>createStyles({
  level: {
    backgroundColor: theme.palette.primary.main,
  },
  mask: {
    position: "relative",
    width: "100%",
    height: "255px",
    overflow: "hidden",
  },
  svg: {
    position: "absolute",
  },
  pairs: {
    display: "flex",
    justifyContent: "space-around",
    height: "100%"
  },
  pair: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    zIndex: 2,
  },
  count: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontStyle: "normal",
    fontSize: "50px",
    lineHeight: "75px",
  },
  title: {
    fontFamily: "Poppins",
    fontWeight: 700,
    fontStyle: "normal",
    fontSize: "18px",
    lineHeight: "27px",
  }
}))

export const Counter = () => {
  const classes = useStyles();
  const totalDonorsCount = 4734;
  const donationsCount = 12845;
  const projectsCount = 762;
  const creatorsCount = 382;
  const f = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (<div>
    <div className={classes.level} >
      <div className={classes.mask}>
        <CounterMask className={classes.svg} />
      <div className={classes.pairs}>
        <Pair title="Total Donors" count={f(totalDonorsCount)} />
        <Pair title="Donations" count={f(donationsCount)}/>
        <Pair title="Projects" count={f(projectsCount)}/>
        <Pair title="Creators" count={f(creatorsCount)}/>
      </div>
      </div>
    </div>
    </div>);
}


interface IPairProps {
  title: string;
  count: number | string;
}
const Pair = (props: IPairProps) => {
  const {title, count} = props;
  const classes = useStyles();
  return (<div className={classes.pair}>
    <span className={classes.count}>{count}</span>
    <span className={classes.title}>{title}</span>
      
    </div>);
}
