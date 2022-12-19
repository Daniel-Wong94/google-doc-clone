import HomeNavBar from "./HomeNavBar";
import CreateDocument from "./CreateDocument";
import RecentDocuments from "./RecentDocuments";

const HomePage = () => {
  return (
    <>
      <HomeNavBar />
      <CreateDocument />
      <RecentDocuments />
    </>
  );
};

export default HomePage;
