import { BasicAside } from "@/components/organisms/BasicAside/BasicAside";
import { BasicFooter } from "@/components/organisms/BasicFooter/BasicFooter";
import { BasicHeader } from "@/components/organisms/BasicHeader";
import { ReactElement } from "react";
import { PortalContextProvider } from "./PortalContextProvider";
import styles from "./styles.module.css";

export const BasicLayout = (page: ReactElement) => (
  <PortalContextProvider>
    <div className={styles.container}>
      <BasicAside />
      <BasicHeader />
      <div className={styles.content}>{page}</div>
      <BasicFooter />
    </div>
  </PortalContextProvider>
);
