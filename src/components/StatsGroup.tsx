import { Text } from "@mantine/core";
import classes from "./StatsGroup.module.css";

/*
  This component was copied from: https://github.com/mantinedev/ui.mantine.dev/blob/master/lib/StatsGroup/StatsGroup.tsx

  I added the StatsGroupEntry / StatsGroupProps type and modified the component props to accept them.
*/

export type StatsGroupEntry = {
  stats: string;
  title: string;
  description: string;
};

export type StatsGroupProps = {
  data: StatsGroupEntry[];
};

export function StatsGroup({ data }: StatsGroupProps) {
  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </div>
  ));
  return <div className={classes.root}>{stats}</div>;
}
