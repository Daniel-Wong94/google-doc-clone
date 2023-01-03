import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./TextEditor.module.css";
import { editCurrentDocument } from "../store/documents";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

const TextEditor = ({ document, socket }) => {
  const { documentId } = useParams();
  const dispatch = useDispatch();
  const quillRef = useRef(null);
  // const canvasRef = useRef(null);
  const [text, setText] = useState(document?.text);

  useEffect(() => {
    // wait until socket and quillRef is rendered
    if (!socket || !quillRef) return;
    const editor = quillRef.current.getEditor();

    const onChange = (delta, oldDelta, source) => {
      // check the source to prevent infinite loop
      if (source !== "user") return;
      console.log("sending changes", { delta, room: documentId });
      socket.emit("send-changes", { delta, room: documentId });
    };

    editor.on("text-change", onChange);

    return () => editor.off(onChange);
  }, [socket, quillRef]);

  useEffect(() => {
    if (!socket || !quillRef) return;
    const editor = quillRef.current.getEditor();

    const onUpdate = (delta) => {
      console.log("receiving changes", delta);
      console.log("CONTENTS", editor.getContents());

      editor.updateContents(delta.delta);
      // setText(editor.getText());
    };

    socket.on("receive-changes", onUpdate);

    return () => socket.off(onUpdate);
  }, [socket, quillRef]);

  useEffect(() => {
    if (!socket || !quillRef) return;
    const editor = quillRef.current.getEditor();

    const onRoomJoined = async (data) => {
      console.log("room joined", data);
      // console.log("room joined", editor.getText());
      // setText(editor.getText());
      // await handleUpdate();
    };

    socket.on("room-joined", onRoomJoined);

    return () => socket.off(onRoomJoined);
  }, [socket, quillRef]);

  const handleUpdate = async () => {
    console.log("UPDATING", document?.name, documentId);
    await dispatch(
      editCurrentDocument({ name: document?.name, text }, documentId)
    );
  };

  const handleChange = (value) => setText(value);

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

  // sets the document text on mount
  useEffect(() => {
    setText(document?.text);
  }, [document]);

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
      {/* <button onClick={handleUpdate}>Click here</button> */}
    </Box>
  );
};

export default TextEditor;
