import { create as createZustandStore } from "zustand";
import { create as produce, Draft } from "mutative";
import { DependenciesData, Id, ProjectsData, TasksData } from "./types";

interface AppState {
  ui: {
    activeProjectId?: Id;
  };
  data: {
    projects: ProjectsData;
    tasks: TasksData;
    dependencies: DependenciesData;
  };
}

export const useStore = createZustandStore<AppState>(() => ({
  ui: {
    activeProjectId: undefined,
  },
  data: {
    projects: [],
    tasks: {},
    dependencies: {},
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
