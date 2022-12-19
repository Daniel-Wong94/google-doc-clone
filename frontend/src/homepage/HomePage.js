import HomeNavBar from "./HomeNavBar";
import CreateDocument from "./CreateDocument";
import RecentDocuments from "./RecentDocuments";
import { CssBaseline, Stack } from "@mui/material";

const HomePage = () => {
  return (
    <CssBaseline>
      {/* <Stack
        direction="column"
        spacing={1}
        alignContent="center"
        justifyContent="center"
      > */}
      <HomeNavBar />
      <CreateDocument />
      <RecentDocuments />
      {/* </Stack> */}
    </CssBaseline>
  );
};

export default HomePage;
