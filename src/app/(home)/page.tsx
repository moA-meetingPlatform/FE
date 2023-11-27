import React from "react";
import SectionLargeSlider from "@/app/(home)/SectionLargeSlider";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionSliderNewAuthors from "@/components/SectionSliderNewAthors/SectionSliderNewAuthors";
import {
  DEMO_POSTS,
  DEMO_POSTS_AUDIO,
  DEMO_POSTS_GALLERY,
  DEMO_POSTS_VIDEO,
} from "@/data/posts";
import { MEETING_CATEGORIES } from "@/data/category";
import { DEMO_AUTHORS } from "@/data/authors";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSliderPosts from "@/components/Sections/SectionSliderPosts";
import SectionMagazine1 from "@/components/Sections/SectionMagazine1";
import SectionAds from "@/components/Sections/SectionAds";
import SectionMagazine7 from "@/components/Sections/SectionMagazine7";
import SectionGridPosts from "@/components/Sections/SectionGridPosts";
import SectionMagazine8 from "@/components/Sections/SectionMagazine8";
import SectionMagazine9 from "@/components/Sections/SectionMagazine9";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionBecomeAnAuthor from "@/components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2";
import SectionVideos from "@/components/Sections/SectionVideos";
import SectionLatestPosts from "@/components/Sections/SectionLatestPosts";
import SectionMagazine2 from "@/components/Sections/SectionMagazine2";
import SectionGridCategoryBox from "@/components/SectionGridCategoryBox/SectionGridCategoryBox";
import BottomNav from "@/components/(navigation)/(bottom)/BottomNav";
import Header from "@/components/(navigation)/(top)/Header";
import SiteHeader from "../SiteHeader";
import SectionMagazine from "@/components/Sections/SectionMagazine";
import CreateBtn from "@/components/Button/CreateBtn";
import Link from "next/link";
import ButtonPrimary from "@/components/Button/ButtonPrimary";

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


//
const MAGAZINE1_POSTS = DEMO_POSTS.filter((_, i) => i >= 8 && i < 16);
const MAGAZINE2_POSTS = DEMO_POSTS.filter((_, i) => i >= 0 && i < 7);
//

async function getMeetingData() {
  const res = await fetch('https://moamoa-backend.duckdns.org/api/v1/meeting/list', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ids: [
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
        54,
        55,
        56,
        57,
        58,
        59,
        60,
        61,
        62,
        63,
        64,
        65,
        66,
        67,
        68,
        69,
        70,
        71,
        72,
        73,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        82,
        83,
        84,
        85,
        86,
        87,
        88,
        89,
        90,
        91,
        92,
        93,
        94,
        95,
        96,
        97,
        98,
        99,
        100,
        101,
        102,
        103,
        104,
        105,
        106,
        107,
        108,
        109,
        110,
        111,
        112,
        113,
        114,
        115,
        116,
        117,
        118,
        119,
        120,
        121,
        122,
        123,
        124,
        125,
        126,
        127,
        128,
        129,
        130,
        131,
        132,
        133,
        134,
        135,
        136,
        137,
        138,
        139,
        149,
        150,
        151,
        152,
        153,
        154,
        155,
        156,
        157,
        158,
        159,
        160,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        174,
        175,
        176,
        177,
        178,
        179,
        180,
        181,
        182,
        183,
        184,
        185,
        186,
        187,
        188,
        189,
        190,
        191,
        192,
        193,
        194,
        195,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        210,
        211,
        212,
        213,
        214,
        215,
        216,
        217,
        218,
        219,
        220,
        221,
        222,
        223,
        224,
        225,
        226,
        227,
        228,
        694
      ]
    })
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }



  return res.json()
}


export default async function PageHome() {
  const data = await getMeetingData() as MeetingListResponse


  const mappedMeetings = data.result.map(meeting => ({
    id: meeting.id,
    title: meeting.title,
    author: meeting.hostNickname,
    date: new Date(meeting.meetingDatetime).toLocaleDateString("ko-KR"),
    href: `/meeting/detail/${meeting.id}`,
    featuredImage: "https://moa-meetingplatform-images.s3.ap-northeast-2.amazonaws.com/moa.png",
  }));

  // console.log(mappedMeetings)

  return (
    <div className="nc-PageHome relative">
      <SiteHeader />

      <div className="container relative">
        <SectionLargeSlider

          heading="추천 모임"
          className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20"
          posts={mappedMeetings?.filter((_, i) => i < 3)}
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

        {/* <SectionSliderNewCategories
          className="py-16 lg:py-28"
          heading="Top trending topics"
          subHeading="Discover 233 topics"
          categories={MEETING_CATEGORIES.filter((_, i) => i < 10)}
          categoryCardType="card4"
        /> */}

        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderPosts
            postCardName="card9"
            heading="Explore latest audio articles"
            subHeading="Click on the icon to enjoy the music or podcast 🎧"
            posts={DEMO_POSTS_AUDIO.filter((_, i) => i > 3 && i < 10)}
          />
        </div> */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionMagazine className="py-16 lg:py-28" posts={mappedMeetings} />
        </div>
        {/* <SectionAds /> */}

        {/* <SectionMagazine7
          className="py-16 lg:py-28"
          posts={DEMO_POSTS_GALLERY.filter((_, i) => i < 6)}
        /> */}
      </div>

      {/* <div className="dark bg-neutral-900 dark:bg-black dark:bg-opacity-20 text-neutral-100">
        <div className="relative container">
          <SectionGridPosts
            className="py-16 lg:py-28"
            headingIsCenter
            postCardName="card10V2"
            heading="Explore latest video articles"
            subHeading="Hover on the post card and preview video 🥡"
            posts={DEMO_POSTS_VIDEO.filter((_, i) => i > 5 && i < 12)}
            gridClass="md:grid-cols-2 lg:grid-cols-3"
          />
        </div>
      </div> */}
      {/* 
      <div className="container ">
        <SectionMagazine8
          className="py-16 lg:py-28"
          posts={DEMO_POSTS_AUDIO.filter((_, i) => i < 6)}
        />

        <div className="relative py-16">
          <BackgroundSection />
          <SectionMagazine9
            posts={DEMO_POSTS_AUDIO.filter((_, i) => i >= 6 && i < 15)}
          />
        </div>



        <div className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>

        <SectionMagazine2
          className="py-16 lg:py-24"
          heading="Life styles 🎨 "
          posts={MAGAZINE2_POSTS}
        />

        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderPosts
            postCardName="card11"
            heading="More design articles"
            subHeading="Over 1118 articles "
            posts={DEMO_POSTS.filter(
              (p, i) => i > 3 && i < 25 && p.postType === "standard"
            )}
          />
        </div>

        <SectionSubscribe2 className="pt-16 lg:pt-28" />

        <SectionVideos className="py-16 lg:py-28" />

        <SectionLatestPosts className="pb-16 lg:pb-28" />
      </div> */}
      {/* <Link href={'/meeting/create'}>
        <CreateBtn />
      </Link> */}
      <BottomNav />
    </div>
  );
};


