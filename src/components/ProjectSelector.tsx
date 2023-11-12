import { useState } from "react";
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

export default function ProjectSelector() {
  const [value, setValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProjectsData>([]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => {
      if (data.length !== 0 || loading) {
        return;
      }

      async function loadDataAsync() {
        setLoading(true);
        const response = await fetch("api/projects");
        const data = await response.json();
        setData(data);
        setLoading(false);
        combobox.resetSelectedOption();
      }

      loadDataAsync();
    },
  });

  const options = data.map((item) => (
    <Combobox.Option value={item.name} key={item.id}>
      {item.name}
    </Combobox.Option>
  ));

  return (
    <section className={styles.projectSelectorContainer}>
      {/* <InputLabel>Project:</InputLabel> */}
      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
          setValue(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            pointer
            rightSection={loading ? <Loader size={18} /> : <Combobox.Chevron />}
            onClick={() => combobox.toggleDropdown()}
            rightSectionPointerEvents="none"
            styles={{
              root: { width: "100%" },
            }}
          >
            {value || <Input.Placeholder>Select a project</Input.Placeholder>}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {loading ? (
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
