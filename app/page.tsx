import MainPage from "@/components/home-page-client-component";
import { metaDataGeneratorForNormalPage } from "@/lib/meta-generator";

export const metadata = metaDataGeneratorForNormalPage("Home");
const HomePage = () => {
  return (
    <>
      <MainPage />
    </>
  );
};

export default HomePage;
