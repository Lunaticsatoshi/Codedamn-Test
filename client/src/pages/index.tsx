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
  useEffect(() => {
    const fetchData = async () => {
      const { language } = await getData();
      const { file, description } = language[0];
      if (file === "html") {
        setSourceDoc(description);
      } else {
        setSourceDoc(`
        <html>
        <head>
        <style>
        *{
          background-color: #ffffff;
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
    };
    fetchData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get("http://localhost:5000/api/v1/languages");
    return data;
  };
  const onChange = (newValue) => {
    setValue(newValue);
    if (language === "html") {
      const time = setTimeout(() => {
        setSourceDoc(newValue);
      }, 250);
      clearTimeout(time);
    }
  };

  const reloadWindow = async () => {
    console.log("reloading");
    const newData = {
      file: language,
      description: value,
    };
    console.log(newData);
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/addLanguages",
      newData
    );
    console.log(data);
    console.log("reloaded");
  };

  const saveData = async () => {
    const newData = {
      file: language,
      description: value,
    };
    console.log(newData);
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/addLanguages",
      newData
    );
    console.log(data);
  };
  return (
    <div>
      <Navbar />
      <div className="select__inputs">
        <select className="select__input" id="language">
          <option>javascript</option>
          <option>javascript</option>
          <option>javascript</option>
          <option>javascript</option>
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
            reloadWindow={reloadWindow}
          />
          <SplitPane split="horizontal">
            <div className={styles.pane}>
              <div className={styles.output}>
                <div>Top Pane</div>
                <div className={styles.frame}>
                  <iframe
                    srcDoc={srcDoc}
                    title="output"
                    frameBorder="0"
                    width="100%"
                    height="100%"
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
