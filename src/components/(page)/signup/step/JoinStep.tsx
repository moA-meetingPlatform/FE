'use client'

import CreateMeetingBottomNav from '@/components/(navigation)/(bottom)/CreateMeetingBottomNav'
import BackbuttonHeader from '@/components/(navigation)/(top)/BackbuttonHeader'
import IdInput from '@/components/(page)/signup/step/IdInput'
import PhoneCert from '@/components/(page)/signup/step/PhoneCert'
import PwInput from '@/components/(page)/signup/step/PwInput'
import { SignupType } from '@/types/SignupType'
import LinearProgress from '@mui/material/LinearProgress'
import { Card, CardBody, Progress } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import JoinButton from './JoinButton'
import FormArea from '../FormArea'
import { useSearchParams } from 'next/navigation'
import { toInteger } from 'lodash'

function JoinStep() {

  const [signUpData,setSignUpData]=useState<SignupType>({
    userId : "", 
    userPassword : "",
    checkPassword :"",
    phoneNumber : "",
    phoneCert : false,
    idChecked: false, // 중복 확인 여부를 저장하는 상태 추가
  })

  const [active, setActive] = useState<any>(
    [
      { id : 1, status : false },
      { id : 2, status : false },
      { id : 3, status : false },
      { id : 4, status : false },
    ]
  );

  const query = useSearchParams();
  const stepId = toInteger(query?.get('step'));

  const tabs = [
    {
      id: 1,
      label: "아이디 입력",
      progress: 25,
      content: <IdInput signUpData={signUpData} setSignUpData={setSignUpData} active={active} setActive={setActive} stepId={stepId}/>
    },
    {
      id: 2,
      label: "비밀번호 입력",
      progress: 50,
      content: <PwInput signUpData={signUpData} setSignUpData={setSignUpData} active={active} setActive={setActive} stepId={stepId}/>
    },
    {
      id: 3,
      label: "휴대폰 인증",
      progress: 75,
      content: <PhoneCert signUpData={signUpData} setSignUpData={setSignUpData} active={active} setActive={setActive} stepId={stepId}/>
    },
    {
      id: 4,
      label: "정보 입력",
      progress: 100,
      content: <FormArea signUpData={signUpData} setSignUpData={setSignUpData} active={active} setActive={setActive} stepId={stepId}/>
    },
  ]

  useEffect(() => {
    console.log(stepId);
    console.log(signUpData)
  }, [stepId]);

  

  
  return (
    <>
      <div className='m-auto mt-[100px]'>
      <LinearProgress variant="determinate" value={tabs.find(tab => tab.id === stepId)?.progress} className='rounded-lg h-1 transition-all'/>
      </div>
      <div className="flex w-full flex-col bg-white">
        <Card>
          <CardBody>
            {tabs.find(tab => tab.id === stepId)?.content}
          </CardBody>
        </Card>
        </div>
      <JoinButton
        active={active} setActive={setActive}
        signUpData={signUpData} setSignUpData={setSignUpData}
        stepId={stepId}
      />
    </>
  )
}

export default JoinStep
