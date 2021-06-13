import React, { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import dynamic from "next/dynamic";
import axios from "axios";

import SplitPane from "react-split-pane";

const CodeEditor = dynamic(() => import("../components/CodeEditor"), {
  ssr: false,
});

const Navbar = dynamic(() => import("../components/Navbar"), {
  ssr: false,
});

const DynamicTerminal = dynamic(() => import("../components/Terminal"), {
  ssr: false,
});

export default function Home() {
  const [language, setLanguage] = useState("javascript");
  const [value, setValue] = useState("//comment");
  const [srcDoc, setSourceDoc] = useState("");
  const [allLanguages, setAllLanguages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let { language } = await getData();
      let { file, description } = language[0];
      if (file === "HTML") {
        setSourceDoc(description);
      } else {
        setSourceDoc(`
        <html>
        <head>
        <style>
        *{
          background-color: #ffffff;
          color: #FF0000
        }
         h1{
           font-weight: bold;
           font-size: 30px;
         }
        </style>
        </head>
        <body>
          <h1>Welcome to Codedit!</h1>
        </body>
        </html>
        `);
      }
      setLanguage(file);
      setValue(description);
      setAllLanguages([
        "javascript",
        "typescript",
        "python",
        "HTML",
        "java",
        "ruby",
        "c++",
        "php",
      ]);
    };

    fetchData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get(
      "https://codeddit-api.herokuapp.com/api/v1/languages"
    );
    return data;
  };
  const onChange = (newValue) => {
    setValue(newValue);
    if (language === "HTML") {
      const time = setTimeout(() => {
        setSourceDoc(newValue);
      }, 250);
    }
  };

  const onLanguageChange = (e) => {
    setLanguage(e.target.value);
    console.log(value);
  };

  const saveData = async () => {
    const newData = {
      file: language,
      description: value,
    };
    console.log(newData);
    const { data } = await axios.post(
      "https://codeddit-api.herokuapp.com/api/v1/addLanguages",
      newData
    );
    console.log(data);
  };

  const onEditorMount = () => {
    return {};
  };
  return (
    <div>
      <Navbar />
      <div className="select__inputs">
        <select
          className="select__input"
          id="language"
          value={language}
          onChange={(e) => onLanguageChange(e)}
        >
          {allLanguages.map((alangauge) => (
            <option key={alangauge}>{alangauge}</option>
          ))}
        </select>

        <button className="save__button" onClick={() => saveData()}>
          Save
        </button>
      </div>
      <div className={styles.container}>
        <SplitPane split="vertical" minSize={50}>
          <CodeEditor
            language={language}
            value={value}
            onChange={onChange}
            onEditorMount={onEditorMount}
            // reloadWindow={reloadWindow}
          />
          <SplitPane split="horizontal">
            <div className={styles.pane}>
              <div className={styles.output}>
                <div className={styles.frame}>
                  <h1>HTML Playground</h1>
                  <iframe
                    srcDoc={srcDoc}
                    title="output"
                    frameBorder="0"
                    width="90%"
                    height="90%"
                  />
                </div>
              </div>
            </div>
            <div className={styles.pane}>
              <DynamicTerminal />
            </div>
          </SplitPane>
        </SplitPane>
      </div>
    </div>
  );
}
