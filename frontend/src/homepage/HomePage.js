import HomeNavBar from "./HomeNavBar";
import CreateDocument from "./CreateDocument";
import RecentDocuments from "./RecentDocuments";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state) => state.session.user);

  return (
    user && (
      <CssBaseline>
        <HomeNavBar />
        <CreateDocument />
        <RecentDocuments />
      </CssBaseline>
    )
  );
};

export default HomePage;
