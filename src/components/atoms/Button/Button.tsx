import clsx from "clsx";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./styles.module.css";

export const Button = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button">
>(function ButtonBase({ className, ...props }, ref) {
  return (
    <button {...props} ref={ref} className={clsx(className, styles.module)} />
  );
});
