import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

const DocumentCard = ({ document }) => {
  const dateFormat = (stringDate) =>
    new Date(document?.last_edited).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <Box
      sx={{
        width: 210,
        height: 340,
        backgroundColor: "#FFFFFF",
        border: "1px solid #DEE1E5",
        borderRadius: "4px",
        "&:hover": {
          cursor: "pointer",
          border: "1px solid #4284F3",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Box sx={{ height: "263px", borderBottom: "1px solid #DEE1E5" }}></Box>
      <Container sx={{ padding: "16px 0" }}>
        <Typography variant="body2" noWrap>
          {document?.name}
        </Typography>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <ArticleIcon color="primary" />
            <PeopleOutlineOutlinedIcon />
          </Grid>
          <Grid item>
            <Typography variant="caption">
              {dateFormat(document?.last_edited)}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton size="small">
              <MoreVertOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DocumentCard;
