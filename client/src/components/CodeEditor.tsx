import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value, event) => {
    console.log("here is the current model value:", value);
  };

  const handleEditorValidation = (markers) => {
    // model markers
    markers.forEach((marker) => console.log("onValidate:", marker.message));
  };

  return (
    <Editor
      height="90vh"
      width="60vw"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      onMount={handleEditorDidMount}
      onChange={handleEditorChange}
      onValidate={handleEditorValidation}
      theme="vs-dark"
    />
  );
};

export default CodeEditor;
