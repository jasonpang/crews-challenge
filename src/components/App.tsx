import { Box, Divider, Paper, Title } from "@mantine/core";
import styles from "./App.module.css";
import ProjectSelector from "./ProjectSelector";
import { StatsGroup } from "./StatsGroup";
import ProjectDetails from "./ProjectDetails";
import { useEffect } from "react";
import { updateStore } from "../store";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import AppLayout from "./AppLayout";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

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
      // staleTime: Infinity,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={createTheme({})}>
        <AppLayout
          Title={<Title order={3}>Crews by Core Challenge</Title>}
          ProjectSelector={<ProjectSelector />}
          ProjectDetails={<ProjectDetails />}
        />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
