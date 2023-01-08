import { AppBar, IconButton, Button, Toolbar } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/session";
import { useHistory } from "react-router-dom";

const SplashNav = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogOut = () => dispatch(logout());

  return (
    <>
      <AppBar position="sticky">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton color="inherit">
            <DescriptionIcon fontSize="large" />
            Google Docs
          </IconButton>
          {user ? (
            <Button color="inherit" onClick={handleLogOut}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => history.push("/login")}>
              Sign in
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default SplashNav;