import { ReactNode, useCallback, useEffect, useReducer } from "react";

type State = {
  isShowPortal: boolean;
  renderNode: () => ReactNode;
};

const initialState: State = {
  isShowPortal: false,
  renderNode: () => null,
};

function reducer(
  state: State,
  action: { type: "SHOW"; payload: State }
): State {
  return { ...state, ...action.payload };
}

export const usePortal = (duration = 4000) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const showPortal = useCallback((renderNode: () => ReactNode) => {
    dispatch({
      type: "SHOW",
      payload: { renderNode, isShowPortal: true },
    });
  }, []);
  const hidePortal = useCallback(() => {
    dispatch({
      type: "SHOW",
      payload: { renderNode: () => null, isShowPortal: false },
    });
  }, []);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (state.isShowPortal) {
        hidePortal();
      }
    }, duration);
    return () => {
      window.clearTimeout(timer);
    };
  }, [duration, state.isShowPortal, hidePortal]);
  return { showPortal, hidePortal, ...state } as const;
};
