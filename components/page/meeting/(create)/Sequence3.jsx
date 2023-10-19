'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'
import {
  Listbox,
  ListboxSection,
  ListboxItem
} from "@nextui-org/listbox";
import { ListboxWrapper } from "./../../../ui/ListboxWrapper.jsx"


export default function Sequence3(props) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const router = useRouter();
  const searchParams = useSearchParams()

  const [inputValue5, setInputValue5] = useState(searchParams.get('data5') || '');
  const [inputValue6, setInputValue6] = useState(searchParams.get('data6') || '');
  const { url, setUrl, updateQueryParams } = props;

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handleNext = () => {
    const baseURL = 'http://localhost:3000'; // Adjust as needed

    const updatedUrl = updateQueryParams(baseURL, url, {
      data5: inputValue5,
      data6: inputValue6,
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
          <ListboxItem key="text">1111111111원 샷</ListboxItem>
          <ListboxItem key="ready1">준비중</ListboxItem>
          <ListboxItem key="ready2">준비중</ListboxItem>
        </Listbox>
      </ListboxWrapper>
      <p className="text-small text-default-500">Selected value: {selectedValue}</p>
      <input
        type="text"
        value={inputValue5}
        onChange={(e) => setInputValue5(e.target.value)}
      />
      <input
        type="text"
        value={inputValue6}
        onChange={(e) => setInputValue6(e.target.value)}
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
