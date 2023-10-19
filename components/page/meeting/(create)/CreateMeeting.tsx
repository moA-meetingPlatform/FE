'use client'

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Progress } from "@nextui-org/progress";
import Sequence1 from "./Sequence1.jsx";
import Sequence2 from "./Sequence2.jsx";
import Sequence3 from "./Sequence3.jsx";
import Sequence4 from "./Sequence4.jsx";
import CreateMeetingBottomNav from "@/components/layout/(navigation)/(bottom)/CreateMeetingBottomNav";



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
      label: "first",
      progress: 30,
      content: <Sequence1 url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} />
    },
    {
      id: 2,
      label: "second",
      progress: 60,
      content: <Sequence2 url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} />
    },
    {
      id: 3,
      label: "third",
      progress: 90,
      content: <Sequence3 url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} />
    },
    {
      id: 4,
      label: "fourth",
      progress: 100,
      content: <Sequence4 url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} />
    },
  ];



  useEffect(() => {
    console.log("active", active);
    console.log("url", url);
  }, [active]);

  return (
    <>
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
