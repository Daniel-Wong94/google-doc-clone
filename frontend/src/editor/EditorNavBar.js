import { AppBar, Toolbar, IconButton, TextField } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const EditorNavBar = ({ documentName }) => {
  const history = useHistory();
  const [name, setName] = useState(documentName);

  const handleUpdateName = (e) => {
    console.log("HERE BLUE");
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
          gutterBottom
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
