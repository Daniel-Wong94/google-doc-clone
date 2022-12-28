import { Stack, Typography, Avatar, Select, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";

const UserCard = ({
  user,
  currentRole,
  onShowUpdate,
  ownerId,
  ownerCard = false,
}) => {
  const sessionUser = useSelector((state) => state.session.user);
  const [role, setRole] = useState(currentRole);
  const isOwner = sessionUser.id === ownerId;

  const updateRole = (e) => {
    e.preventDefault();
    setRole(e.target.value);
    if (role === "Remove") {
      // dispatch remove
    }

    onShowUpdate(true);

    //dispatch update role
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
