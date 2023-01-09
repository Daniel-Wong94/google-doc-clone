import HomeNavBar from "./HomeNavBar";
import CreateDocument from "./CreateDocument";
import RecentDocuments from "./RecentDocuments";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import SplashFooter from "../SplashPage/SplashFooter";

const HomePage = () => {
  const user = useSelector((state) => state.session.user);

  return (
    user && (
      <CssBaseline>
        <HomeNavBar />
        <CreateDocument />
        <RecentDocuments />
        <SplashFooter />
      </CssBaseline>
    )
  );
};

export default HomePage;
