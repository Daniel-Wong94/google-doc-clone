import { Box, CssBaseline, Modal } from "@mui/material";
import EditorNavBar from "./EditorNavBar";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import TextEditor from "./TextEditor";
import { loadCurrentDocument } from "../store/documents";
import { loadUserDocuments } from "../store/userDocuments";
import ShareModal from "./ShareModal";
import styles from "./Editor.module.css";
import { io } from "socket.io-client";
import { getComments } from "../store/comments";
import SideBar from "./SideBar";

const Editor = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { documentId } = useParams();
  const user = useSelector((state) => state.session.user);
  const document = useSelector((state) => state.documents[documentId]);
  const userRole = useSelector((state) => state.userDocuments[user?.id]);
  const [showModal, setShowModal] = useState(false);
  const [socket, setSocket] = useState();
  const [text, setText] = useState(document?.text);
  const isOwner = document?.owner?.id === user?.id;
  const isEditor = userRole && userRole.role === "Editor";
  const readOnly = !isOwner && !isEditor;
  const quillRef = useRef(null);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(loadCurrentDocument(documentId));
        await dispatch(loadUserDocuments(documentId));
        await dispatch(getComments(documentId));
      } catch (e) {
        return history.push("/");
      }
    })();
  }, [dispatch, documentId, history]);

  // create socket, assign room
  useEffect(() => {
    const sio = io({
      query: { room: documentId, name: user.full_name },
    });
    setSocket(sio);

    return () =>
      sio.disconnect({
        query: { room: documentId, name: user.full_name },
      });
  }, [documentId, user?.full_name]);

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
        <EditorNavBar
          document={document}
          setShowModal={setShowModal}
          text={text}
        />
        <Box
          sx={{
            // border: "1px solid red",
            display: "flex",
            position: "relative",
            flex: "1",
            overflow: "scroll",
          }}
        >
          <TextEditor
            document={document}
            socket={socket}
            text={text}
            setText={setText}
            editor={editor}
            setEditor={setEditor}
            quillRef={quillRef}
            readOnly={readOnly}
          />
          <SideBar socket={socket} editor={editor} />
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
