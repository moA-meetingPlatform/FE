import React, { FC } from "react";
import ModalCategories from "@/components/(meeting)/(modal)/ModalCategories";
import ModalTags from "@/components/(meeting)/(modal)/ModalTags";
import { PostDataType } from "@/data/types";
import { MEETING_CATEGORIES } from "@/data/category";
import Pagination from "@/components/Pagination/Pagination";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import ArchiveFilterListBox from "@/components/ArchiveFilterListBox/ArchiveFilterListBox";
import Card11 from "@/components/Card11/Card11";
import SiteHeader from "@/app/SiteHeader";
import __posts from "../../../../../data/jsons/__posts.json";
import { DEMO_AUTHORS } from "@/data/authors";

const fetchData = async () => {
  try {
    // 첫 번째 요청
    const responseOne = await fetch('/api/first-endpoint');
    const dataOne = await responseOne.json();

    // 필요한 데이터 추출
    const neededDataFromFirstCall = dataOne.someProperty;

    // 두 번째 요청 (첫 번째 요청의 데이터를 사용)
    const responseTwo = await fetch('/api/second-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ neededDataFromFirstCall }),
    });
    const dataTwo = await responseTwo.json();

    // 필요한 데이터 추출
    const neededDataFromSecondCall = dataTwo.anotherProperty;

    // 세 번째 요청 (두 번째 요청의 데이터를 사용)
    const responseThree = await fetch('/api/third-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ neededDataFromSecondCall }),
    });
    const dataThree = await responseThree.json();

    // 세 번째 요청의 응답 처리
    console.log(dataThree);

    return dataThree.json()


  } catch (error) {
    // 에러 처리
    console.error('An error occurred:', error);
  }

};

const DEMO_POSTS = __posts.map((post, index): PostDataType => {
  //  ##########  GET CATEGORY BY CAT ID ######## //
  const categories = post.categoriesId.map(
    (id) => MEETING_CATEGORIES.filter((taxonomy) => taxonomy.id === id)[0]
  );

  return {
    ...post,
    id: `DEMO_POSTS_${index + 1}`,
    author: DEMO_AUTHORS.filter((user) => user.id === post.authorId)[0],
    categories: [categories[0]],
  } as PostDataType;
});


// Tag and category have same data type - we will use one demo data
const posts = DEMO_POSTS.filter((_, i) => i < 10);

export default async function PageArchive({ params }: { params: { slug: string } }) {
  const FILTERS = [
    { name: "Most Recent" },
    { name: "Curated by Admin" },
    { name: "Most Appreciated" },
    { name: "Most Discussed" },
    { name: "Most Viewed" },
  ];

  // const data = await fetchData();
  console.log(params.slug[1])

  return (
    <>
      <SiteHeader />
      <div className={`nc-PageArchive`}>
        <div className="container pt-10 pb-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
          <div>
            <div className="flex flex-col sm:justify-between sm:flex-row">
              <div className="flex space-x-2.5 rtl:space-x-reverse">
                <ModalCategories categories={MEETING_CATEGORIES} />
                <ModalTags id={parseInt(params.slug[0], 10)} />

              </div>
              <div className="block my-4 border-b w-full border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
              <div className="flex justify-end">
                <ArchiveFilterListBox lists={FILTERS} />
              </div>
            </div>

            {/* LOOP ITEMS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
              {posts.map((post) => (
                <Card11 key={post.id} post={post} />
              ))}
            </div>

            {/* PAGINATIONS */}
            <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
              <Pagination />
              <ButtonPrimary>Show me more</ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


