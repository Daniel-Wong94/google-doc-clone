import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./TextEditor.module.css";
import { editCurrentDocument } from "../store/documents";

const TextEditor = ({ document }) => {
  const dispatch = useDispatch();
  const quillRef = useRef(null);
  const canvasRef = useRef(null);
  const [text, setText] = useState("");

  const handleUpdate = async () => {
    await dispatch(
      editCurrentDocument({ name: document.name, text }, document?.id)
    );
  };

  const handleChange = (value) => {
    setText(value);
  };

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
  };

  useEffect(() => {
    quillRef.current.editingArea.classList.add(styles.quillEditingArea);
    const editor = quillRef.current.editingArea.childNodes[0];
    editor.classList.add(styles.quillPaper);
    quillRef.current.editingArea.parentNode.childNodes[0].classList.add(
      styles.quillToolbar
    );
  }, []);

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
    <>
      <ReactQuill
        ref={quillRef}
        className={styles.editorContainer}
        theme="snow"
        value={text}
        onChange={handleChange}
        modules={modules}
      />
      <canvas ref={canvasRef} />
      <button onClick={handleUpdate}>Click here</button>
      {/* <ShareModal document={document} /> */}
    </>
  );
};

export default TextEditor;
