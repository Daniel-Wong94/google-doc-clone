import { Box, Container, CssBaseline, Stack, Typography } from "@mui/material";

const CreateDocument = () => {
  return (
    <Container sx={{ border: "1px solid red" }}>
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
  );
};

export default CreateDocument;
