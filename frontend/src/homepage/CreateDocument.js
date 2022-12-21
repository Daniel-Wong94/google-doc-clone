import { Box, Container, Stack, Typography } from "@mui/material";
import { createDocument } from "../store/documents";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const CreateDocument = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCreateDocument = async (e) => {
    e.preventDefault();

    try {
      const document = await dispatch(createDocument());
      console.log("new document", document);
      return history.push(`/documents/${document.id}`);
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  return (
    <Box
      sx={{ flexGrow: 1, backgroundColor: "#F1F3F4", padding: "24px 0" }}
      onClick={handleCreateDocument}
    >
      <Container>
        <Stack direction="row">
          <Typography gutterBottom>Start a new document</Typography>
        </Stack>
        <Stack direction="row">
          <Box>
            <Box
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
              <img
                src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
                alt=""
                width="133px"
                height="169px"
              />
            </Box>
            <Typography variant="subtitle2">Blank</Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default CreateDocument;
