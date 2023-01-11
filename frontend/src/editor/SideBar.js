import { Box, Divider, Paper, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import Chatbox from "./Chatbox";
import CommentBox from "./CommentBox";

const SideBar = ({ socket, editor }) => {
  const [tab, setTab] = useState(1);

  const handleTabSelect = (e, value) => setTab(value);

  return (
    <Paper
      elevation={3}
      sx={{ maxWidth: "30%", position: "sticky", top: "0", flex: "1" }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "space-between",
        }}
      >
        <Tabs value={tab} onChange={handleTabSelect}>
          <Tab label="Chat" value={1} />
          <Tab label="Comments" value={2} />
        </Tabs>
        <Divider />
        {tab === 1 && <Chatbox socket={socket} />}
        {tab === 2 && <CommentBox socket={socket} editor={editor} />}
      </Box>
    </Paper>
  );
};

export default SideBar;
