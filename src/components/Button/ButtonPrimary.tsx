"use client";

import React, { FC, useState } from "react";
import Button, { ButtonProps } from "./Button";
import { useSession } from "next-auth/react";
import NcModal from "@/components/NcModal/NcModal";
import { useRouter } from "next/navigation";

export interface Props extends ButtonProps {
  id?: string;
}

const ButtonPrimary: FC<Props> = ({ id, ...props }) => {
  const router = useRouter();
  const session = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const participantMeeting = async (meetingId: string) => {

    console.log(session.data?.user.userUuid)

    
      const res = await fetch(`https://moamoa-backend.duckdns.org/api/v1/meeting-feature/participate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          meetingId: meetingId,
          participantUuid: session.data?.user.userUuid,
          meetingParticipationAnswer: "YES"
        })
      });
  
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
  
      // 추가 처리
    else {
      console.error("User is not authenticated");
    }
  };

  return (
    <>
      <Button {...props} pattern="primary" onClick={() => {
        setIsModalOpen(true);
        console.log(id);
        console.log(session.data?.user.userUuid)
      }} />

      <NcModal
        isOpenProp={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        modalTitle="모임에 참가하시겠습니까?"
        renderContent={() => (
          <>
            <div>모임에 참가하시겠습니까?</div>
            <button onClick={() => {
            
              if (id) {
                participantMeeting(id);
              }
              setIsModalOpen(false);
              router.push(`/`);
            }}>예</button>
            <button onClick={() => setIsModalOpen(false)}>아니오</button>
          </>
        )}
      />
    </>
  );
};

export default ButtonPrimary;