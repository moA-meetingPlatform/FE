'use client'

import React, { useState, useEffect, useRef } from 'react'
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'
import {
  Listbox,
  ListboxSection,
  ListboxItem
} from "@nextui-org/listbox";
import { ListboxWrapper } from "./../../ui/ListboxWrapper"
import Heading from '@/components/Heading/Heading';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';


export default function Sequence1(props) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const router = useRouter();
  const searchParams = useSearchParams()

  const [inputValue, setInputValue] = useState(searchParams.get('data') || '');
  const [inputValue2, setInputValue2] = useState(searchParams.get('data2') || '');
  const { url, setUrl, updateQueryParams, active, setActive } = props;

  // const ref = React.useRef<HTMLDivElement>(null);
  const ref = useRef()
  const maxTabs = 10;

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handleSave = () => {
    const baseURL = 'http://localhost:3000'; // Adjust as needed

    const updatedUrl = updateQueryParams(baseURL, url, {
      data: inputValue,
      data2: inputValue2,
    });
    setUrl(updatedUrl);
    router.push(updatedUrl);
  };

  const handlePrevious = () => {
    if (active > 1) {
      setActive(active - 1);
    }
  };

  const handleNext = () => {
    if (active < maxTabs) {
      setActive(active + 1);
    }
  };

  return (
    <>
      {/*       <Heading desc={"모임을 선택하세요"} isCenter={false}>어떤 모임을 하고싶나요?</Heading> */}

      <div className='tracking-tighter mb-8'>
        <p className='text-lg font-semibold text-center'>어떤 모임을 하고싶나요?</p>
        <p className="text-xs text-center text-gray-500">모임을 선택하세요</p>
      </div>
      <div className="flex flex-col gap-2 mx-auto">
        <ListboxWrapper>
          <Listbox
            aria-label="Single selection example"
            variant="bordered"
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
            <ListboxItem key="meeting">단기 모임</ListboxItem>
            <ListboxItem key="ready" color='danger'>준비중</ListboxItem>
          </Listbox>
        </ListboxWrapper>
      </div>
      {/* <button onClick={handleNext}>Next</button> */}
      <Box sx={{ pb: 7 }} ref={ref}>
        <CssBaseline />
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation showLabels>
            <BottomNavigationAction key="empty0" label="" />
            <BottomNavigationAction key="empty1" label="" />
            <BottomNavigationAction key="empty2" label="" />
            <BottomNavigationAction key="empty3" label="" />
            <BottomNavigationAction key="next" label="다음" icon={<ArchiveIcon />} onClick={handleNext} />
          </BottomNavigation>
        </Paper>
      </Box>
    </>
  );
}
