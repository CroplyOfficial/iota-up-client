import React, { useState } from "react";
import {
  withStyles,
  Theme,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Add, Settings, MeetingRoom } from "@material-ui/icons";
import { Avatar, MenuItem, Menu, MenuProps } from "@material-ui/core";
import { useHistory } from "react-router";
import { logout } from "../../actions/userActions";
import { useDispatch } from "react-redux";
import { DashboardCreateProjectModal } from "../../pages/dashboard/createProjectModal.dashboard";

interface IProps {
  userInfo: any;
}

const StyledMenu = withStyles({

  paper: {
    border: "1px solid #d3d4d5",
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme: Theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export const AvatarDropDown = (props: IProps) => {
  const { userInfo } = props;
  const { avatar, firstName, lastName } = userInfo;
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();

  const [showingModal, setShowModal] = useState<boolean>(false);
  const toggleShowModal = () => {
    setShowModal(!showingModal);
  };

  const handleClick = (event: any | React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateNewProject = () => {
    toggleShowModal();
    handleClose();
  };
  const handleDashboard = () => {
    //TODO set CreateNewProject Modal
    handleClose();
    history.push("/dashboard");
  };
  const handleLogout = () => {
    handleClose();
    dispatch(logout());
  };

  return (
    <>
      <DashboardCreateProjectModal
        onClick={toggleShowModal}
        showing={showingModal}
      />
      <Avatar
        alt={`${firstName} ${lastName}`}
        src={avatar}
        onClick={handleClick}
      />
      <StyledMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleCreateNewProject}>
          <ListItemIcon>
            <Add fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Create Project" />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleDashboard}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleLogout}>
          <ListItemIcon>
            <MeetingRoom fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
};
