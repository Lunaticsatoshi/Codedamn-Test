import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import dynamic from "next/dynamic";

const CodeEditor = dynamic(() => import("../components/CodeEditor"), {
  ssr: false,
});
export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Hello</h1>
      <CodeEditor />
    </div>
  );
}
