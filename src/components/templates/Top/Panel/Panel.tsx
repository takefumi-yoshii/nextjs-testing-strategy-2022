import { ReactNode, useId } from "react";
import styles from "./styles.module.css";

type Props = {
  title: string;
  children: ReactNode;
};

export const Panel = ({ title, children }: Props) => {
  const headingId = useId();
  return (
    <section aria-labelledby={headingId} className={styles.headGroup}>
      <h2 id={headingId}>{title}</h2>
      {children}
    </section>
  );
};
