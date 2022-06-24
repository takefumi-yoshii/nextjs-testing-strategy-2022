import { Textarea } from "@/components/atoms/Textarea";
import clsx from "clsx";
import { ComponentPropsWithoutRef, ComponentPropsWithRef, useId } from "react";
import styles from "./styles.module.css";

type Props = {
  className?: string;
  titleLevel?: 3 | 4 | 5 | 6;
  labelProps: Omit<ComponentPropsWithoutRef<"label">, "htmlFor" | "className">;
  textareaProps: Omit<ComponentPropsWithRef<"textarea">, "id">;
  description?: string;
  error?: string;
};

export const TextareaWithTitle = ({
  className,
  titleLevel = 3,
  labelProps: { children, ...labelProps },
  textareaProps,
  description,
  error,
}: Props) => {
  const descriptionId = useId();
  const errorMessageId = useId();
  return (
    <div className={clsx(className, styles.module)}>
      <label {...labelProps}>
        <span role="heading" aria-level={titleLevel} className={styles.title}>
          {children}
        </span>
        <Textarea
          {...textareaProps}
          className={clsx(textareaProps?.className, styles.textbox)}
          aria-describedby={descriptionId}
          aria-invalid={!!error}
          aria-errormessage={errorMessageId}
        />
      </label>
      <div className={styles.bottom}>
        {description && (
          <p id={descriptionId} className={styles.description}>
            {description}
          </p>
        )}
        {error && (
          <p id={errorMessageId} className={styles.error}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
