import {
  Container,
  Stack,
  Typography,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadAllDocuments } from "../store/documents";
import DocumentCard from "./DocumentCard";

const RecentDocuments = () => {
  const dispatch = useDispatch();
  const documents = useSelector((state) => Object.values(state.documents));
  const [searchFilter, setSearchFilter] = useState("anyone");

  useEffect(() => {
    (async () => dispatch(loadAllDocuments(searchFilter)))();
  }, [dispatch, searchFilter]);

  return (
    <Container maxWidth="lg" sx={{ marginTop: "36px", flex: "1" }}>
      <Stack direction="row" justifyContent="space-between" mb="12px">
        <Typography variant="h5">Recent documents</Typography>
        <Select
          size="small"
          variant="standard"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          sx={{
            "&:before": { borderBottom: "none" },
            "&:after": { borderBottom: "none" },
          }}
        >
          <MenuItem value="anyone">Owned by anyone</MenuItem>
          <MenuItem value="me">Owned by me</MenuItem>
          <MenuItem value="not_me">Not owned by me</MenuItem>
        </Select>
      </Stack>
      <Grid container spacing={2}>
        {documents.map((document) => {
          return (
            <Grid item key={document.id}>
              <DocumentCard document={document} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
export default RecentDocuments;
