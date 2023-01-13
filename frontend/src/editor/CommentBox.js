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
  Stack,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addComment, createComment, deleteComment } from "../store/comments";

const CommentBox = ({ socket, editor }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { documentId } = useParams();
  const commentBoxRef = useRef(null);
  const comments = useSelector((state) => state.comments);
  const [comment, setComment] = useState("");
  const [documentText, setDocumentText] = useState("");
  const [rowNumber, setRowNumber] = useState();
  const [lineNumber, setLineNumber] = useState();

  useEffect(() => {
    commentBoxRef.current.scrollTop = commentBoxRef.current.scrollHeight;
  }, [comments]);

  const handleSelection = () => {
    const selectedRange = editor.getSelection();

    if (selectedRange) {
      const pageBounds = editor.getBounds(0, 0);

      const selectedText = editor.getText(
        selectedRange.index,
        selectedRange.length
      );
      // console.log("SELECTED TEXT: ", selectedText);
      setDocumentText(selectedText);

      const selectedLine = editor.getLine(selectedRange.index);
      const selectedLineNumber = selectedLine[0].offset(editor.scroll);
      // console.log("SELECTED LINE NUMBER: ", selectedLineNumber);
      setLineNumber(selectedLineNumber);

      const selectedBounds = editor.getBounds(
        selectedRange.index,
        selectedRange.length
      );
      const rowNumber =
        Math.floor((selectedBounds.top - pageBounds.top) / pageBounds.height) +
        1;

      // console.log("ROW NUMBER: ", rowNumber);
      setRowNumber(rowNumber);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    const payload = {
      text: documentText,
      comment,
      row_number: rowNumber,
      line_number: lineNumber,
      user_id: sessionUser.id,
      document_id: documentId,
    };

    console.log("payload", payload);

    const data = await dispatch(createComment(documentId, payload));

    if (data) {
      socket.emit("comment", data);
    }

    setDocumentText("");
    setComment("");
  };

  const handleDeleteComment = async (e, commentId) => {
    e.preventDefault();
    await dispatch(deleteComment(documentId, commentId));
  };

  useEffect(() => {
    if (!socket) return;

    const getComment = (comment) => dispatch(addComment(comment));
    socket.on("receive-comment", getComment);

    return () => socket.off(getComment);
  }, [socket]);

  return (
    <>
      <Box
        sx={{ height: "100%", overflowY: "scroll", overflowX: "hidden" }}
        ref={commentBoxRef}
      >
        <List>
          {comments.map((comment) => {
            const user = comment.user;
            const isOwner = user.id === sessionUser.id;

            return (
              <ListItem
                key={comment.id}
                alignItems="flex-start"
                sx={{ flexDirection: isOwner && "row-reverse" }}
              >
                <Avatar
                  sx={{
                    bgcolor: user?.color,
                    height: "32px",
                    width: "32px",
                  }}
                >
                  {user?.full_name[0]}
                </Avatar>
                <Card sx={{ margin: "0 10px", width: "100%" }}>
                  <CardContent>
                    <Stack position="relative">
                      <Typography variant="h4" fontSize={14}>
                        {user.full_name} commented on:
                      </Typography>
                      {isOwner && (
                        <IconButton
                          onClick={(e) => handleDeleteComment(e, comment.id)}
                          size="small"
                          sx={{
                            position: "absolute",
                            right: "-16px",
                            top: "-12px",
                            "&:hover": {
                              bgcolor: "transparent",
                            },
                          }}
                        >
                          <ClearIcon />
                        </IconButton>
                      )}
                    </Stack>
                    <Typography
                      variant="h4"
                      fontSize={18}
                      align="center"
                      my={2}
                    >
                      "{comment.text}"
                    </Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      component="p"
                    >
                      Row: {comment?.row_number} Line: {comment?.line_number}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      sx={{ wordBreak: "break-word" }}
                    >
                      {comment.comment}
                    </Typography>
                  </CardContent>
                </Card>
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Divider />
      {documentText && (
        <>
          <Container sx={{ padding: "12px 0" }}>
            <Typography variant="h4" fontSize={14} gutterBottom>
              Commenting on:
            </Typography>
            <Typography variant="body2" fontSize={14} align="center">
              "{documentText}"
            </Typography>
          </Container>
          <Divider />
        </>
      )}

      <Container
        sx={{ width: "100%", display: "flex", gap: "12px", padding: "24px" }}
        component={"form"}
        onSubmit={handleComment}
      >
        <TextField
          size="small"
          value={comment}
          autoComplete="off"
          maxLength={255}
          onChange={(e) => setComment(e.target.value)}
          inputProps={{ maxLength: 255 }}
          sx={{ flex: 1 }}
          onFocus={handleSelection}
        />
        <Button
          variant="contained"
          disabled={documentText.length === 0}
          display="inline-block"
          onClick={handleComment}
        >
          Comment
        </Button>
      </Container>
    </>
  );
};

export default CommentBox;
