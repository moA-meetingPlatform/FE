'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'
import Heading from '@/components/Heading/Heading';


export default function Sequence4(props) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const router = useRouter();
  const searchParams = useSearchParams()

  const [inputDescription, setInputDescription] = useState(searchParams.get('Description') || '');
  const { url, setUrl, updateQueryParams } = props;

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handleNext = () => {
    const baseURL = 'http://localhost:3000'; // Adjust as needed

    const updatedUrl = updateQueryParams(baseURL, url, {
      Description: inputDescription,
    });
    setUrl(updatedUrl);
    router.push(updatedUrl);
  };

  return (
    <>
      <Heading desc={""}>모임을 소개해주세요</Heading>
      <div className="flex flex-col gap-2">
        <p className="text-small text-default-500">Selected value: {selectedValue}</p>
        <input
          type="text"
          value={inputDescription}
          onChange={(e) => setInputDescription(e.target.value)}
        />
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
}
