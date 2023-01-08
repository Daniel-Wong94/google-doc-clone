import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./TextEditor.module.css";
import { editCurrentDocument } from "../store/documents";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import _ from "lodash";

const TextEditor = ({ document, socket, text, setText }) => {
  const { documentId } = useParams();
  const dispatch = useDispatch();
  const quillRef = useRef(null);
  // const canvasRef = useRef(null);
  // const [text, setText] = useState(document?.text || "");
  // const editor = quillRef.current.getEditor();
  const [editor, setEditor] = useState(null);
  const Delta = Quill.import("delta");
  const change = useRef(new Delta());

  useEffect(() => {
    setEditor(quillRef.current.getEditor());
  }, []);

  // sends delta whenever there's a change
  // store all changes until save
  useEffect(() => {
    if (!socket || !quillRef) return;

    const onChange = (delta, _oldDelta, source) => {
      if (source === "user") {
        change.current = change.current.compose(delta);
        console.log("CHANGE", change.current);
        socket.emit("send-changes", { delta, room: documentId });
      }
    };

    editor.on("text-change", onChange);

    return () => editor.off(onChange);
  }, [socket, quillRef]);

  // receives the delta and updates the quill instance
  useEffect(() => {
    if (!socket || !quillRef) return;
    // const editor = quillRef.current.getEditor();

    const onUpdate = (delta) => {
      console.log("receiving changes", delta);
      editor.updateContents(delta);
      change.current = change.current.compose(delta);
      // setText(editor.getContents());
    };

    socket.on("receive-changes", onUpdate);

    return () => socket.off(onUpdate);
  }, [socket, quillRef]);

  // when user joins room:
  useEffect(() => {
    if (!socket || !quillRef) return;
    // const editor = quillRef.current.getEditor();

    const onRoomJoined = (data) => {
      console.log("CHANGE", change);
      socket.emit("sync-document", { change, room: documentId });
      console.log("room joined", data);
      // setText(editor.getText());
    };

    socket.on("room-joined", onRoomJoined);

    return () => socket.off(onRoomJoined);
  }, [socket, quillRef]);

  useEffect(() => {
    if (!socket || !quillRef) return;

    const onSyncDocument = (incomingChange) => {
      const incomingDelta = new Delta(incomingChange.current);
      // const diffDelta = change.current.diff(incomingDelta);
      if (!_.isEqual(incomingDelta, change.current)) {
        editor.updateContents(incomingChange.current);
        setText(editor.getContents());
        change.current = incomingDelta;
      }
    };

    socket.on("sync-document", onSyncDocument);

    return () => socket.off(onSyncDocument);
  }, [socket, quillRef]);

  // when user leaves
  useEffect(() => {
    if (!socket || !quillRef) return;

    const onLeftRoom = (message) => {
      // saveDocument();
      console.log(message);
    };

    socket.on("left-room", onLeftRoom);

    return () => socket.off(onLeftRoom);
  }, [socket, quillRef]);

  // handler to save document
  const saveDocument = async () => {
    // console.log("SAVING DOCUMENT: ", document?.name, text);
    console.log("SAVING DOCUMENT");
    // setText(editor.getContents());
    const data = await dispatch(
      editCurrentDocument({ name: document?.name, text }, documentId)
    );
    // WHY WON'T IT SAVE WITH THE NEWEST STATE OF TEXT?
    change.current = new Delta();
    // setText(data?.text);

    console.log("SAVE DOCUMENT: ", data);
  };

  // sets the document text on mount
  useEffect(() => {
    setText(document?.text);
  }, [document]);

  // handler to update text state
  const handleChange = (value) => {
    setText(value);
    // console.log("VALUE", value);
    // console.log("TEXT", text);
  };

  // auto-save
  // useEffect(() => {
  //   if (!change || !editor) return;
  //   const interval = setInterval(() => {
  //     if (change.current.length() > 0) {
  //       console.log("AUTO SAVING");
  //       console.log("AUTO SAVE TEXT", text);
  //       saveDocument();
  //     }
  //   }, 2 * 1000);

  //   return () => clearInterval(interval);
  // }, [change, editor]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      ["image", "blockquote", "code-block"],
      ["clean"],
    ],
    // highlight: true,
  };

  // add style classes to quill sub components
  useEffect(() => {
    const editingArea = quillRef.current.editingArea;
    editingArea.classList.add(styles.quillEditingArea);

    const paper = quillRef.current.editingArea.childNodes[0];
    paper.classList.add(styles.quillPaper);

    editingArea.parentNode.childNodes[0].classList.add(styles.quillToolbar);
  }, []);

  // const handleClick = () => {
  //   // create a hidden canvas for 2D image creation
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");
  //   const contents = quillRef.current.getEditor().getContents();
  //   const text = contents.ops.map((op) => op.insert).join("");
  //   ctx.fillText(text, 10, 10);
  //   const img = new Image();
  //   img.onload = () => {
  //     ctx.drawImage(img, 0, 0);
  //   };
  //   img.src = canvas.toDataURL();
  // };

  return (
    <Box
      sx={{
        flex: "3",
      }}
    >
      <ReactQuill
        ref={quillRef}
        className={styles.editorContainer}
        theme="snow"
        value={text}
        onChange={handleChange}
        modules={modules}
      />
      {/* <canvas ref={canvasRef} /> */}
      <button onClick={saveDocument}>Click here</button>
    </Box>
  );
};

export default TextEditor;
