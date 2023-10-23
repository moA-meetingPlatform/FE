'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'
import {
  Listbox,
  ListboxSection,
  ListboxItem
} from "@nextui-org/listbox";
import { ListboxWrapper } from "./../../../ui/ListboxWrapper.jsx"


export default function Sequence1(props) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const router = useRouter();
  const searchParams = useSearchParams()

  const [inputValue, setInputValue] = useState(searchParams.get('data') || '');
  const [inputValue2, setInputValue2] = useState(searchParams.get('data2') || '');
  const { url, setUrl, updateQueryParams } = props;

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handleNext = () => {
    const baseURL = 'http://localhost:3000'; // Adjust as needed

    const updatedUrl = updateQueryParams(baseURL, url, {
      data: inputValue,
      data2: inputValue2,
    });
    setUrl(updatedUrl);
    router.push(updatedUrl);
  };

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
          <ListboxItem key="ready2">준비중</ListboxItem>
        </Listbox>
      </ListboxWrapper>
      <p className="text-small text-default-500">Selected value: {selectedValue}</p>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <input
        type="text"
        value={inputValue2}
        onChange={(e) => setInputValue2(e.target.value)}
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
