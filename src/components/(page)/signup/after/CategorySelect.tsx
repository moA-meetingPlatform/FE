'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ActiListData, ArtListData, FoodListData, FriendListData, HobbyListData, InvestListData, LanguageListData, PartyListData, TripListData } from '@/data/interest/interestListData'
import { InterestListType } from '@/types/InterestListType'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

function CategorySelect() {

  const [selectinterest, setselectinterest] = useState<any>([]);
  // console.log(selectinterest)
  const { data: session } = useSession();
  console.log(session)
  const pathname = usePathname();
  const router = useRouter()


  //   const postData = async () => {
  //     try {
  //       const response = await fetch('https://moamoa-backend.duckdns.org/api/v1/category/user', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           user_category_id: selectinterest,
  //           userUuid: session?.user?.userUuid,
  //         }),
  //       })

  //       if (response.ok) {
  //         console.log('Data sent successfully!');
  //         router.push('/')
  //       } else {
  //         console.error('Failed to send data.');
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };


  //   useEffect(() => {
  //   postData();
  // }, [selectinterest, session]);

    const postData = async () => {
      try {
        const response = await fetch('https://moamoa-backend.duckdns.org/api/v1/category/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userUuid: session?.user?.userUuid.toString(),
            user_category_id: selectinterest,
          }),
        })

        if (response.ok) {
          // 성공적으로 처리된 경우의 로직을 작성합니다.
          console.log('200');
          router.push('/')
        } else {
          // 오류 처리 로직을 작성합니다.
          console.error('Failed to send data.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

  const handleCheckboxChange = (e:any) => {
    const { checked, value } = e.target;
    // console.log(value)
    if (checked) {
      setselectinterest((prevInterests: any) => [...prevInterests, (value)]);
    } else {
      setselectinterest((prevInterests: any) =>
        prevInterests.filter((interest: any) => interest !== value)
      );
    }
  };

  const isButtonEnabled = selectinterest.length >= 3
  return (
    <>
      <main className='mx-8'>

      <div className='tracking-tighter mb-8'>
        <p className='text-lg font-semibold text-center'>관심사를 선택해 주세요.</p>
        <p className="text-xs text-center text-gray-500">관심사로 더 좋은 만남을 제공할 수 있습니다.</p>
        <p className="text-xs text-center text-gray-500">관심사를 3개 항목 이상 선택해 주세요.</p>
      </div>


        <div className='interest_food flex gap-2'>
          <strong className='text-xl'>푸드</strong>
          <span>
            <Image src="/images/interest/foodIcons.png" alt="moa Logo" width={30} height={30} />
          </span>
        </div>
        <div className='flex flex-wrap'>
          {
            FoodListData.map((e: InterestListType) => (
              <>
                <label className='my-1' key={e.key}>
                  <input type='checkbox'
                    
                    className='hidden peer'
                    value={e.category_id}
                    onChange={handleCheckboxChange}
                  /*        checked={isChecked}
                          onChange={handleCheckboxChange}
                            style={{
                            overflow: 'hidden',
                            position: 'absolute',
                            left: '-10000px',
                            width: '1px',
                            height: '1px',
                          }} */
                  />
                  <span className='border px-2 py-1 rounded-full mr-1 text-[0.7rem] peer-checked:bg-[#eef2ff] peer-checked:font-semibold'>{e.contents}</span>
                </label>
              </>
            ))}
        </div>

        {/* 문화·예술 */}
        <div className='interest_food flex gap-2 mt-3'>
          <strong className='text-xl'>문화·예술</strong>
          <span>
            <Image src="/images/interest/artIcons.png" alt="예술 아이콘" width={30} height={30} />
          </span>
        </div>
        <div className='flex flex-wrap'>
          {
            ArtListData.map((e: InterestListType) => (
              <>
                <label className='my-1' key={e.key}>
                  <input type='checkbox'
                    
                    className='hidden peer'
                    value={e.category_id}
                    onChange={handleCheckboxChange}

                  />
                  <span className='border px-2 py-1 rounded-full mr-1 text-[0.7rem] peer-checked:bg-[#eef2ff] peer-checked:font-semibold'>{e.contents}</span>
                </label>
              </>
            ))}
        </div>

        {/* 액티비티 */}
        <div className='interest_food flex gap-2 mt-3'>
          <strong className='text-xl'>액티비티</strong>
          <span>
            <Image src="/images/interest/activityIcons.png" alt="액티비티 아이콘" width={30} height={30} />
          </span>
        </div>
        <div className='flex flex-wrap'>
          {
            ActiListData.map((e: InterestListType) => (
              <>
                <label className='my-1' key={e.key}>
                  <input type='checkbox'
                    
                    className='hidden peer'
                    value={e.category_id}
                    onChange={handleCheckboxChange}

                  />
                  <span className='border px-2 py-1 rounded-full mr-1 text-[0.7rem] peer-checked:bg-[#eef2ff] peer-checked:font-semibold'>{e.contents}</span>
                </label>
              </>
            ))}
        </div>

        {/* 취미 */}
        <div className='interest_food flex gap-2 mt-3'>
          <strong className='text-xl'>취미</strong>
          <span>
            <Image src="/images/interest/hobbyIcons.png" alt="취미 아이콘" width={30} height={30} />
          </span>
        </div>
        <div className='flex flex-wrap'>
          {
            HobbyListData.map((e: InterestListType) => (
              <>
                <label className='my-1' key={e.key}>
                  <input type='checkbox'
                    
                    className='hidden peer'
                    value={e.category_id}
                    onChange={handleCheckboxChange}

                  />
                  <span className='border px-2 py-1 rounded-full mr-1 text-[0.7rem] peer-checked:bg-[#eef2ff] peer-checked:font-semibold'>{e.contents}</span>
                </label>
              </>
            ))}
        </div>

        {/* 파티 */}
        <div className='interest_food flex gap-2 mt-3'>
          <strong className='text-xl'>파티·소개팅</strong>
          <span>
            <Image src="/images/interest/partyIcons.png" alt="취미 아이콘" width={30} height={30} />
          </span>
        </div>
        <div className='flex flex-wrap'>
          {
            PartyListData.map((e: InterestListType) => (
              <>
                <label className='my-1' key={e.key}>
                  <input type='checkbox'
                    
                    className='hidden peer'
                    value={e.category_id}
                    onChange={handleCheckboxChange}

                  />
                  <span className='border px-2 py-1 rounded-full mr-1 text-[0.7rem] peer-checked:bg-[#eef2ff] peer-checked:font-semibold'>{e.contents}</span>
                </label>
              </>
            ))}
        </div>

        {/* 여행 */}
        <div className='interest_food flex gap-2 mt-3'>
          <strong className='text-xl'>여행·동행</strong>
          <span>
            <Image src="/images/interest/tripIcons.png" alt="취미 아이콘" width={30} height={30} />
          </span>
        </div>
        <div className='flex flex-wrap'>
          {
            TripListData.map((e: InterestListType) => (
              <>
                <label className='my-1' key={e.key}>
                  <input type='checkbox'
                    
                    className='hidden peer'
                    value={e.category_id}
                    onChange={handleCheckboxChange}

                  />
                  <span className='border px-2 py-1 rounded-full mr-1 text-[0.7rem] peer-checked:bg-[#eef2ff] peer-checked:font-semibold'>{e.contents}</span>
                </label>
              </>
            ))}
        </div>

        {/* 자기계발 */}
        <div className='interest_food flex gap-2 mt-3'>
          <strong className='text-xl'>자기계발</strong>
          <span>
            <Image src="/images/interest/studyIcons.png" alt="취미 아이콘" width={30} height={30} />
          </span>
        </div>
        <div className='flex flex-wrap'>
          {
            TripListData.map((e: InterestListType) => (
              <>
                <label className='my-1' key={e.key}>
                  <input type='checkbox'
                    
                    className='hidden peer'
                    value={e.category_id}
                    onChange={handleCheckboxChange}

                  />
                  <span className='border px-2 py-1 rounded-full mr-1 text-[0.7rem] peer-checked:bg-[#eef2ff] peer-checked:font-semibold'>{e.contents}</span>
                </label>
              </>
            ))}
        </div>

        {/* 친목 */}
        <div className='interest_food flex gap-2 mt-3'>
          <strong className='text-xl'>동네·친목</strong>
          <span>
            <Image src="/images/interest/friendIcons.png" alt="친목 아이콘" width={30} height={30} />
          </span>
        </div>
        <div className='flex flex-wrap'>
          {
            FriendListData.map((e: InterestListType) => (
              <>
                <label className='my-1' key={e.key}>
                  <input type='checkbox'
                    
                    className='hidden peer'
                    value={e.category_id}
                    onChange={handleCheckboxChange}

                  />
                  <span className='border px-2 py-1 rounded-full mr-1 text-[0.7rem] peer-checked:bg-[#eef2ff] peer-checked:font-semibold'>{e.contents}</span>
                </label>
              </>
            ))}
        </div>

        {/* 재태크 */}
        <div className='interest_food flex gap-2 mt-3'>
          <strong className='text-xl'>재태크</strong>
          <span>
            <Image src="/images/interest/investIcons.png" alt="친목 아이콘" width={30} height={30} />
          </span>
        </div>
        <div className='flex flex-wrap'>
          {
            InvestListData.map((e: InterestListType) => (
              <>
                <label className='my-1' key={e.key}> 
                  <input type='checkbox'
                    
                    className='hidden peer'
                    value={e.category_id}
                    onChange={handleCheckboxChange}

                  />
                  <span className='border px-2 py-1 rounded-full mr-1 text-[0.7rem] peer-checked:bg-[#eef2ff] peer-checked:font-semibold'>{e.contents}</span>
                </label>
              </>
            ))}
        </div>

        {/* 언어 */}
        <div className='interest_food flex gap-2 mt-3'>
          <strong className='text-xl'>언어</strong>
          <span>
            <Image src="/images/interest/languageIcons.png" alt="친목 아이콘" width={30} height={30} />
          </span>
        </div>
        <div className='flex flex-wrap'>
          {
            LanguageListData.map((e: InterestListType) => (
              <>
                <label className='my-1' key={e.key}>
                  <input type='checkbox'
                    
                    className='hidden peer'
                    value={e.category_id}
                    onChange={handleCheckboxChange}
                  />
                  <span className='border px-2 py-1 rounded-full mr-1 text-[0.7rem] peer-checked:bg-[#eef2ff] peer-checked:font-semibold'>{e.contents}</span>
                </label>
              </>
            ))}
        </div>


        {pathname !== '/editProfile' && (
        <div className='flex mt-14'>
            <button className={`h-[44px] w-[300px] bg-[#4338ca] rounded-2xl mx-auto text-white font-semibold ${isButtonEnabled ? '' : 'opacity-70 cursor-not-allowed'}`}
            onClick={postData}
            disabled={!isButtonEnabled}
            >
              완료
            </button>
        </div>
          )}
      </main>
    </>
  )
}

export default CategorySelect