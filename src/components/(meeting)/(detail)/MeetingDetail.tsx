

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SingleHeader from "@/app/(singles)/SingleHeader";
import SingleContent from "@/app/(singles)/SingleContent";
import { Sidebar } from "@/app/(singles)/Sidebar";
import SingleRelatedPosts from "@/app/(singles)/SingleRelatedPosts";
import MeetingDetailHeader from "@/components/(navigation)/(top)/MeetingDetailHeader";
import ButtonPrimary from "@/components/Button/ButtonPrimary";

import { getServerSession } from 'next-auth'
import { options } from "@/app/api/auth/[...nextauth]/options";

import NcModal from "@/components/NcModal/NcModal";

interface MeetingDetailProps {
  id: any;
}

async function getData(id: any) {
  const res = await fetch(`https://moa-backend.duckdns.org/api/v1/meeting/${id}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }

  return res.json()
}

async function participateMeeting(id: any) {

  const session = await getServerSession(options)

  const res = await fetch(`https://moa-backend.duckdns.org/api/v1/meeting-feature/participant`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        meetingId: id,
        userUuid: session?.user.userUuid,
        meetingParticipationAnswer: "YES"
      })
    })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
const MeetingDetail: React.FC<MeetingDetailProps> = async ({ id }) => {



  const data = await getData(id)

  console.log()


  return (
    <>
      <MeetingDetailHeader />
      <div className={`relative`}>
        <header className="relative pt-16 z-10 md:py-20 lg:py-28 bg-neutral-900 dark:bg-black">
          {/* SINGLE HEADER */}
          <div className="dark container relative z-10">
            <div className="max-w-screen-md">
              <SingleHeader hiddenDesc title={data.result.title} />
            </div>
          </div>

          {/* FEATURED IMAGE */}
          <div className="mt-8 md:mt-0 md:absolute md:top-0 md:end-0 md:bottom-0 md:w-1/2 lg:w-2/5 2xl:w-1/3">
            <div className="hidden md:block absolute top-0 start-0 bottom-0 w-1/5 from-neutral-900 dark:from-black bg-gradient-to-r rtl:bg-gradient-to-l"></div>
            {/* <Image
              className="block w-full h-full object-cover"
              src={"https://moa-meetingplatform-images.s3.ap-northeast-2.amazonaws.com/moa.png"}
              alt=""
              width={1635}
              height={774}
              sizes="(max-width: 1024px) 100vw, 1240px"
            /> */}
          </div>
        </header>

        <div className="container flex flex-col my-10 lg:flex-row ">
          <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-20">
            {/* <SingleContent /> */}
            <div dangerouslySetInnerHTML={{ __html: data.result.description }} />
          </div>
          <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:ps-10 xl:ps-0 xl:w-1/3">
            <Sidebar />
          </div>
          <ButtonPrimary className="dark:bg-primary-700 w-full" id={id}>
              모임 참가
          </ButtonPrimary>
        </div>

        {/* RELATED POSTS */}
        {/* <SingleRelatedPosts /> */}


      </div>
    </>
  );
};

export default MeetingDetail;
