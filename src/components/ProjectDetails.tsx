import styles from "./ProjectDetails.module.css";
import { Loader, Text, Flex } from "@mantine/core";
import { StatsGroup } from "./StatsGroup";
import { useActiveProject } from "../hooks/storeHelpers";
import { GraphCanvas } from "reagraph";
import { useMemo } from "react";

export default function ProjectDetails() {
  const { tasks, dependencies, statistics, isFetched } = useActiveProject();

  const graphNodes = useMemo(() => {
    return tasks?.map((task) => ({ id: task.id, label: task.name }));
  }, [tasks]);

  const graphEdges = useMemo(() => {
    return dependencies?.map((dep, idx) => ({
      id: idx.toString(),
      label: `${dep.depend_type} (${dep.duration})`,
      source: dep.predecessor_id,
      target: dep.successor_id,
    }));
  }, [dependencies]);

  if (!isFetched) {
    return (
      <Flex style={{ alignItems: "baseline" }}>
        <Text>Loading tasks and dependencies &hellip;</Text>
        <Loader size={18} />
      </Flex>
    );
  }

  return (
    <section className={styles.projectDetailsContainer}>
      <StatsGroup
        data={[
          {
            title: "All Tasks Count",
            stats: statistics!.allTasksCount.toString(),
            description: "The total number of tasks in the project.",
          },
          {
            title: "Dependencies Count",
            stats: statistics!.dependenciesCount.toString(),
            description:
              "The total number of dependencies among all tasks in the project.",
          },
          {
            title: "Root Tasks Count",
            stats: statistics!.rootTasksCount.toString(),
            description:
              "The number of tasks in the project that have no preceding task.",
          },
          {
            title: "Longest Dependency Chain",
            stats: statistics!.longestDependenciesChainCount.toString(),
            description:
              "The number describing the longest chain of dependencies.",
          },
        ]}
      />
      <div style={{ position: "relative", width: "100%", height: "400px" }}>
        {/* reagraph will style itself as position: absolute with 100% width and height, so a relative parent container is required */}
        <GraphCanvas animated={false} nodes={graphNodes!} edges={graphEdges!} />
      </div>
    </section>
  );
}
