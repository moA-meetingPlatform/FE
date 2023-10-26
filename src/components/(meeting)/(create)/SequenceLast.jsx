'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'
import Heading from '@/components/Heading/Heading';
import NcModal from '@/components/NcModal/NcModal';



export default function SequenceLast(props) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const router = useRouter();
  const searchParams = useSearchParams()


  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handleSubmit = () => {
    // Handle your submit logic here
    console.log('Button Clicked!');
  };


  const [createData, setCreateData] = useState({
    title: searchParams.get('Title'),
    meetingAddress: searchParams.get('MeetingAddress'),
    description: searchParams.get('Description'),
    entryFee: searchParams.get('EntryFee'),
    meetingDatetime: searchParams.get('MeetingDatetime'),
    refundPolicy: searchParams.get('RefundPolicy'),
    isFcfs: searchParams.get('IsFcfs'),
    isOnline: searchParams.get('IsOnline'),
    maxParticipantNum: searchParams.get('MaxParticipantNum'),
    maxAge: searchParams.get('MaxAge'),
    minAge: searchParams.get('MinAge'),
    companyList: searchParams.get('CompanyList'),
    entryFeeInfoIdList: searchParams.get('EntryFeeInfoIdList'),
    entryFeeInfoEtcString: searchParams.get('EntryFeeInfoEtcString'),
    themeCategoryId: searchParams.get('ThemeCategoryId'),
    question: searchParams.get('Question'),
    headerImageUrl: searchParams.get('HeaderImageUrl'),
    joinGender: searchParams.get('JoinGender'),
  });


  const createMeeting = async () => {

    // 1. URL의 파라미터를 가져옵니다.
    let newCreateData = {};
    for (let [key, value] of searchParams.entries()) {
      newCreateData[key] = value;
    }

    // 2. createData의 상태를 업데이트합니다.
    setCreateData(newCreateData);


    try {
      const res = await fetch(`https://moa-backend.duckdns.org/api/v1/meeting?${queryString}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.data.user.token}`
        },
        body: JSON.stringify(
          {
            title: createData.title,
            meetingAddress: createData.meetingAddress,
            description: createData.description,
            entryFee: createData.entryFee,
            meetingDatetime: createData.meetingDatetime,
            refundPolicy: createData.refundPolicy,
            isFcfs: createData.isFcfs,
            isOnline: createData.isOnline,
            maxParticipantNum: createData.maxParticipantNum,
            maxAge: createData.maxAge,
            minAge: createData.minAge,
            companyList: createData.companyList,
            entryFeeInfoIdList: createData.entryFeeInfoIdList,
            entryFeeInfoEtcString: createData.entryFeeInfoEtcString,
            themeCategoryId: createData.themeCategoryId,
            question: createData.question,
            headerImageUrl: createData.headerImageUrl,
            joinGender: createData.joinGender,
          }
        ),
      });
      const data = await res.json();

      if (data.success === true) {
        router.push('/');
      }
      else {

      }
    }
    catch (e) {
      console.error("Error sending request:", e);
    }

  }

  return (
    <>
      <Heading desc={"요약"}>모임을 만드시겠습니까?</Heading>
      <div className="flex flex-col gap-2">
        <p className="text-small text-default-500">호스트: {selectedValue}</p>
        <p className="text-small text-default-500">모임 제목: {createData.title}</p>
        <p className="text-small text-default-500">모임 내용: {createData.description}</p>
        <p className="text-small text-default-500">인원수: {createData.maxParticipantNum}</p>
        <p className="text-small text-default-500">참가 방법: {createData.isFcfs}</p>
        <p className="text-small text-default-500">참가비: {createData.entryFee}</p>
        <p className="text-small text-default-500">참가비 세부사항: {createData.entryFeeInfoIdList} {createData.entryFeeInfoEtcString}</p>
        <p className="text-small text-default-500">성별: {createData.joinGender}</p>
        <p className="text-small text-default-500">날짜: {createData.meetingDatetime}</p>
        <p className="text-small text-default-500">장소: {createData.meetingAddress}</p>

        <button onClick={createMeeting}>fetch</button>

        <NcModal
          renderTrigger={(openModal) => <button onClick={openModal}>Open With Custom Trigger</button>}
          modalTitle="Your Modal Title"
          renderContent={() => <>
            <div>Your modal content here</div>
            <button onClick={handleSubmit}>Submit</button>
          </>}
        />

      </div>
    </>
  );
}
