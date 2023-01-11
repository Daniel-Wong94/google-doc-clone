import { Grid, Typography, Button } from "@mui/material";
import heroImage from "../assets/Screenshot 2023-01-08 at 11.58.00 AM.png";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Screenshot } from "../elements";

const HeroContent = () => {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const handleGoToDocs = () => history.push(user ? `/documents` : `/login`);

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={3}
      mb={12}
    >
      <Grid item>
        <Typography
          variant="h1"
          fontSize="60px"
          fontWeight={400}
          align="center"
        >
          Build your best ideas together, in Google Docs
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          fontSize="16px"
          align="center"
        >
          Create and collaborate on online documents in real-time and from any
          device.
        </Typography>
      </Grid>
      <Grid item>
        <Button
          onClick={handleGoToDocs}
          variant="outlined"
          size="large"
          sx={{ textTransform: "none" }}
        >
          Go to Docs
        </Button>
      </Grid>
      <Grid item display="flex" alignItems="center">
        {!user && (
          <>
            <Typography variant="subtitle1" color="textSecondary">
              Don't have an account?
            </Typography>
            <Button
              variant="text"
              size="large"
              sx={{ textTransform: "none" }}
              onClick={() => history.push("/sign-up")}
            >
              Sign up for free
            </Button>
          </>
        )}
      </Grid>
      <Grid item>
        <Screenshot src={heroImage} maxWidth={700} maxHeight={500} />
      </Grid>
    </Grid>
  );
};

export default HeroContent;
