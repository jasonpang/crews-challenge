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
      <div className={classes.count}>{stat.stats}</div>
      <div className={classes.title}>{stat.title}</div>
      <div className={classes.description}>{stat.description}</div>
    </div>
  ));
  return <div className={classes.root}>{stats}</div>;
}
