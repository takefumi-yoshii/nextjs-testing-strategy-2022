import clsx from "clsx";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./styles.module.css";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<"textarea">
>(function TextareaBase({ className, ...props }, ref) {
  return (
    <textarea {...props} ref={ref} className={clsx(className, styles.module)} />
  );
});
