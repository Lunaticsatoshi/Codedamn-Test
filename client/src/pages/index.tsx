import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import dynamic from "next/dynamic";

import SplitPane from "react-split-pane";
import Pane from "react-split-pane";

const CodeEditor = dynamic(() => import("../components/CodeEditor"), {
  ssr: false,
});
export default function Home() {
  return (
    <div className={styles.container}>
      <SplitPane split="vertical" minSize={50}>
        <CodeEditor />
        <SplitPane split="horizontal">
          <h1>Right Top Pane</h1>
          <h1>Right Bottom Pane</h1>
        </SplitPane>
      </SplitPane>
    </div>
  );
}
