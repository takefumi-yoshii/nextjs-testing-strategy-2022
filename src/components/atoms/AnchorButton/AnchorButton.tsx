import clsx from "clsx";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./styles.module.css";

export const AnchorButton = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<"a"> & { disabled?: boolean }
>(function AnchorButtonBase({ className, disabled, ...props }, ref) {
  return (
    <a
      {...props}
      ref={ref}
      className={clsx(className, styles.module)}
      role="button"
      aria-disabled={disabled}
    />
  );
});
