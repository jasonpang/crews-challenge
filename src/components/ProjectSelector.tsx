import { useMemo, useState } from "react";
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
import { updateStore, useStore } from "../store";

export default function ProjectSelector() {
  const activeProjectId = useStore((store) => store.ui.activeProjectId);
  const projects = useStore((store) => store.data.projects);
  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId),
    [activeProjectId, projects]
  );
  const isLoadingData = useMemo(() => !projects.length, [projects]);
  console.log("projects:", projects);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => {
      if (isLoadingData) {
        return;
      }
    },
  });

  const options = projects.map((item) => (
    <Combobox.Option value={item.id} key={item.id}>
      {item.name}
    </Combobox.Option>
  ));

  return (
    <section className={styles.projectSelectorContainer}>
      {/* <InputLabel>Project:</InputLabel> */}
      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(projectId) => {
          updateStore((store) => (store.ui.activeProjectId = projectId));
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            pointer
            rightSection={
              isLoadingData ? <Loader size={18} /> : <Combobox.Chevron />
            }
            onClick={() => combobox.toggleDropdown()}
            rightSectionPointerEvents="none"
            styles={{
              root: { width: "100%" },
            }}
          >
            {activeProject?.name || (
              <Input.Placeholder>
                {isLoadingData ? "Loading projects..." : "Select a project"}
              </Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {isLoadingData ? (
              <Combobox.Empty>Loading projects....</Combobox.Empty>
            ) : (
              options
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </section>
  );
}
