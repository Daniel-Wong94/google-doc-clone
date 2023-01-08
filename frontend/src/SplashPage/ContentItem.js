import { Screenshot } from "../elements";
import { Box, Container, Grid, Typography } from "@mui/material";

const ContentItem = ({ content, idx }) => {
  const reverseOrder = idx % 2 === 1 ? "row-reverse" : "row";

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: reverseOrder,
      }}
    >
      <Screenshot src={content.src} maxWidth={675} maxHeight={450} />
      <Container>
        <Typography variant="h2" fontSize={36} py={4} fontWeight={400}>
          {content.heading}
        </Typography>
        <Typography variant="subtitle1" fontSize={18}>
          {content.body}
        </Typography>
      </Container>
    </Container>
  );
};

export default ContentItem;
