import { createContext, ReactNode, useContext } from "react";
import { BasicLayoutPortal } from "./BasicLayoutPortal";
import { usePortal } from "./usePortal";

const ProtalDispatchContext = createContext<{
  showPortal: (renderNode: () => ReactNode) => void;
  hidePortal: () => void;
}>({
  showPortal: () => null,
  hidePortal: () => {},
});
const ProtalStateContext = createContext({} as ReactNode);

export function usePortalDispatch() {
  return useContext(ProtalDispatchContext);
}

export const PortalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { showPortal, hidePortal, isShowPortal, renderNode } = usePortal();
  return (
    <ProtalDispatchContext.Provider value={{ showPortal, hidePortal }}>
      <ProtalStateContext.Provider value={isShowPortal}>
        {children}
        {isShowPortal && <BasicLayoutPortal>{renderNode()}</BasicLayoutPortal>}
        <div id="portal-root" />
      </ProtalStateContext.Provider>
    </ProtalDispatchContext.Provider>
  );
};
