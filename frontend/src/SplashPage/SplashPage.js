import {
  CssBaseline,
  Grid,
  Container,
  Divider,
  Typography,
  Box,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material";
import SplashNav from "./SplashNav";
import HeroContent from "./HeroContent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ContentItem from "./ContentItem";
import SplashContainer from "./SplashFooter";
import heroImage from "../assets/Screenshot 2023-01-08 at 11.58.00 AM.png";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const contents = [
  {
    src: "https://lh3.googleusercontent.com/4f3H_lxFHLFe0VlteoDi_6LbZhFgQaPp0ilivjwFd0IWg4lAAh1imwbw7QG60BqDJI8Xvo0vNjAumbMPmd_5f2jrTZ3_Gee0ZliDUymrOa7MEwjsOoI=w0-l80-sg-rj-c0xffffff",
    heading: "Seamless collaboration, from anywhere",
    body: "Edit together in real-time with easy sharing, and use comments, suggestions, and action items to keep things moving. Or use @-mentions to pull relevant people, files, and events into your online Docs for rich collaboration.",
  },
  {
    src: heroImage,
    heading: "Write faster with built-in intelligence",
    body: "Assistive features like Smart Compose help you write faster with fewer errors, so you can focus on ideas. And save time with spelling and grammar suggestions, voice typing, and quick document translation.",
  },
  {
    src: "https://lh3.googleusercontent.com/Jq71j34mW1A6ESvh63ZNOSBy1mDdZQp-4f7Psqz1x8ugkv0RSo5RkdTGqssdONlZEe6JKqAiOiNjyN8nSDTK-VBTpeHLj5wSXB4NUP59ou3E8ke_Jg=w0-l80-sg-rj-c0xffffff",
    heading: "Seamlessly connect to your other Google apps",
    body: "Docs is thoughtfully connected to other Google apps you love, saving you time. Reply to comments directly from Gmail, embed charts from Google Sheets, and easily share via Google Meet. You can even search the web and Google Drive for relevant content and images, directly from Docs.",
  },
  {
    src: "https://lh3.googleusercontent.com/ZJ6ogeWydApOIBDkc0OEstT4Sh6HpQEop9LOxLg3Gt3xNOlsjcvl-He4dXcSrNqp9aCVke86Y4gycBW4Ib4IggWYqoH1Q5OzpA3sX7m9ZMWDNi8ZWQw=w0-l80-sg-rj-c0xffffff",
    heading: "Bring collaboration and intelligence to other file types",
    body: "Easily edit Microsoft Word files online without converting them, and layer on Docs’ enhanced collaborative and assistive features like action items and Smart Compose. You can also import PDFs, making them instantly editable.",
  },
];

const SplashPage = () => {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const handleGoToDocs = () => history.push(user ? `/documents` : `/login`);
  return (
    <CssBaseline>
      <SplashNav />
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        py="52px"
      >
        <Container>
          <Grid item>
            <HeroContent />
          </Grid>
          <Divider />
          <Grid item>
            <Box
              display="flex"
              flexDirection={"column"}
              justifyContent="center"
              alignItems="center"
              py={6}
            >
              <Typography variant="subtitle1" color="textSecondary">
                See what you can do with Google Docs
              </Typography>
              <KeyboardArrowDownIcon />
            </Box>
          </Grid>
          {contents.map((content, idx) => (
            <Grid item mb={"10%"}>
              <ContentItem content={content} idx={idx} />
            </Grid>
          ))}
        </Container>
      </Grid>
      <Divider />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap="12px"
        my={15}
      >
        <Typography variant="h4">Ready to get started?</Typography>
        <Button onClick={handleGoToDocs} variant="contained" size="large">
          Go to Docs
        </Button>
      </Box>
      <SplashContainer />
    </CssBaseline>
  );
};

export default SplashPage;
