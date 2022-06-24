import clsx from "clsx";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./styles.module.css";

export const AnchorText = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<"a"> & {
    hasArrow?: boolean;
    theme?: "white";
    size?: 12 | 14 | 16;
  }
>(function AnchorTextBase(
  { className, hasArrow, theme, size = 16, ...props },
  ref
) {
  return (
    <a
      {...props}
      ref={ref}
      className={clsx(className, styles.module)}
      data-arrow={hasArrow}
      data-theme={theme}
      data-size={size}
      role="link"
    />
  );
});
