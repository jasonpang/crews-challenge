import { Box, Divider, Paper, Title } from "@mantine/core";
import styles from "./App.module.css";
import ProjectSelector from "./ProjectSelector";
import { StatsGroup } from "./StatsGroup";
import ProjectDetails from "./ProjectDetails";
import { useEffect } from "react";
import { updateStore } from "../store";

function App() {
  useEffect(() => {
    async function loadData() {
      const response = await fetch("api/projects");
      const data = await response.json();
      updateStore((store) => (store.data.projects = data));
    }

    loadData();
  }, []);

  return (
    <Paper
      component="main"
      shadow="md"
      withBorder
      className={styles.mainContainer}
    >
      <header className={styles.headerContainer}>
        <Title order={3}>Crews by Core Challenge</Title>
        <ProjectSelector />
      </header>
      <section className={styles.projectDetailsContainer}>
        <ProjectDetails />
      </section>
    </Paper>
  );
}

export default App;
