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
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createComment } from "../store/comments";

const CommentBox = ({ socket, editor }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
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
    // console.log("selectedRange: ", selectedRange);

    const pageBounds = editor.getBounds(0, 0);

    const selectedText = editor.getText(
      selectedRange.index,
      selectedRange.length
    );
    console.log("SELECTED TEXT: ", selectedText);
    setDocumentText(selectedText);

    const selectedLine = editor.getLine(selectedRange.index);
    const selectedLineNumber = selectedLine[0].offset(editor.scroll);
    console.log("SELECTED LINE NUMBER: ", selectedLineNumber);
    setLineNumber(selectedLineNumber);

    const selectedBounds = editor.getBounds(
      selectedRange.index,
      selectedRange.length
    );
    const rowNumber =
      Math.floor((selectedBounds.top - pageBounds.top) / pageBounds.height) + 1;

    console.log("ROW NUMBER: ", rowNumber);
    setRowNumber(rowNumber);
  };

  const handleComment = async (e) => {
    e.preventDefault();

    const payload = {
      text: documentText,
      comment,
      row_number: rowNumber,
      line_number: lineNumber,
      user_id: user.id,
      document_id: documentId,
    };

    console.log("PAYLOAD", payload);

    const data = await dispatch(createComment(documentId, payload));

    if (data) {
      console.log("COMMENT", data);
    }

    setDocumentText("");
    setComment("");
  };

  return (
    <>
      <Box sx={{ height: "100%", overflow: "scroll" }} ref={commentBoxRef}>
        <List>
          {comments.map((comment) => {
            const user = comment.user;
            return (
              <ListItem key={comment.id} alignItems="flex-start">
                <Avatar
                  sx={{
                    bgcolor: user?.color,
                    height: "32px",
                    width: "32px",
                  }}
                >
                  {user?.full_name[0]}
                </Avatar>
                <Card sx={{ margin: "0 0 10px 10px", width: "100%" }}>
                  <CardContent>
                    <Typography variant="h4" fontSize={14}>
                      {user.full_name} commented on:
                    </Typography>
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
      >
        <Button
          variant="contained"
          // endIcon={<SendIcon />}
          display="inline-block"
          disabled={documentText.length === 0}
          onClick={handleComment}
        >
          Comment
        </Button>
        <TextField
          size="small"
          value={comment}
          autoComplete="off"
          onChange={(e) => setComment(e.target.value)}
          inputProps={{ maxLength: 255 }}
          sx={{ flex: 1 }}
          onFocus={handleSelection}
        />
      </Container>
    </>
  );
};

export default CommentBox;
