'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'
import Heading from '@/components/Heading/Heading';
import Checkbox from '@/components/Checkbox/Checkbox';

export default function Sequence5(props) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const router = useRouter();
  const searchParams = useSearchParams()
  const [inputMeetingAddress, setInputMeetingAddress] = useState(searchParams.get('MeetingAddress') || '');
  const { url, setUrl, updateQueryParams } = props;
  const [IsOnline, setIsOnline] = useState(searchParams.get('IsOnline') || '');
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handleNext = () => {
    const baseURL = 'http://localhost:3000'; // Adjust as needed

    const updatedUrl = updateQueryParams(baseURL, url, {
      MeetingAddress: inputMeetingAddress,
      IsOnline: IsOnline
    });
    setUrl(updatedUrl);
    router.push(updatedUrl);
  };

  return (
    <>


      <div className='tracking-tighter mb-8'>
        <p className='text-lg font-semibold text-center'>어디서 만날까요?</p>
        <p className="text-xs text-center text-gray-500">모임이 생성된 후에는 변경할 수 없으니 신중하게 설정해 주세요</p>
      </div>

      <div className='flex flex-col justify-center items-center relative'>
        <div className='flex flex-col justify-start md:w-[80%] w-full transition-all'>
          <label className='text-[0.75rem] text-gray-500 bg-white -mb-3 ml-5 z-50 w-fit px-2'>오프라인</label>
          <input
            className='border-2 border-[#E5E7EB] text-[0.8rem] rounded-full px-5 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'
            type="text"
            value={inputMeetingAddress}
            onChange={(e) => setInputMeetingAddress(e.target.value)}
          />
        </div>
      </div>

      <div className='flex flex-col justify-center items-center relative'>
        <div className='flex flex-col justify-start md:w-[80%] w-full transition-all'>
          <label className='text-[0.75rem] text-gray-500 bg-white -mb-3 ml-5 z-50 w-fit px-2'>온라인</label>
          <input
            className='border-2 border-[#E5E7EB] text-[0.8rem] rounded-full px-5 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'
            type="text"
            value={IsOnline}
            onChange={(e) => setIsOnline(e.target.value)}
          />
        </div>
        <button onClick={handleNext}>Next</button>
      </div>


{/*       <Heading desc={""}>어디서 만날까요?</Heading>
      <div className="flex flex-col gap-2">
        <p className="text-small text-default-500">Selected value: {selectedValue}</p>
        <input
          type="text"
          value={inputMeetingAddress}
          onChange={(e) => setInputMeetingAddress(e.target.value)}
        />
        <input
          type="text"
          value={IsOnline}
          onChange={(e) => setIsOnline(e.target.value)}
        />
        <button onClick={handleNext}>Next</button>
      </div> */}


    </>
  );
}
