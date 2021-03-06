import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
type props = {
  language: string;
  value: string;
  onChange: (value: string) => void;
  onEditorMount: () => Object;
  // reloadWindow: () => void;
};

const CodeEditor = (props: props) => {
  function handleEditorWillMount(monaco) {
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }

  const editorRef = useRef(null);
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value, event) => {
    console.log(props.language);
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
      language={props.language}
      value={props.value}
      beforeMount={handleEditorWillMount}
      onMount={handleEditorDidMount}
      onChange={handleEditorChange}
      onValidate={handleEditorValidation}
      theme="vs-dark"
    />
  );
};

export default CodeEditor;
