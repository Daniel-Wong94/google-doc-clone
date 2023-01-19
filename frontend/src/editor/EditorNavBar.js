import {
  AppBar,
  Badge,
  Toolbar,
  IconButton,
  TextField,
  Avatar,
  Box,
  Button,
  Typography,
  AvatarGroup,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editCurrentDocument } from "../store/documents";
import { ProfileMenu } from "../homepage";
import ChatIcon from "@mui/icons-material/Chat";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const EditorNavBar = ({ document, setShowModal, text, socket }) => {
  const user = useSelector((state) => state.session.user);
  const userDocuments = useSelector((state) =>
    Object.values(state.userDocuments)
  );
  const onlineUsers = userDocuments.filter((user) => user.is_online);
  const { documentId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    setName(document?.name);
  }, [document]);

  const handleUpdateName = async () => {
    await dispatch(
      // editCurrentDocument({ name, text: document?.text }, document?.id)
      editCurrentDocument({ name, text }, document?.id)
    );
  };

  const saveDocument = async () => {
    console.log("UPDATING", document?.name, documentId);
    await dispatch(
      editCurrentDocument({ name: document?.name, text }, documentId)
    );
  };

  return (
    <>
      {/* <AppBar position="static" variant="dense"> */}
      <AppBar position="sticky" variant="dense">
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => history.push("/documents")}
            >
              <DescriptionIcon fontSize="large" />
            </IconButton>
            <TextField
              variant="standard"
              value={name}
              sx={{ width: "300px" }}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleUpdateName}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <AvatarGroup>
              {onlineUsers.map((user) => (
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    sx={{
                      bgcolor: user?.user?.color,
                      height: "32px",
                      width: "32px",
                    }}
                  >
                    {user?.user?.full_name[0]}
                  </Avatar>
                </StyledBadge>
              ))}
            </AvatarGroup>
            <Button variant="contained" onClick={saveDocument}>
              <Typography variant="button">Save</Typography>
            </Button>
            <Button variant="contained" onClick={() => setShowModal(true)}>
              <PeopleOutlineOutlinedIcon />
              <Typography variant="button">Share</Typography>
            </Button>
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
      <ProfileMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      />
    </>
  );
};

export default EditorNavBar;
