import { CssBaseline, Modal } from "@mui/material";
import EditorNavBar from "./EditorNavBar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TextEditor from "./TextEditor";
import { loadCurrentDocument } from "../store/documents";
import ShareModal from "./ShareModal";

const Editor = () => {
  const { documentId } = useParams();
  const dispatch = useDispatch();
  const document = useSelector((state) => state.documents[documentId]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(loadCurrentDocument(documentId));
    })();
  }, [dispatch, documentId]);

  return (
    <>
      <CssBaseline>
        <EditorNavBar document={document} setShowModal={setShowModal} />
        <TextEditor document={document} />
      </CssBaseline>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ShareModal document={document} />
      </Modal>
    </>
  );
};

export default Editor;
