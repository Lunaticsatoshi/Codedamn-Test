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
  useEffect(() => {
    const fetchData = async () => {
      const { language } = await getData();
      const { file, description } = language[0];
      setLanguage(file);
      setValue(description);
    };
    fetchData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get("http://localhost:5000/api/v1/languages");
    return data;
  };
  const onChange = (value) => {
    setValue(value);
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

        <button className="save__button">Save</button>
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
              <h1>Right Top Pane</h1>
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
