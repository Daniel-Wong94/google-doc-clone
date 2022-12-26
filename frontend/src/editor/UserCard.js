import { Stack, Typography, Avatar } from "@mui/material";
import { useSelector } from "react-redux";

const UserCard = ({ user, role }) => {
  const session = useSelector((state) => state.session.user);
  const isOwner = role === "Owner";

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" alignItems="center" gap="12px">
        <Avatar sx={{ bgcolor: "#D35400", height: "32px", width: "32px" }}>
          {user?.full_name[0]}
        </Avatar>
        <Stack>
          <Typography variant="subtitle2">
            {user?.full_name}
            {session?.email === user?.email && " (You)"}
          </Typography>
          <Typography variant="caption">{user?.email}</Typography>
        </Stack>
      </Stack>
      <Typography fontSize="14px">{isOwner ? "Owner" : role}</Typography>
    </Stack>
  );
};

export default UserCard;
