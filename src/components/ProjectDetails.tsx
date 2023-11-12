import { useState } from "react";
import styles from "./ProjectSelector.module.css";
import {
  Combobox,
  InputBase,
  Input,
  Loader,
  useCombobox,
  InputLabel,
} from "@mantine/core";
import { ProjectsData } from "../types";
import { StatsGroup } from "./StatsGroup";

export default function ProjectDetails() {
  const [value, setValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProjectsData>([]);

  return (
    <section className={styles.projectDetailsContainer}>
      <section>
        <StatsGroup
          data={[
            {
              title: "Page views",
              stats: "456,133",
              description:
                "24% more than in the same month last year, 33% more that two years ago",
            },
            {
              title: "New users",
              stats: "2,175",
              description:
                "13% less compared to last month, new user engagement up by 6%",
            },
            {
              title: "Completed orders",
              stats: "1,994",
              description:
                "1994 orders were completed this month, 97% satisfaction rate",
            },
          ]}
        />
      </section>
    </section>
  );
}
