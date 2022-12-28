import { CssBaseline, Modal } from "@mui/material";
import EditorNavBar from "./EditorNavBar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TextEditor from "./TextEditor";
import { loadCurrentDocument } from "../store/documents";
import { loadUserDocuments } from "../store/userDocuments";
import ShareModal from "./ShareModal";
import styles from "./Editor.module.css";

const Editor = () => {
  const { documentId } = useParams();
  const dispatch = useDispatch();
  const document = useSelector((state) => state.documents[documentId]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(loadCurrentDocument(documentId));
      await dispatch(loadUserDocuments(documentId));
    })();
  }, [dispatch, documentId]);

  const onClose = () => setShowModal(false);

  return (
    <>
      <CssBaseline>
        <EditorNavBar document={document} setShowModal={setShowModal} />
        <TextEditor document={document} />
        <Modal
          open={showModal}
          onClose={onClose}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className={styles.shareModalWrapper}>
            <ShareModal document={document} onClose={onClose} />
          </div>
        </Modal>
      </CssBaseline>
    </>
  );
};

export default Editor;
