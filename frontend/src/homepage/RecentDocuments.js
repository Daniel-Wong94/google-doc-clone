import { Container, Stack, Typography, Grid } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadAllDocuments } from "../store/documents";
import DocumentCard from "./DocumentCard";

const RecentDocuments = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const documents = useSelector((state) => Object.values(state.documents));

  useEffect(() => {
    (async () => dispatch(loadAllDocuments("anyone")))();
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ marginTop: "36px" }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" gutterBottom>
          Recent documents
        </Typography>
      </Stack>
      <Grid container spacing={2}>
        {documents.map((document) => {
          return (
            <Grid
              item
              key={document.id}
              onClick={() => history.push(`/documents/${document.id}`)}
            >
              <DocumentCard document={document} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
export default RecentDocuments;
