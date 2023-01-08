import {
  Grid,
  Typography,
  Container,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const SplashContainer = () => {
  return (
    <Grid container bgcolor="#F8F9FA" rowSpacing={4}>
      <Container>
        <Grid item>
          <Box py={4}>
            <Typography display="inline" variant="body2" color="textSecondary">
              Follow me
            </Typography>
            <IconButton href="https://www.linkedin.com/in/daniel-kachun-wong/">
              <LinkedInIcon />
            </IconButton>
            <IconButton href="https://github.com/Daniel-Wong94/google-doc-clone">
              <GitHubIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <Box py={4} display="flex" alignItems="center">
            <Typography variant="body2" color="textSecondary" align="center">
              This website is a clone of Google Docs and is for educational
              purposes only. All logos, trademarks, and content belong to their
              respective owners.
            </Typography>
          </Box>
        </Grid>
      </Container>
    </Grid>
  );
};

export default SplashContainer;
