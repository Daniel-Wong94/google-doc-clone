import {
  Box,
  Menu,
  Grid,
  IconButton,
  Typography,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { dateFormat } from "../../src/helpers";
import { deleteDocument } from "../store/documents";
import { deleteUserDocuments } from "../store/userDocuments";
import { loadAllDocuments } from "../store/documents";
import { Screenshot } from "../elements";

const DocumentCard = ({ document }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const [menuAnchor, setMenuAnchor] = useState(null);

  const openMenu = (e) => {
    e.stopPropagation();
    setMenuAnchor(e.currentTarget);
  };

  const closeMenu = (e) => {
    e.stopPropagation();
    setMenuAnchor(null);
  };

  const openDocument = () => {
    return history.push(`/documents/${document?.id}`);
  };

  const handleRemove = async (e) => {
    e.stopPropagation();

    if (document?.owner_id === user.id) {
      await dispatch(deleteDocument(document?.id));
    } else {
      await dispatch(deleteUserDocuments(document?.id, user.id));
      await dispatch(loadAllDocuments("anyone"));
    }
  };

  return (
    <Box
      sx={{
        width: 210,
        height: 340,
        border: "1px solid #DEE1E5",
        borderRadius: "4px",
        "&:hover": {
          cursor: "pointer",
          border: "1px solid #4284F3",
        },
      }}
      onClick={openDocument}
    >
      <Box sx={{ height: "263px", borderBottom: "1px solid #DEE1E5" }}>
        {document?.thumbnail && (
          <Screenshot
            src={document?.thumbnail}
            alt={"document preview"}
            maxHeight={"262px"}
          />
        )}
      </Box>
      <Box padding="12px">
        <Typography variant="body2" noWrap>
          {document?.name}
        </Typography>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <ArticleIcon color="primary" />
            <PeopleOutlineOutlinedIcon />
          </Grid>
          <Grid item>
            <Typography variant="caption">
              {dateFormat(document?.last_edited)}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton size="small" onClick={openMenu}>
              <MoreVertOutlinedIcon />
            </IconButton>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={closeMenu}
            >
              <MenuItem onClick={handleRemove} disabled={document?.id < 4}>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText>Remove</ListItemText>
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DocumentCard;
