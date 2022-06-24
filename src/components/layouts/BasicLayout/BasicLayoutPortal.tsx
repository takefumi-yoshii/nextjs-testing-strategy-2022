import { ReactNode } from "react";
import ReactDOM from "react-dom";

export const BasicLayoutPortal = ({ children }: { children: ReactNode }) => {
  const el = document.getElementById("portal-root");
  if (!el) throw Error("not found portal-root");
  return ReactDOM.createPortal(children, el);
};
