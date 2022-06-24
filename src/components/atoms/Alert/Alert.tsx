import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.css";

type Props = ComponentPropsWithoutRef<"p"> & {
  theme: "success" | "fail";
};
export const Alert = ({ className, theme, ...props }: Props) => (
  <p
    {...props}
    role="alert"
    className={clsx(className, styles.module)}
    data-theme={theme}
  />
);
