import { useQuery } from "@tanstack/react-query";
import {
  DependencyInfo,
  ProjectsData,
  ProjectStatistics,
  TaskInfo,
} from "../types";

export const useProjectsQuery = () =>
  useQuery<ProjectsData>({
    queryKey: ["projects"],
  });

export const useProjectTasksQuery = ({ projectId }: { projectId: string }) =>
  useQuery<TaskInfo[]>({
    queryKey: ["projects", projectId, "tasks"],
  });

export const useProjectDependenciesQuery = ({
  projectId,
}: {
  projectId: string;
}) =>
  useQuery<DependencyInfo[]>({
    queryKey: ["projects", projectId, "dependencies"],
  });

export const useProjectStatisticsQuery = ({
  projectId,
}: {
  projectId: string;
}) =>
  useQuery<ProjectStatistics>({
    queryKey: ["projects", projectId, "statistics"],
  });
