'use client'

import React from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { Progress } from "@nextui-org/progress";
import Sequence1 from "./Sequence1.jsx";
import CreateMeetingBottomNav from "@/components/layout/(navigation)/(bottom)/CreateMeetingBottomNav";

export default function CreateMeeting() {
  let tabs = [
    {
      id: "photos",
      label: "Photos",
      content: <Sequence1 />
    },
    {
      id: "music",
      label: "Music",
      content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      id: "videos",
      label: "Videos",
      content: <Sequence1 />
    }
  ];

  return (
    <>
      <Progress size="sm" aria-label="Loading..." value={60} className="max-w-md" />
      <div className="flex w-full flex-col">
        <Tabs key={"sm"} size={"sm"} variant={"underlined"} aria-label="Dynamic tabs" items={tabs}>
          {(item) => (
            <Tab key={item.id} title={item.label}>
              <Card>
                <CardBody>
                  {item.content}
                </CardBody>
              </Card>
            </Tab>
          )}
        </Tabs>
      </div>
      <CreateMeetingBottomNav />
    </>
  );
}
