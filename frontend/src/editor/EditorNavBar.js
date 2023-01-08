import {
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Avatar,
  Box,
  Button,
  Typography,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editCurrentDocument } from "../store/documents";

const EditorNavBar = ({ document, setShowModal, text }) => {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  useEffect(() => {
    setName(document?.name);
  }, [document]);

  const handleUpdateName = async () => {
    await dispatch(
      // editCurrentDocument({ name, text: document?.text }, document?.id)
      editCurrentDocument({ name, text }, document?.id)
    );
  };

  // const saveDocument = async () => {
  //   console.log("UPDATING", document?.name, documentId);
  //   await dispatch(
  //     editCurrentDocument({ name: document?.name, text }, documentId)
  //   );
  // };

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
            }}
          >
            {/* <Button variant="contained" onClick={() => setShowModal(true)}>
              <Typography variant="button">Save</Typography>
            </Button> */}
            <Button variant="contained" onClick={() => setShowModal(true)}>
              <PeopleOutlineOutlinedIcon />
              <Typography variant="button">Share</Typography>
            </Button>
            <IconButton>
              <Avatar
                sx={{ bgcolor: "#D35400", height: "32px", width: "32px" }}
              >
                {user.full_name[0]}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default EditorNavBar;
