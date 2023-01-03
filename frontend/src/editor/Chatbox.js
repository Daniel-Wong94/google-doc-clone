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
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";

const Chatbox = ({ socket }) => {
  const messages = [
    "hey",
    "hello how are you",
    "i'm okay how about you",
    "just testing this chatbox",
    "hey",
    "hello how are you",
    "i'm okay how about you",
    "just testing this chatbox",
    "hey",
    "hello how are you",
    "i'm okay how about you",
    "just testing this chatbox",
    "hey",
    "hello how are you",
    "i'm okay how about you",
    "just testing this chatbox",
    "hey",
    "hello how are you",
    "i'm okay how about you",
    "just testing this chatbox",
    "hey",
    "hello how are you",
    "i'm okay how about you",
    "just testing this chatbox",
    "hey",
    "hello how are you",
    "i'm okay how about you",
    "just testing this chatbox",
    "hey",
    "hello how are you",
    "i'm okay how about you",
    "just testing this chatbox",
    "hey",
    "hello how are you",
    "i'm okay how about you",
    "just testing this chatbox",
    "hey",
    "hello how are you",
    "i'm okay how about you",
    "just testing this chatbox",
  ];

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
        {/* <Box padding={1}>
          <Typography variant="h6">Chatbox</Typography>
        </Box> */}
        <Tabs>
          <Tab label="Chat">Chat</Tab>
          <Tab label="Comments">Comments</Tab>
        </Tabs>
        <Divider />
        <Box
          sx={{
            // flex: "1",
            height: "100%",
            overflow: "scroll",
            // marginBottom: "86px",
            // border: "1px solid red",
          }}
        >
          <List>
            {messages.map((msg, idx) => {
              return (
                <ListItem key={idx}>
                  <ListItemText primary={msg} />
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
          <Button variant="contained" endIcon={<SendIcon />} disableElevation>
            Send
          </Button>
          <TextField size="small" fullWidth />
        </Container>
      </Box>
    </Paper>
  );
};

export default Chatbox;
