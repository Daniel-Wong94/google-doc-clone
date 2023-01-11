import HomeNavBar from "./HomeNavBar";
import CreateDocument from "./CreateDocument";
import RecentDocuments from "./RecentDocuments";
import { CssBaseline, Box } from "@mui/material";
import { useSelector } from "react-redux";
import SplashFooter from "../SplashPage/SplashFooter";

const HomePage = () => {
  const user = useSelector((state) => state.session.user);

  return (
    user && (
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <CssBaseline>
          <HomeNavBar />
          <CreateDocument />
          <RecentDocuments />
          <SplashFooter />
        </CssBaseline>
      </Box>
    )
  );
};

export default HomePage;
