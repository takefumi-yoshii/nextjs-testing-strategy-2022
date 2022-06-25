import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.css";

export const Table = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"table">) => {
  return <table {...props} className={clsx(className, styles.table)} />;
};

export const Thead = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"thead">) => {
  return <thead {...props} className={clsx(className, styles.thead)} />;
};

export const Tbody = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"tbody">) => {
  return <tbody {...props} className={clsx(className, styles.tbody)} />;
};

export const Th = ({ className, ...props }: ComponentPropsWithoutRef<"th">) => {
  return <th {...props} className={clsx(className, styles.th)} />;
};

export const Tr = ({ className, ...props }: ComponentPropsWithoutRef<"tr">) => {
  return <tr {...props} className={clsx(className, styles.tr)} />;
};

export const Td = ({ className, ...props }: ComponentPropsWithoutRef<"td">) => {
  return <td {...props} className={clsx(className, styles.td)} />;
};
