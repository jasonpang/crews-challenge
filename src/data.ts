import { Response, Server } from "miragejs";

import projects from "./data/projects";
import tasks from "./data/tasks";
import dependenciesData from "./data/dependencies";
import { DependenciesData, TasksData } from "./types";

new Server({
  routes() {
    this.namespace = "api";

    this.get(
      "/projects/",
      () => {
        return projects;
      },
      { timing: 1000 }
    );

    this.get(
      "/projects/:projectid/tasks/",
      (_, { params }) => {
        return (
          (tasks as TasksData)[params.projectid].map((t) => {
            return { ...t };
          }) || []
        );
      },
      { timing: 2000 }
    );

    this.get(
      "/projects/:projectid/dependencies",
      (schema, { params }) => {
        const dependenciesDataEntry = (dependenciesData as DependenciesData)[
          params.projectid
        ];

        if (!dependenciesDataEntry) {
          return new Response(404, {}, { errors: ["Project not found"] });
        }

        return dependenciesDataEntry;
      },
      { timing: 2000 }
    );
  },
});
