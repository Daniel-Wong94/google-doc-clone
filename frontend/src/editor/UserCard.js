import { Stack, Typography, Avatar, Select, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { deleteUserDocuments } from "../store/userDocuments";
import { editUserDocuments } from "../store/userDocuments";

const UserCard = ({
  user,
  currentRole,
  onShowUpdate,
  ownerId,
  ownerCard = false,
}) => {
  const dispatch = useDispatch();
  const { documentId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const [role, setRole] = useState(currentRole);
  const isOwner = sessionUser.id === ownerId;

  const updateRole = async (e) => {
    e.preventDefault();
    setRole(e.target.value);

    if (e.target.value === "Remove") {
      await dispatch(deleteUserDocuments(documentId, user.id));
    } else {
      await dispatch(editUserDocuments(documentId, user.id, e.target.value));
    }
    onShowUpdate(true);
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" alignItems="center" gap="12px">
        <Avatar sx={{ bgcolor: "#D35400", height: "32px", width: "32px" }}>
          {user?.full_name[0]}
        </Avatar>
        <Stack>
          <Typography variant="subtitle2">
            {user?.full_name}
            {sessionUser?.email === user?.email && " (You)"}
          </Typography>
          <Typography variant="caption">{user?.email}</Typography>
        </Stack>
      </Stack>
      {ownerCard ? (
        <Typography fontSize="14px">Owner</Typography>
      ) : (
        <Select
          size="small"
          value={role}
          onChange={updateRole}
          disabled={!isOwner}
        >
          <MenuItem value="Editor">Editor</MenuItem>
          <MenuItem value="Viewer">Viewer</MenuItem>
          <MenuItem value="Remove" sx={{ color: "red" }}>
            Remove
          </MenuItem>
        </Select>
      )}
    </Stack>
  );
};

export default UserCard;
