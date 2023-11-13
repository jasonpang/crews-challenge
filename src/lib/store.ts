import { create as createZustandStore } from "zustand";
import { create as produce, Draft } from "mutative";
import { Id } from "../types";

interface AppState {
  ui: {
    activeProjectId?: Id;
  };
}

export const useStore = createZustandStore<AppState>(() => ({
  ui: {
    activeProjectId: undefined,
  },
}));

export const updateStore = (fn: (draft: Draft<AppState>) => void) => {
  useStore.setState((state) => {
    const [nextState, patches] = produce(
      state,
      (draft) => {
        fn(draft);
      },
      {
        enablePatches: true,
        strict: true,
      }
    );

    return nextState;
  });
};
