const api = {
  fetchProjects: async () => {
    const response = await fetch("api/projects");
    const data = await response.json();
    return data;
  },
  fetchTasks: async (projectId: string) => {
    const response = await fetch(`api/projects/${projectId}/tasks`);
    return await response.json();
  },
  fetchDependencies: async (projectId: string) => {
    const response = await fetch(`api/projects/${projectId}/dependencies`);
    return await response.json();
  },
};

export default api;
