import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  AppBar,
  Avatar,
  MenuItem,
} from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
import DescriptionIcon from "@mui/icons-material/Description";
import { useSelector } from "react-redux";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const HomeNavBar = () => {
  const user = useSelector((state) => state.session.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ borderRadius: "0" }}
            >
              <DescriptionIcon fontSize="large" />
              <Typography
                variant="h1"
                fontSize={28}
                noWrap
                component="span"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Docs
              </Typography>
            </IconButton>
            {/* <Search>
            <SearchIconWrapper>
            <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
            />
          </Search> */}
            <Box display={{ xs: "none", md: "flex" }}>
              <IconButton onClick={handleClick}>
                <Avatar
                  sx={{ bgcolor: user?.color, height: "32px", width: "32px" }}
                >
                  {user.full_name[0]}
                </Avatar>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <ProfileMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      />
    </>
  );
};

export default HomeNavBar;
