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

  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      onMount={handleEditorDidMount}
      onChange={handleEditorChange}
      theme="vs-dark"
    />
  );
};

export default CodeEditor;
