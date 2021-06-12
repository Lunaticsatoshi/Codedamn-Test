import React, { useState, useEffect, useRef, FC } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const CodeEditor: FC = (): JSX.Element => {
  const [language, setLanguage] = useState("javascript");
  const [value, setValue] = useState("//comment");
  const editorRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      const { language } = await getData();
      const { file, description } = language[0];
      setLanguage(file);
      setValue(description);
      console.log(React.createElement("span", null));
    };

    fetchData();
  }, []);

  window.onload = () => {
    alert("loaded");
  };

  const getData = async () => {
    const { data } = await axios.get("http://localhost:5000/api/v1/languages");
    return data;
  };
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value, event) => {
    console.log("here is the current model value:", value);
    setValue(value);
  };

  const handleEditorValidation = (markers) => {
    // model markers
    markers.forEach((marker) => console.log("onValidate:", marker.message));
  };

  return (
    <Editor
      defaultLanguage={language}
      defaultValue={value}
      onMount={handleEditorDidMount}
      onChange={handleEditorChange}
      onValidate={handleEditorValidation}
      theme="vs-dark"
    />
  );
};

export default CodeEditor;
