import { Container } from "../../components/container/container";
import { Footer } from "../../components/footer/Footer";
import { Navbar } from "../../components/navbar/Navbar";
import { AboutUsHero } from "./hero.about_us";
import { DonateHero } from "../../components/donateHero/donateHero";
import { AboutUsFeelessDonationsHero } from "./feelessDonationHero.about_us";
import { AboutUsDonateHero } from "./donateHero.about_us";

export const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <AboutUsHero />
      </Container>
      <AboutUsDonateHero />
      <AboutUsFeelessDonationsHero />
      <DonateHero />
      <Footer />
    </div>
  );
};
