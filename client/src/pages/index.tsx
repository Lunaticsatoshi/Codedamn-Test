import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import dynamic from "next/dynamic";

import SplitPane from "react-split-pane";

const CodeEditor = dynamic(() => import("../components/CodeEditor"), {
  ssr: false,
});

const Navbar = dynamic(() => import("../components/Navbar"), {
  ssr: false,
});
export default function Home() {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <SplitPane split="vertical" minSize={50}>
          <CodeEditor />
          <SplitPane split="horizontal">
            <div className={styles.pane}>
              <h1>Right Top Pane</h1>
            </div>
            <div className={styles.pane}>
              <h1>Right Bottom Pane</h1>
            </div>
          </SplitPane>
        </SplitPane>
      </div>
    </div>
  );
}
