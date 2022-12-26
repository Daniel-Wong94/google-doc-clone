import {
  Box,
  Stack,
  TextField,
  Typography,
  Container,
  Select,
  MenuItem,
  FormControl,
  FormGroup,
} from "@mui/material";
import UserCard from "./UserCard";
import { useState } from "react";

const ShareModal = ({ document }) => {
  const owner = document?.owner;
  const users = document?.users;
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Editor");

  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        width: "100%",
        maxWidth: "512px",
        borderRadius: "8px",
      }}
    >
      <Container sx={{ padding: "24px" }}>
        <Stack direction="row" pb="12px">
          <Typography
            variant="h5"
            fontSize="22px"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Share "{document?.name}"
          </Typography>
        </Stack>
        <FormControl fullWidth>
          <FormGroup display="flex" row>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Add people"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ flex: "1" }}
              autoFocus
            />
            <Select
              size="small"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="Editor">Editor</MenuItem>
              <MenuItem value="Viewer">Viewer</MenuItem>
            </Select>
          </FormGroup>
        </FormControl>
        <Typography mt="12px" gutterBottom>
          People with access
        </Typography>
        <Stack gap="8px">
          <UserCard user={owner} role="Owner" />
          {users?.map((user) => (
            <UserCard user={user.user} role={user?.role} key={user.user_id} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default ShareModal;
