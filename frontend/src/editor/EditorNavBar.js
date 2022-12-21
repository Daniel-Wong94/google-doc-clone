import { AppBar, Toolbar, IconButton, TextField } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editCurrentDocument } from "../store/documents";

const EditorNavBar = ({ document }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  // const handleUpdateName = async () => {
  //   const formData = new FormData();
  //   formData.append("name", name || "Untitled Document");
  //   await dispatch(editCurrentDocument(formData, document?.id));
  // };

  useEffect(() => {
    setName(document?.name);
  }, [document]);

  const handleUpdateName = async () => {
    await dispatch(editCurrentDocument({ name }, document?.id));
  };

  return (
    <AppBar position="static" variant="dense">
      <Toolbar>
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
          size="medium"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleUpdateName}
        />
      </Toolbar>
    </AppBar>
  );
};

export default EditorNavBar;
