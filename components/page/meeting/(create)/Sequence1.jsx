

import React from 'react'
import {
  Listbox,
  ListboxSection,
  ListboxItem
} from "@nextui-org/listbox";
import { ListboxWrapper } from "./../../../ui/ListboxWrapper.jsx"

export default function Sequence1() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  return (
    <div className="flex flex-col gap-2">
      <ListboxWrapper>
        <Listbox
          aria-label="Single selection example"
          variant="bordered"

          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}

        >
          <ListboxItem key="text">원 샷</ListboxItem>
          <ListboxItem key="ready1">준비중</ListboxItem>
          <ListboxItem key="ready2">준비중</ListboxItem>
        </Listbox>
      </ListboxWrapper>
      <p className="text-small text-default-500">Selected value: {selectedValue}</p>
    </div>
  );
}
