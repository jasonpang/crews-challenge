import styles from "./AppLayout.module.css";
import { Paper } from "@mantine/core";
import { ReactNode } from "react";
import { useActiveProject } from "../hooks/storeHelpers";
import { useStore } from "../store";

export interface AppLayoutProps {
  Title: ReactNode;
  ProjectSelector: ReactNode;
  ProjectDetails: ReactNode;
}

export default function AppLayout({
  Title,
  ProjectSelector,
  ProjectDetails,
}: AppLayoutProps) {
  const activeProjectId = useStore((store) => store.ui.activeProjectId);

  return (
    <Paper
      component="main"
      shadow="md"
      withBorder
      className={styles.appLayoutContainer}
    >
      <header className={styles.headerContainer}>
        {Title}
        {ProjectSelector}
      </header>
      {activeProjectId && (
        <section className={styles.projectDetailsContainer}>
          {ProjectDetails}
        </section>
      )}
    </Paper>
  );
}
