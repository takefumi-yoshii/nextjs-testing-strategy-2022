import { memo } from "react";
import styles from "./styles.module.css";

export const BasicFooter = memo(function BasicFooterBase() {
  return <footer className={styles.footer}></footer>;
});
