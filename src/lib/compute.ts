import rawTasksData from "../data/tasks";
import rawDependenciesData from "../data/dependencies";
import {
  DependenciesData,
  DependencyInfo,
  TaskInfo,
  TasksData,
} from "../types";

function calculateRootTasks(tasks: TaskInfo[], dependencies: DependencyInfo[]) {
  const allSuccessorIds = new Set(dependencies.map((x) => x.successor_id));
  const rootTasks = tasks.filter((task) => !allSuccessorIds.has(task.id));
  return rootTasks;
}

function createDependenciesLookupTable(dependencies: DependencyInfo[]) {
  const table: Record<string, string[]> = {};
  for (const { predecessor_id, successor_id } of dependencies) {
    if (!table[predecessor_id]) {
      table[predecessor_id] = [];
    }
    table[predecessor_id].push(successor_id);
  }
  return table;
}

function calculateLongestDependencyChain(
  rootTasks: TaskInfo[],
  dependenciesLookupTable: Record<string, string[]>
) {
  let largestDepth = 0;

  function followDependencyChainForTask(
    rootTaskId: string,
    currentTaskId: string,
    depth: number,
    nodesVisited: string[],
    onLeafNodeReached: Function
  ) {
    const nextTaskIds = dependenciesLookupTable[currentTaskId];

    if (!nextTaskIds) {
      onLeafNodeReached(depth, [...nodesVisited, currentTaskId]);
    } else {
      for (const nextTaskId of nextTaskIds) {
        followDependencyChainForTask(
          rootTaskId,
          nextTaskId,
          depth + 1,
          [...nodesVisited, currentTaskId],
          onLeafNodeReached
        );
      }
    }
  }

  for (const rootTask of rootTasks) {
    let largestDepthForThisRootTask = 0;

    followDependencyChainForTask(
      rootTask.id,
      rootTask.id,
      0,
      [],
      (depth: number, nodesVisited: string[]) => {
        largestDepthForThisRootTask = Math.max(
          largestDepthForThisRootTask,
          depth
        );
        largestDepth = Math.max(largestDepth, depth);
        if (depth < largestDepthForThisRootTask) {
          /*
            The path to reach this leaf node is shorter than another recorded path from the same root node (everything in this closure is for the same root node)
            This means we know that any future traversal incorporating even just one of these nodes, is doomed to go down a less-than-best-known path.
            This means we can significantly optimize the graph traversal to prune out any edges (i.e. remove edges from the dependencies lookup table) that result from traversing a less-than-best-known leaf path.
            When implementing this challenge, this optimization makes the difference between freezing for 7-8 seconds for loading the Medium Graph vs. loading instantly (the Challenge Graph froze forever).
           */
          for (const nodeId of nodesVisited) {
            delete dependenciesLookupTable[nodeId];
          }
        }
      }
    );
  }

  return largestDepth;
}

export function getComputedProjectStatistics({
  projectId,
}: {
  projectId: string;
}) {
  const tasks: TaskInfo[] = (rawTasksData as TasksData)[projectId];
  const dependencies: DependencyInfo[] = (
    rawDependenciesData as DependenciesData
  )[projectId];

  if (!tasks || !dependencies) {
    return { error: "Invalid project" };
  }

  const rootTasks = calculateRootTasks(tasks, dependencies);
  const dependenciesLookupTable = createDependenciesLookupTable(dependencies);
  const longestDependenciesChainCount = calculateLongestDependencyChain(
    rootTasks,
    dependenciesLookupTable
  );

  return {
    allTasksCount: tasks.length,
    dependenciesCount: dependencies.length,
    rootTasksCount: rootTasks.length,
    longestDependenciesChainCount,
  };
}
