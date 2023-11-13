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
    staleTime: Infinity,
  });

export const useProjectTasksQuery = ({ projectId }: { projectId: string }) =>
  useQuery<TaskInfo[]>({
    queryKey: ["projects", projectId, "tasks"],
    staleTime: Infinity,
  });

export const useProjectDependenciesQuery = ({
  projectId,
}: {
  projectId: string;
}) =>
  useQuery<DependencyInfo[]>({
    queryKey: ["projects", projectId, "dependencies"],
    staleTime: Infinity,
  });

export const useProjectStatisticsQuery = ({
  projectId,
}: {
  projectId: string;
}) =>
  useQuery<ProjectStatistics>({
    queryKey: ["projects", projectId, "statistics"],
    staleTime: Infinity,
  });
