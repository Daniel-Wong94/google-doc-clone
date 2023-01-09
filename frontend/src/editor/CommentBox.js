import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemText,
  TextField,
  Container,
  Button,
  Divider,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const CommentBox = ({ socket }) => {
  const commentBoxRef = useRef(null);
  const comments = useSelector((state) => state.comments);
  const [comment, setComment] = useState("");

  return (
    <>
      <Box sx={{ height: "100%", overflow: "scroll" }} ref={commentBoxRef}>
        <List>
          {comments.map((comment) => {
            const user = comment.user;
            return (
              // <ListItem key={id}>
              //   <Avatar
              //     sx={{
              //       bgcolor: user?.color,
              //       height: "32px",
              //       width: "32px",
              //     }}
              //   >
              //     {user.full_name[0]}
              //   </Avatar>
              //   <Container>
              //     <ListItemText primary={text} secondary={comment} />
              //   </Container>
              // </ListItem>
              <ListItem key={comment.id}>
                <Card>
                  <CardContent>
                    <Grid container alignItems="center">
                      <Avatar
                        sx={{
                          bgcolor: user?.color,
                          height: "32px",
                          width: "32px",
                        }}
                      >
                        {user?.full_name[0]}
                      </Avatar>
                      <Typography>
                        {user?.full_name} commented on "{comment?.text}"
                      </Typography>
                    </Grid>
                    <Typography>{comment?.comment}</Typography>
                    <Typography variant="caption">
                      Row: {comment?.row_number} Line: {comment?.line_number}
                    </Typography>
                    <Typography variant="caption">
                      {comment?.created_at}
                    </Typography>
                  </CardContent>
                </Card>
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Divider />
      <Container
        sx={{ width: "100%", display: "flex", gap: "12px", padding: "24px" }}
        component={"form"}
      >
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          display="inline-block"
        >
          Comment
        </Button>
        <TextField
          size="small"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          inputProps={{ maxLength: 255 }}
          sx={{ flex: 1 }}
        />
      </Container>
    </>
  );
};

export default CommentBox;
