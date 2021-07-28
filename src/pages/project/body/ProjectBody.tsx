import { createStyles, makeStyles } from "@material-ui/core";
import { Container } from "../../../components/container/container";
import { IProject } from "../../../interfaces/project.interface";
import { ProjectPageVariants } from "../../../interfaces/project.variants.interface";
import { useState } from "react";
import { ProjectBodyInformation } from "./information.body";
import { ProjectBodyUpdates } from "./updates.body";
import {
  BodyOption,
  BodyOptions,
} from "../../../interfaces/project.bodyOptions.intercace";
import { ProjectNavbar } from "../navbar.project";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginTop: "15px",
      display: "flex",
    },
    left: {
      width: "1022px",
      height: "1299px",
      borderRadius: "15px",
      backgroundColor: "#ffffff",
      padding: "25px",
    },
    right: {
      width: "30%",
      padding: "25px",
    },
  })
);

interface IProps {
  variant: ProjectPageVariants;
  project: IProject | Record<never, never>;
}

export const ProjectBody = (props: IProps) => {
  const { variant, project } = props;
  const classes = useStyles();
  const [bodyOption, setBodyOption] = useState<BodyOption>(
    BodyOptions.INFORMATION
  );
  const toggleBodyOption = (option: BodyOption) => {
    setBodyOption(option);
  };
  const isInformation = bodyOption === BodyOptions.INFORMATION;
  const isUpdates = bodyOption === BodyOptions.UPDATES;
  return (
    <Container>
      <div className={classes.root}>
        <br />
        <div className={classes.left}>
          <ProjectNavbar onClick={toggleBodyOption} option={bodyOption} />
          {isInformation ? (
            <ProjectBodyInformation variant={variant} project={project} />
          ) : isUpdates ? (
            <ProjectBodyUpdates variant={variant} project={project} />
          ) : (
            ""
          )}
        </div>
        <div className={classes.right}>b</div>
      </div>
    </Container>
  );
};
