import { createStyles, makeStyles, Button } from "@material-ui/core";
import { Card2 } from "../../../components/card/card2";
import { IProject } from "../../../interfaces/project.interface";
import { AddNewProjectCard } from "../AddNewProjectCard.dashboard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../../store";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      gap: "5rem",
      paddingLeft: "5rem",
      flexWrap: "wrap",
      transform: "translate(0,-175px)",
      position: "relative",
    },
    button: {
      padding: "16px",
      paddingLeft: "58px",
      paddingRight: "58px",
      fontFamily: "Poppins",
      fontWeight: 700,
      fontSize: "18px",
      lineHeight: "27px",
      borderRadius: "10px",
      position: "absolute",
      bottom: 0,
      right: 0,
      transform: "translate(-14rem,125px)",
    },
  })
);
interface IProps {}
export const DashboardFavorites = (props: IProps) => {
  const [projects, setProjects] = useState<IProject[]>();

  const userMeta = useSelector((state: RootState) => state.userLogin);
  const { userInfo }: any = userMeta;

  const classes = useStyles();

  const getFavorites = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };
    const { data } = await axios.get("/api/users/me/favorites", config);
    setProjects(data);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div>
      <div className={classes.root}>
        {projects?.map((p) => (
          <Card2 project={p} />
        ))}
        <Button
          color="secondary"
          variant="contained"
          className={classes.button}
        >
          Load More
        </Button>
      </div>
    </div>
  );
};
