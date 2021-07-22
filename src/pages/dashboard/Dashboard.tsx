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
      <DashboardDeleteModal showing={showingVerifyDeleteModal} />
      <Navbar />
      <div className={classes.overview}>
        <DashboardSideNavbar />
        <DashboardHeaderStripe>
          {/*<DashboardProfile verifyDelete={handleVerifyDeleteModal} />*/}
          <DashboardProjects projects={[]} />
        </DashboardHeaderStripe>
      </div>
      <DonateHero />
      <Footer />
    </div>
  );
};
