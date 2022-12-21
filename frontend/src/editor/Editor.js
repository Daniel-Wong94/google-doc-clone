import { CssBaseline } from "@mui/material";
import EditorNavBar from "./EditorNavBar";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TextEditor from "./TextEditor";
import { loadCurrentDocument, loadAllDocuments } from "../store/documents";

const Editor = () => {
  const { documentId } = useParams();
  const dispatch = useDispatch();
  const document = useSelector((state) => state.documents[documentId]);

  useEffect(() => {
    (async () => {
      await dispatch(loadCurrentDocument(documentId));
    })();
  }, [dispatch]);

  return (
    <CssBaseline>
      <EditorNavBar document={document} />
      <TextEditor document={document} />
    </CssBaseline>
  );
};

export default Editor;
