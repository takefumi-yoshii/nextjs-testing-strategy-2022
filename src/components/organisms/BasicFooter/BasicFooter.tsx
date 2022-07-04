import { memo } from "react";
import styles from "./styles.module.css";

export const BasicFooter = memo(function BasicFooterBase() {
  return (
    <footer className={styles.footer}>
      <h2 className={styles.heading}>My CRUD Application</h2>
    </footer>
  );
});
