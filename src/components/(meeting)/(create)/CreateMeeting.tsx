'use client'

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Progress } from "@nextui-org/react";
import Sequence1 from "./Sequence1.jsx";
import Sequence2 from "./Sequence2";
import Sequence3 from "./Sequence3.jsx";
import Sequence4 from "./Sequence4.jsx";
import Sequence5 from "./Sequence5.jsx";
import Sequence6 from "./Sequence6.jsx";
import Sequence7 from "./Sequence7.jsx";
import Sequence8 from "./Sequence8.jsx";
import Sequence9 from "./Sequence9.jsx";
import SequenceLast from "./SequenceLast.jsx";
import CreateMeetingBottomNav from "@/components/(navigation)/(bottom)/CreateMeetingBottomNav";
import LinearProgress from '@mui/material/LinearProgress';




export default function CreateMeeting() {
  const [active, setActive] = useState(1);
  const router = useRouter();
  const [url, setUrl] = useState(usePathname());

  function updateQueryParams(baseURL: string, url: string, params: Record<string, string>): string {
    // Add base URL if the provided URL is a relative path
    const fullURL = url.startsWith('/') ? baseURL + url : url;

    const urlObj = new URL(fullURL);
    for (const [key, value] of Object.entries(params)) {
      urlObj.searchParams.set(key, value);
    }
    return urlObj.pathname + urlObj.search;
  }




  let tabs = [
    {
      id: 1,
      label: "모임 선택",
      progress: 10,
      content: <Sequence1 url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} />
    },
    {
      id: 2,
      label: "카테고리 선택",
      progress: 20,
      content: <Sequence2 url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} />
    },
    {
      id: 3,
      label: "모임 제목",
      progress: 30,
      content: <Sequence3 url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} />
    },
    {
      id: 4,
      label: "모임 소개",
      progress: 40,
      content: <Sequence4 url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} />
    },
    {
      id: 5,
      label: "날짜",
      progress: 50,
      content: <Sequence5 url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} />
    },
    {
      id: 6,
      label: "장소",
      progress: 60,
      content: <Sequence6 url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} />
    },
    {
      id: 7,
      label: "모집 방법",
      progress: 70,
      content: <Sequence7 url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} />
    },
    {
      id: 8,
      label: "멤버 조건",
      progress: 80,
      content: <Sequence8 url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} />
    },
    {
      id: 9,
      label: "참가비",
      progress: 90,
      content: <Sequence9 url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} />
    },
    {
      id: 10,
      label: "요약 및 패칭",
      progress: 100,
      content: <SequenceLast url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} />
    },
  ];



  // useEffect(() => {
  //   console.log("active", active);
  //   console.log("url", url);
  // }, [active]);

  return (
    <>
      <LinearProgress variant="determinate" value={tabs.find(tab => tab.id === active)?.progress} />
      <Progress size="sm" aria-label="Loading..." value={tabs.find(tab => tab.id === active)?.progress} className="max-w-md" />
      <div className="flex w-full flex-col">

        <Card>
          <CardBody>
            {tabs.find(tab => tab.id === active)?.content}
          </CardBody>
        </Card>
      </div>
      <CreateMeetingBottomNav active={active} setActive={setActive} />
    </>
  );
}
