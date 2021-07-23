import { createStyles, makeStyles } from "@material-ui/core";
import { DonateHero } from "../../components/donateHero/donateHero";
import { Footer } from "../../components/footer/Footer";
import { Navbar } from "../../components/navbar/Navbar";
import { DashboardSideNavbar } from "./sideNavbar.dashboard";
import { DashboardProfile } from "./tabs/profile.dashboard";
import { DashboardHeaderStripe } from "./headerStripe.dashboard";
import { DashboardDeleteModal } from "./verifyDeleteModal.dashboard";
import { useState } from "react";
import { DashboardProjects } from "./tabs/projects.dashboard";
import { DashboardFavorites } from "./tabs/favorites.dashboard";
import { Switch, Route } from "react-router-dom";
const useStyles = makeStyles(() =>
  createStyles({
    overview: {
      display: "flex",
    },
  })
);
export const Dashboard = () => {
  const classes = useStyles();
  const [showingVerifyDeleteModal, setShowingVerifyDeleteModal] =
    useState<boolean>(false);
  const handleVerifyDeleteModal = () => {
    setShowingVerifyDeleteModal(!showingVerifyDeleteModal);
  };
  return (
    <div>
      <DashboardDeleteModal
        showing={showingVerifyDeleteModal}
        onClick={handleVerifyDeleteModal}
      />
      <Navbar />
      <div className={classes.overview}>
        <DashboardSideNavbar />
        <DashboardHeaderStripe>
          {/*<DashboardProfile verifyDelete={handleVerifyDeleteModal} />*/}
          {/*<DashboardProjects projects={[]} />*/}
          <Switch>
            <Route
              exact
              path="/dashboard"
              render={() => (
                <DashboardProfile verifyDelete={handleVerifyDeleteModal} />
              )}
            />
            <Route
              exact
              path="/dashboard/profile"
              render={() => (
                <DashboardProfile verifyDelete={handleVerifyDeleteModal} />
              )}
            />
            <Route
              path="/dashboard/projects"
              render={() => <DashboardProjects />}
            />
            <Route
              path="/dashboard/favorites"
              render={() => <DashboardFavorites />}
            />
            <Route path="/dashboard/chat" render={() => <></>} />
          </Switch>
        </DashboardHeaderStripe>
      </div>
      <DonateHero />
      <Footer />
    </div>
  );
};
