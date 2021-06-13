import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
type props = {
  language: string;
  value: string;
  onChange: (value: string) => void;
  // reloadWindow: () => void;
};

const CodeEditor = (props: props) => {
  const editorRef = useRef(null);
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value, event) => {
    console.log("here is the current model value:", value);
    props.onChange(value);
  };

  const handleEditorValidation = (markers) => {
    // model markers
    markers.forEach((marker) => console.log("onValidate:", marker.message));
  };

  // window.onload = () => {
  //   props.reloadWindow();
  // };

  return (
    <Editor
      defaultLanguage={props.language}
      defaultValue={props.value}
      onMount={handleEditorDidMount}
      onChange={handleEditorChange}
      onValidate={handleEditorValidation}
      theme="vs-dark"
    />
  );
};

export default CodeEditor;
