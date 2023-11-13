import { Title } from "@mantine/core";
import styles from "./App.module.css";
import ProjectSelector from "./ProjectSelector";
import ProjectDetails from "./ProjectDetails";
import { useStore } from "../lib/store";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // A default query function: https://tanstack.com/query/latest/docs/react/guides/default-query-function
      queryFn: async ({ queryKey }) => {
        const response = await fetch(`/api/${queryKey.join("/")}`);
        return await response.json();
      },
      /**
       * This prevents useQuery() usages across components from re-fetching data.
       * This challenge problem's data is unchanging, so we're asking useQuery() to never refetch.
       */
      staleTime: Infinity,
    },
  },
});

function App() {
  const activeProjectId = useStore((store) => store.ui.activeProjectId);

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={createTheme({})}>
        <main className={styles.appContainer}>
          <header className={styles.headerContainer}>
            <Title order={3}>Crews by Core Challenge</Title>
            <ProjectSelector />
          </header>
          {activeProjectId && (
            <section className={styles.projectDetailsContainer}>
              <ProjectDetails />
            </section>
          )}
        </main>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
