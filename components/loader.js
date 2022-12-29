import React from "react";
import styles from "../styles/Loader.module.css";

function Loader() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </div>
  );
}

export default Loader;
