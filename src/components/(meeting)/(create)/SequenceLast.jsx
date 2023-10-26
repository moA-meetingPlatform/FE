'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'
import {
  Listbox,
  ListboxSection,
  ListboxItem
} from "@nextui-org/listbox";
import { ListboxWrapper } from "./../../ui/ListboxWrapper"
import Heading from '@/components/Heading/Heading';



export default function SequenceLast(props) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const router = useRouter();
  const searchParams = useSearchParams()
  const [inputValue7, setInputValue7] = useState(searchParams.get('data7') || '');
  const [inputValue8, setInputValue8] = useState(searchParams.get('data8') || '');
  const { url, setUrl, updateQueryParams } = props;

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const [createData, setCreateData] = useState({
    data: '',
    data2: '',
    data3: '',
    data4: '',
    data5: '',
    data6: '',
    data7: '',
    data8: '',
  });


  const handleNext = () => {
    const baseURL = 'http://localhost:3000'; // Adjust as needed

    const updatedUrl = updateQueryParams(baseURL, url, {
      data7: inputValue7,
      data8: inputValue8,
    });
    setUrl(updatedUrl);
    router.push(updatedUrl);
  };


  const createMeeting = async () => {

    // 1. URL의 파라미터를 가져옵니다.
    let newCreateData = {};
    for (let [key, value] of searchParams.entries()) {
      newCreateData[key] = value;
    }

    // 2. createData의 상태를 업데이트합니다.
    setCreateData(newCreateData);


    try {
      const res = await fetch(`https://moa-backend.duckdns.org/api/v1/meeting?${queryString}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.data.user.token}`
        },
        body: JSON.stringify(
          {
            data: createData.data,
            data2: createData.data2,
            data3: createData.data3,
            data4: createData.data4,
            data5: createData.data5,
            data6: createData.data6,
            data7: createData.data7,
            data8: createData.data8,
          }
        ),
      });
      const data = await res.json();

      if (data.success === true) {

      }
      else {

      }
    }
    catch (e) {
      console.error("Error sending request:", e);
    }

  }

  return (
    <>
      <Heading desc={"모임을 선택하세요"}>어떤 모임을 하고싶나요?</Heading>
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
          value={inputValue7}
          onChange={(e) => setInputValue7(e.target.value)}
        />
        <input
          type="text"
          value={inputValue8}
          onChange={(e) => setInputValue8(e.target.value)}
        />
        <button onClick={handleNext}>Next</button>
        <button onClick={createMeeting}>fetch</button>
      </div>
    </>
  );
}
