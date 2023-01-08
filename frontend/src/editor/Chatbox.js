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
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMessages, addMessage } from "../store/messages";

const Chatbox = ({ socket }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const messages = useSelector((state) => state.messages);
  const chatboxRef = useRef(null);
  const { documentId } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      await dispatch(getMessages(documentId));
    })();
  }, [dispatch]);

  // socket emit for outgoing message
  const sendMessage = async (e) => {
    e.preventDefault();

    socket.emit("message", {
      message,
      user_id: user.id,
      document_id: documentId,
    });

    setMessage("");
  };

  // socket listen for incoming message
  useEffect(() => {
    if (!socket) return;
    const getMessage = (message) => dispatch(addMessage(message));
    socket.on("receive-message", getMessage);

    return () => socket.off(getMessage);
  }, [socket]);

  // scroll to bottom on new message
  useEffect(() => {
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  }, [messages]);

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
        flex: "1",
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
            height: "100%",
            overflow: "scroll",
          }}
          ref={chatboxRef}
        >
          <List>
            {messages.map(({ id, user, message, sent_at }) => {
              return (
                <ListItem key={id}>
                  <Avatar
                    sx={{ bgcolor: user?.color, height: "32px", width: "32px" }}
                  >
                    {user.full_name[0]}
                  </Avatar>
                  <Container>
                    <ListItemText
                      primary={message}
                      secondary={`Sent at ${sent_at}`}
                    />
                  </Container>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Divider />
        <Container
          sx={{
            width: "100%",
            display: "flex",
            gap: "12px",
            padding: "24px",
          }}
          component={"form"}
          onSubmit={sendMessage}
        >
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={sendMessage}
            disableElevation
          >
            Send
          </Button>
          <TextField
            size="small"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            inputProps={{ maxLength: 255 }}
            fullWidth
          />
        </Container>
      </Box>
    </Paper>
  );
};

export default Chatbox;
