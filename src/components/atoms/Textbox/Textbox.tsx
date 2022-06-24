import clsx from "clsx";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./styles.module.css";

export const Textbox = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>(function TextboxBase({ className, ...props }, ref) {
  return (
    <input
      type="text"
      {...props}
      ref={ref}
      className={clsx(className, styles.module)}
    />
  );
});
