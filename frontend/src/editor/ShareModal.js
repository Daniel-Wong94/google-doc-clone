import {
  Box,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  FormGroup,
  Snackbar,
  Button,
} from "@mui/material";
import UserCard from "./UserCard";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createUserDocuments } from "../store/userDocuments";

const ShareModal = ({ document, onClose }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userDocuments = useSelector((state) =>
    Object.values(state.userDocuments)
  );
  const owner = document?.owner;
  const isOwner = sessionUser.id === owner.id;
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Editor");
  const [showUpdate, setShowUpdate] = useState(false);
  const [errors, setErrors] = useState({});

  const closeUpdate = () => setShowUpdate(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createUserDocuments(document?.id, { email, role }));
      setShowUpdate(true);
      setEmail("");
      setErrors({});
    } catch (e) {
      setErrors(e.errors);
    }
  };

  useEffect(() => {
    if (!email.length) setErrors({});
  }, [email]);

  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        width: "100%",
        maxWidth: "512px",
        borderRadius: "8px",
        padding: "24px",
      }}
    >
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
        <FormGroup row>
          <TextField
            variant="outlined"
            size="small"
            placeholder={isOwner ? "Add people" : "Only owner can add users"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ flex: "1", marginRight: "8px" }}
            helperText={errors?.email && errors?.email}
            disabled={!isOwner}
            error={errors?.email}
            autoFocus
          />
          <Select
            size="small"
            value={role}
            disabled={!isOwner}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="Editor">Editor</MenuItem>
            <MenuItem value="Viewer">Viewer</MenuItem>
          </Select>
        </FormGroup>
      </FormControl>
      <Typography mt="12px" mb="12px">
        People with access
      </Typography>
      <Stack gap="8px" mb="12px">
        <UserCard user={owner} onShowUpdate={setShowUpdate} ownerCard />
        {userDocuments?.map((user) => (
          <UserCard
            user={user.user}
            currentRole={user?.role}
            onShowUpdate={setShowUpdate}
            ownerId={document?.owner?.id}
            key={user.user_id}
          />
        ))}
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="small"
          onClick={email.length ? handleSubmit : onClose}
        >
          {email.length ? "Submit" : "Cancel"}
        </Button>
      </Box>
      <Snackbar
        open={showUpdate}
        onClose={closeUpdate}
        message="Update Saved!"
        autoHideDuration={2000}
      />
    </Box>
  );
};

export default ShareModal;
