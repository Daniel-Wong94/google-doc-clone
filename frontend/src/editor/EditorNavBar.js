import { AppBar, Toolbar, IconButton, TextField } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editCurrentDocument } from "../store/documents";

const EditorNavBar = ({ document }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState(document?.name);

  console.log("DOCUMENT HERE", document);

  const handleUpdateName = () => {
    dispatch(editCurrentDocument({ name }, document?.id));
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
