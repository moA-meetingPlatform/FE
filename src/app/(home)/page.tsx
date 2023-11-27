import React from "react";
import SectionLargeSlider from "@/app/(home)/SectionLargeSlider";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionSliderNewAuthors from "@/components/SectionSliderNewAthors/SectionSliderNewAuthors";
import { MEETING_CATEGORIES } from "@/data/category";
import { DEMO_AUTHORS } from "@/data/authors";
import SectionGridCategoryBox from "@/components/SectionGridCategoryBox/SectionGridCategoryBox";
import BottomNav from "@/components/(navigation)/(bottom)/BottomNav";
import SiteHeader from "../SiteHeader";
import SectionMagazine from "@/components/Sections/SectionMagazine";
import Link from "next/link";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

interface Meeting {
  id: number;
  title: string;
  hostUserUuid?: string;
  hostNickname: string; // 호스트 닉네임 필드 추가
  meetingDatetime: string; // 미팅 날짜 필드 추가
  href: any;
  meetingHeaderImageUrl: string; // 피처드 이미지 필드 추가 (URL 형식)
  categories?: any; // 카테고리 필드 추가
}

interface MeetingListResponse {
  result: Meeting[];
  isSuccess: boolean;
  message: string;
}

interface MeetingIdList {
  meetingIdList: number[];
  count: number;
}


async function getMeetingData() {
  const responseOne = await fetch(`https://moamoa-backend.duckdns.org/api/v1/category/meeting`);
  const dataOne = await responseOne.json() as MeetingIdList;

  const res = await fetch('https://moamoa-backend.duckdns.org/api/v1/meeting/list', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids: dataOne.meetingIdList })
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}


async function getRecommendMeetingData() {

  const session = await getServerSession(options)
  
  const data1 = await fetch(`http://35.219.133.202/api/v1/recommendation`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_uuid: session?.user.userUuid })
    });
  const data2 = await data1.json() as MeetingListResponse;

  const data3 = await fetch('https://moamoa-backend.duckdns.org/api/v1/meeting/list', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids: data2.result })
  });

  if (!data3.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return data3.json()
}


export default async function PageHome() {

  const session = await getServerSession(options)

  console.log(session?.user.userUuid)

  const meetingdata = await getMeetingData() as MeetingListResponse
  const recommendmeetingdata = await getRecommendMeetingData() as MeetingListResponse

  


  const mappedMeetings = meetingdata.result.map(meeting => ({
    id: meeting.id,
    title: meeting.title,
    author: meeting.hostNickname,
    date: new Date(meeting.meetingDatetime).toLocaleDateString("ko-KR"),
    href: `/meeting/detail/${meeting.id}`,
    featuredImage: "https://moa-meetingplatform-images.s3.ap-northeast-2.amazonaws.com/moa.png",
  }));

  const mappedRecommendMeetings = recommendmeetingdata.result.map(meeting => ({
    id: meeting.id,
    title: meeting.title,
    author: meeting.hostNickname,
    date: new Date(meeting.meetingDatetime).toLocaleDateString("ko-KR"),
    href: `/meeting/detail/${meeting.id}`,
    featuredImage: "https://moa-meetingplatform-images.s3.ap-northeast-2.amazonaws.com/moa.png",
  }));


  return (
    <div className="nc-PageHome relative">
      <SiteHeader />
      <div className="container relative">
        <SectionLargeSlider
          heading="추천 모임"
          className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20"
          posts={mappedRecommendMeetings?.filter((_, i) => i < 3)}
        />
        <div className="relative py-16">
          <BackgroundSection />
          <SectionGridCategoryBox
            headingCenter={true}
            categoryCardType="card2"
            className="pb-16 lg:pb-28"
            categories={MEETING_CATEGORIES.filter((_, i) => i < 10)}
          />
          <Link href={'/meeting/category/0/0'}>
            <ButtonPrimary>Show me more</ButtonPrimary>
          </Link>
        </div>
        {/* <SectionGridAuthorBox
          className="py-16 lg:py-28"
          authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
        /> */}
        <div className="relative py-16">
          {/* <BackgroundSection /> */}
          <SectionSliderNewAuthors
            heading="인기 호스트"
            subHeading=""
            authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
          />
        </div>
        <div className="relative py-16">
          <BackgroundSection />
          <SectionMagazine className="py-16 lg:py-28" posts={mappedMeetings} />
        </div>
      </div>
      <BottomNav />
    </div>
  );
};


