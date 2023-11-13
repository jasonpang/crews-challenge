import styles from "./ProjectSelector.module.css";
import { useCallback, useMemo, useState } from "react";
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
import { useProjectsQuery } from "../hooks/useQueries";
import { useActiveProject } from "../hooks/storeHelpers";

export default function ProjectSelector() {
  const { data: projects, isFetched } = useProjectsQuery();
  const activeProjectId = useStore((store) => store.ui.activeProjectId);
  const activeProject = useMemo(
    () => projects?.find((project) => project.id === activeProjectId),
    [activeProjectId, projects]
  );

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => {
      if (!isFetched) {
        return;
      }
    },
  });

  const comboboxOptionsRender = useMemo(
    () =>
      projects?.map((item) => (
        <Combobox.Option value={item.id} key={item.id}>
          {item.name}
        </Combobox.Option>
      )),
    [projects]
  );

  const onProjectSelected = useCallback(
    (projectId: string) => {
      updateStore((store) => (store.ui.activeProjectId = projectId));
      combobox.closeDropdown();
    },
    [combobox]
  );

  return (
    <div className={styles.projectSelectorContainer}>
      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={onProjectSelected}
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            pointer
            rightSection={
              !isFetched ? <Loader size={18} /> : <Combobox.Chevron />
            }
            onClick={() => combobox.toggleDropdown()}
            rightSectionPointerEvents="none"
            styles={{
              root: { width: "100%" },
            }}
          >
            {activeProject?.name || (
              <Input.Placeholder>
                {!isFetched ? "Loading projects..." : "Select a project"}
              </Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>

        {isFetched && (
          <Combobox.Dropdown>
            <Combobox.Options>{comboboxOptionsRender}</Combobox.Options>
          </Combobox.Dropdown>
        )}
      </Combobox>
    </div>
  );
}
