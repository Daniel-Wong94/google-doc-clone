import { Box, CssBaseline, Modal } from "@mui/material";
import EditorNavBar from "./EditorNavBar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TextEditor from "./TextEditor";
import { loadCurrentDocument } from "../store/documents";
import { loadUserDocuments } from "../store/userDocuments";
import Chatbox from "./Chatbox";
import ShareModal from "./ShareModal";
import styles from "./Editor.module.css";
import { io } from "socket.io-client";

const Editor = () => {
  const user = useSelector((state) => state.session.user);
  const { documentId } = useParams();
  const dispatch = useDispatch();
  const document = useSelector((state) => state.documents[documentId]);
  const [showModal, setShowModal] = useState(false);
  const [socket, setSocket] = useState();

  useEffect(() => {
    (async () => {
      await dispatch(loadCurrentDocument(documentId));
      await dispatch(loadUserDocuments(documentId));
    })();
  }, [dispatch, documentId]);

  // create socket, assign room
  useEffect(() => {
    const sio = io({ query: { room: documentId, name: user.full_name } });
    setSocket(sio);

    return () => sio.disconnect();
  }, []);

  const onClose = () => setShowModal(false);

  return (
    <CssBaseline>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          // border: "1px solid red",
        }}
      >
        <EditorNavBar document={document} setShowModal={setShowModal} />
        <Box
          sx={{
            // border: "1px solid red",
            display: "flex",
            position: "relative",
            flex: "1",
            overflow: "scroll",
          }}
        >
          <TextEditor document={document} socket={socket} />
          <Chatbox socket={socket} />
        </Box>
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
      </Box>
    </CssBaseline>
  );
};

export default Editor;
