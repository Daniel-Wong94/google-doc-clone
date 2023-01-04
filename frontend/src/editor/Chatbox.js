import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Container,
  Divider,
  Tabs,
  Tab,
  Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createMessage, getMessages } from "../store/messages";

const Chatbox = ({ socket }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const messages = useSelector((state) => state.messages);
  const { documentId } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const messages = await dispatch(getMessages(documentId));
    })();
  }, [dispatch]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const data = await dispatch(
      createMessage(documentId, {
        message,
        user_id: user.id,
        document_id: documentId,
      })
    );

    console.log("DATAT", data);
    setMessage("");
  };

  return (
    <Paper
      sx={{
        // height: "100%",
        minWidth: "300px",
        // maxHeight: "100vh",
        // border: "1px solid red",
        position: "sticky",
        top: "0",
        // overflow: "scroll",
        // flex: "1",
      }}
      elevation={3}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "space-between",
          // position: "relative",
          // border: "1px solid red",
        }}
      >
        <Box padding={1}>
          <Typography variant="h6">Chatbox</Typography>
        </Box>
        {/* <Tabs>
          <Tab label="Chat">Chat</Tab>
          <Tab label="Comments">Comments</Tab>
        </Tabs> */}
        <Divider />
        <Box
          sx={{
            // flex: "1",
            height: "100%",
            overflow: "scroll",
          }}
        >
          <List>
            {messages.map(({ id, user, message, sent_at }) => {
              return (
                <ListItem key={id}>
                  <Avatar
                    sx={{ bgcolor: "#D35400", height: "32px", width: "32px" }}
                  >
                    {user.full_name[0]}
                  </Avatar>
                  <ListItemText
                    primary={message}
                    secondary={`Sent at ${sent_at}`}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Divider />
        <Container
          sx={{
            // border: "1px solid red",
            // position: "fixed",
            // bottom: "0",
            width: "100%",
            display: "flex",
            gap: "12px",
            // alignItems: "center",
            padding: "24px",
          }}
        >
          <Button
            onClick={sendMessage}
            variant="contained"
            endIcon={<SendIcon />}
            disableElevation
          >
            Send
          </Button>
          <TextField
            size="small"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
          />
        </Container>
      </Box>
    </Paper>
  );
};

export default Chatbox;
