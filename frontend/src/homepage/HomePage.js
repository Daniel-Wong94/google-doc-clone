import HomeNavBar from "./HomeNavBar";
import CreateDocument from "./CreateDocument";
import RecentDocuments from "./RecentDocuments";
import { CssBaseline } from "@mui/material";

const HomePage = () => {
  return (
    <CssBaseline>
      <HomeNavBar />
      <CreateDocument />
      <RecentDocuments />
    </CssBaseline>
  );
};

export default HomePage;
