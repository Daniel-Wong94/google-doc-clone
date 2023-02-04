import { Box, Container, Stack, Typography } from "@mui/material";
import { createDocument } from "../store/documents";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import templates from "./TemplateData";

const CreateDocument = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCreateDocument = async ({ name, text, src }) => {
    try {
      let document;
      if (name === "Blank") {
        document = await dispatch(createDocument(text));
      } else {
        document = await dispatch(createDocument(text, src));
      }
      if (document) return history.push(`/documents/${document.id}`);
    } catch (e) {
      // console.log("ERROR", e);
      return;
    }
  };

  return (
    <Box sx={{ backgroundColor: "#F1F3F4", padding: "24px 0" }}>
      <Container>
        <Stack direction="row">
          <Typography gutterBottom>Start a new document</Typography>
        </Stack>
        <Stack direction="row" gap={2}>
          {templates.map((template, idx) => (
            <Box key={idx}>
              <Box
                onClick={() => handleCreateDocument(template)}
                sx={{
                  width: "133px",
                  height: "169px",
                  border: "1px solid #DADCE0",
                  borderRadius: "4px",
                  overflow: "hidden",
                  "&:hover": {
                    border: "1px solid #679FFF",
                    cursor: "pointer",
                  },
                }}
              >
                <img src={template.src} alt="" width="133px" height="169px" />
              </Box>
              <Typography variant="subtitle2">{template.name}</Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default CreateDocument;
