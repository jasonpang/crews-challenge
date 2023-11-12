import { Box, Divider, Paper, Title } from "@mantine/core";
import styles from "./App.module.css";
import ProjectSelector from "./ProjectSelector";
import { StatsGroup } from "./StatsGroup";
import ProjectDetails from "./ProjectDetails";

function App() {
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
