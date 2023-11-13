import { useMemo } from "react";
import { useStore } from "../lib/store";
import {
  useProjectDependenciesQuery,
  useProjectStatisticsQuery,
  useProjectTasksQuery,
  useProjectsQuery,
} from "./useQueries";

export function useActiveProject() {
  const { data: projects, isFetched: areProjectsFetched } = useProjectsQuery();

  const activeProjectId = useStore((store) => store.ui.activeProjectId);
  const activeProject = useMemo(
    () => projects?.find((project) => project.id === activeProjectId),
    [activeProjectId, projects]
  );

  const { data: tasks, isFetched: areTasksFetched } = useProjectTasksQuery({
    projectId: activeProjectId!,
  });
  const { data: dependencies, isFetched: areDependenciesFetched } =
    useProjectDependenciesQuery({
      projectId: activeProjectId!,
    });
  const { data: statistics, isFetched: areStatisticsFetched } =
    useProjectStatisticsQuery({
      projectId: activeProjectId!,
    });

  return {
    project: activeProject,
    tasks,
    dependencies,
    statistics,
    isFetched:
      areProjectsFetched &&
      areTasksFetched &&
      areDependenciesFetched &&
      areStatisticsFetched,
  };
}
