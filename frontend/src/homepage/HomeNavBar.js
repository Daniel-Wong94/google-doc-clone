import Box from "@mui/material/Box";
import { Toolbar, IconButton, Typography, AppBar, Avatar } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { useSelector } from "react-redux";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";

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
                DocuSync
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
