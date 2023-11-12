export type Id = string;
export type ProjectName = string;

export type ProjectInfo = { id: Id; name: string };

export type TaskInfo = {
  id: Id;
  name: string;
};

export type DependencyType = "finish_start" | "finish_finish" | "start_start";

export type DependencyInfo = {
  depend_type: DependencyType;
  predecessor_id: Id;
  duration: number;
  successor_id: Id;
};

export type ProjectsData = ProjectInfo[];
export type TasksData = Record<Id, TaskInfo[]>;
export type DependenciesData = Record<Id, DependencyInfo[]>;
