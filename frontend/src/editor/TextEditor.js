import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRef, useEffect, forwardRef } from "react";
import styles from "./TextEditor.module.css";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import _ from "lodash";

const TextEditor = forwardRef(
  (
    { document, socket, text, setText, editor, setEditor, readOnly = false },
    quillRef
  ) => {
    const { documentId } = useParams();
    // const canvasRef = useRef(null);
    const Delta = Quill.import("delta");
    const change = useRef(new Delta());

    useEffect(() => {
      setEditor(quillRef.current.getEditor());
    }, [quillRef, setEditor]);

    // sends delta whenever there's a change
    // store all changes until save
    useEffect(() => {
      if (!socket || !quillRef) return;

      const onChange = (delta, _oldDelta, source) => {
        if (source === "user") {
          change.current = change.current.compose(delta);
          socket.emit("send-changes", { delta, room: documentId });
        }
      };

      editor.on("text-change", onChange);

      return () => editor.off(onChange);
    }, [socket, quillRef, documentId, editor]);

    // receives the delta and updates the quill instance
    useEffect(() => {
      if (!socket || !quillRef) return;

      const onUpdate = (delta) => {
        editor.updateContents(delta);
        change.current = change.current.compose(delta);
      };

      socket.on("receive-changes", onUpdate);

      return () => socket.off(onUpdate);
    }, [socket, quillRef, editor]);

    // when user joins room:
    useEffect(() => {
      if (!socket || !quillRef) return;

      const onRoomJoined = (data) => {
        socket.emit("sync-document", { change, room: documentId });
      };

      socket.on("room-joined", onRoomJoined);

      return () => socket.off(onRoomJoined);
    }, [socket, quillRef, documentId]);

    useEffect(() => {
      if (!socket || !quillRef) return;

      const onSyncDocument = (incomingChange) => {
        const incomingDelta = new Delta(incomingChange.current);

        if (!_.isEqual(incomingDelta, change.current)) {
          editor.updateContents(incomingChange.current);
          setText(editor.getContents());
          change.current = incomingDelta;
        }
      };

      socket.on("sync-document", onSyncDocument);

      return () => socket.off(onSyncDocument);
    }, [socket, quillRef, Delta, editor, setText]);

    // when user leaves
    useEffect(() => {
      if (!socket || !quillRef) return;

      const onLeftRoom = (message) => {
        // saveDocument();
        // console.log(message);
      };

      socket.on("left-room", onLeftRoom);

      return () => socket.off(onLeftRoom);
    }, [socket, quillRef]);

    // handler to save document
    // const saveDocument = async () => {
    //   console.log("SAVING DOCUMENT");

    //   const data = await dispatch(
    //     editCurrentDocument({ name: document?.name, text }, documentId)
    //   );
    //   change.current = new Delta();
    // };

    // sets the document text on mount
    useEffect(() => {
      setText(document?.text);
    }, [document, setText]);

    // handler to update text state
    const handleChange = (value) => setText(value);

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
    }, [quillRef]);

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
          readOnly={readOnly}
        />
        {/* <canvas ref={canvasRef} /> */}
        {/* <button onClick={saveDocument}>Save Document</button> */}
        {/* <button onClick={logSelection}>Log Selection</button> */}
      </Box>
    );
  }
);

export default TextEditor;
