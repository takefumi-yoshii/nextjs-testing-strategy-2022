import { memo } from "react";
import styles from "./styles.module.css";

export const BasicHeader = memo(function BasicHeaderBase() {
  return (
    <header className={styles.header}>
      <h1 className={styles.heading}>My CRUD Application</h1>
    </header>
  );
});
