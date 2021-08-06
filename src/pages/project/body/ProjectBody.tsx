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
import { CreateProjectCard } from "../../../components/card/card.createProject";
import { SampleProjects } from "../../root/sampleState";
import { IPost } from "../../../interfaces/post.interface";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginTop: "15px",
      display: "flex",
    },
    left: {
      width: "1070px",
      height: "1080px",
      borderRadius: "15px",
      backgroundColor: "#ffffff",
      padding: "25px",
      boxShadow: "rgba(0,0,0,0.10) 0 0 10px",
    },
    right: {
      padding: "25px",
      marginLeft: "25px",
      paddingRight: "35px",
      paddingLeft: "35px",
      maxWidth: "400px",
      backgroundColor: "#ffffff",
      boxShadow: "rgba(0,0,0,0.10) 0 0 10px",
      borderRadius: "15px",
    },
    rightHeader: {
      fontFamily: "Poppins",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "32px",
      lineHeight: "48px",
      paddingBottom: "15px",
    },
    "*::-webkit-scrollbar": {
      width: "0.4em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  })
);

interface IProps {
  variant: ProjectPageVariants;
  project: IProject;
  setPostModal: Function;
}

export const ProjectBody = (props: IProps) => {
  const { variant, project, setPostModal } = props;
  const otherProjects = [...SampleProjects];
  const classes = useStyles();
  const [bodyOption, setBodyOption] = useState<BodyOption>(
    BodyOptions.INFORMATION
  );
  const toggleBodyOption = (option: BodyOption) => {
    setBodyOption(option);
  };
  const posts: IPost[] = [
    {
      project: "",
      title: "THIS WEEKS UPDATE HEADER",
      body: "lorem ipsum dolor sit amet,",
      created: new Date().getTime(),
    },
    {
      project: "",
      title: "THIS WEEKS UPDATE HEADER",
      body: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non mattis libero. Suspendisse mauris eros, aliquet quis bibendum vitae, blandit ac elit. Etiam non nibh et arcu laoreet vehicula et ac lorem. Sed gravida et elit non pulvinar. Cras ullamcorper mauris ultricies lacus commodo efficitur. Donec ultricies euismod elit quis tincidunt. Quisque vitae orci hendrerit mauris pellentesque bibendum at id sem. Nulla ut dictum purus. Duis in arcu sit amet risus sagittis aliquam. Cras vel orci non lectus varius consectetur. Maecenas orci neque, congue vitae mi vitae, malesuada ultrices erat. Suspendisse accumsan lacus eget arcu pulvinar maximus.

Aenean tempus malesuada consectetur. Vestibulum porttitor magna magna, et fringilla ipsum laoreet in. Phasellus suscipit lacinia risus, et fermentum ligula tincidunt in. Cras id nulla justo. Maecenas quis suscipit massa. Praesent id ipsum accumsan, pretium tellus eget, malesuada velit. Sed et leo rhoncus, tempus risus sed, tempus mauris. Phasellus efficitur quis ligula sed placerat. Pellentesque pellentesque est sit amet tempor elementum. Nullam vitae sem urna. Quisque pharetra neque vitae ante ullamcorper feugiat. Cras tincidunt urna eget dolor feugiat efficitur. Nulla elementum blandit eros, quis eleifend quam. Aliquam posuere pharetra condimentum. Aliquam libero leo, dapibus et ex ut, cursus posuere sapien.

Sed feugiat nunc sapien, quis cursus magna porta congue. Nulla in leo a elit mattis posuere vel quis dolor. Vestibulum a sodales lacus. Nam euismod urna erat, et rhoncus mi vulputate in. Etiam quis fermentum leo, sed porttitor tortor. Sed tempus ante ut faucibus varius. Proin ultrices, augue vitae tincidunt aliquam, risus erat luctus elit, a consectetur tortor nunc sed risus. Etiam consectetur mollis eleifend. Suspendisse potenti. Aliquam erat volutpat.

Vivamus nec tortor quis leo tristique cursus id non dolor. Nulla eros elit, molestie vel lacus id, efficitur consequat ipsum. Duis posuere, nulla eu efficitur ullamcorper, enim tellus laoreet enim, id pharetra ex nulla in nisi. Vestibulum et purus at nisi mattis accumsan. Aenean maximus a purus nec gravida. Quisque lacinia, purus id viverra rhoncus, dui libero ultricies est, lacinia lobortis urna nulla vitae ante. In vulputate finibus tellus, vel faucibus magna tristique vitae.

Quisque dictum libero ac ullamcorper vehicula. Duis semper erat non rhoncus sagittis. Nunc varius, ipsum imperdiet egestas viverra, ex sapien viverra lacus, sed placerat sem ligula et nunc. Nullam nec nulla et ante bibendum molestie id ac ex. Morbi convallis nec purus quis tempor. Ut vulputate quam turpis, eu molestie nunc imperdiet eget. Morbi tempor purus augue, nec elementum ligula lacinia sit amet. Nulla eros nulla, condimentum a orci eu, efficitur laoreet nibh. Interdum et malesuada fames ac ante ipsum primis in faucibus.`,
      created: new Date().getTime(),
    },
  ];
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
            <ProjectBodyUpdates
              variant={variant}
              project={project}
              posts={posts}
              setPostModal={setPostModal}
            />
          ) : (
            ""
          )}
        </div>
        <div className={classes.right}>
          <div className={classes.rightHeader}>Creator’s Other Projects</div>
          {otherProjects.slice(0, 2).map((p, i) => (
            <div>
              <CreateProjectCard project={p} key={"other-projects#" + i++} />
              {i === 1 ? (
                <hr
                  style={{
                    border: "0.1px solid rgba(0,0,0,0.05)",
                    marginTop: "15px",
                    marginBottom: "15px",
                  }}
                />
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
