export function useProjectsData() {
  async function loadData() {
    const response = await fetch("api/projects");
    const data = await response.json();
    updateStore((store) => (store.data.projects = data));
  }
}
