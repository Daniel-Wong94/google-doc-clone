import {
  Box,
  List,
  ListItem,
  TextField,
  Button,
  Container,
  Divider,
  Avatar,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getMessages, addMessage } from "../store/messages";

const Chatbox = ({ socket }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const messages = useSelector((state) => state.messages);
  const chatboxRef = useRef(null);
  const { documentId } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getMessages(documentId));
      } catch (e) {
        return history.push("/");
      }
    })();
  }, [dispatch, documentId, history]);

  // socket emit for outgoing message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.length) return;

    socket.emit("message", {
      message,
      user_id: sessionUser.id,
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
  }, [socket, dispatch]);

  // scroll to bottom on new message
  useEffect(() => {
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  }, [messages]);

  return (
    <>
      <Box
        sx={{
          height: "100%",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
        ref={chatboxRef}
      >
        <List>
          {messages.map(({ id, user, message, sent_at }) => {
            const isOwner = user.id === sessionUser.id;

            return (
              <ListItem
                key={id}
                alignItems="flex-start"
                sx={{ flexDirection: isOwner && "row-reverse" }}
              >
                <Avatar
                  sx={{ bgcolor: user?.color, height: "32px", width: "32px" }}
                >
                  {user.full_name[0]}
                </Avatar>
                <Card sx={{ margin: "0 10px", width: "100%" }}>
                  <CardContent>
                    <Typography variant="h3" fontSize={14} gutterBottom>
                      {isOwner ? "You" : user.full_name} messaged:
                    </Typography>
                    <Typography
                      variant="body1"
                      fontSize={14}
                      sx={{ wordWrap: "break-word" }}
                      gutterBottom
                    >
                      {message}
                    </Typography>
                    <Typography variant="caption">Sent at {sent_at}</Typography>
                  </CardContent>
                </Card>
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
        <TextField
          size="small"
          value={message}
          autoComplete="off"
          maxLength={255}
          onChange={(e) => setMessage(e.target.value)}
          inputProps={{ maxLength: 255 }}
          sx={{ flex: 1 }}
        />
        <Button
          variant="contained"
          disabled={message.length === 0}
          endIcon={<SendIcon />}
          onClick={sendMessage}
          display="inline-block"
        >
          Send
        </Button>
      </Container>
    </>
  );
};

export default Chatbox;
