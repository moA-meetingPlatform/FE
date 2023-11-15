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
import BackStepHeader from '@/components/(navigation)/(top)/BackStepHeader'
import FormArea from '../FormArea'

function JoinStep() {


  const [signUpData,setSignUpData]=useState<SignupType>({
    userId : "", 
    userPassword : "",
    checkPassword :"",
    phoneNumber : "",
    phoneCert : false,
    idChecked: false, // 중복 확인 여부를 저장하는 상태 추가
  })

  useEffect(() => {
  },[signUpData])

  const [active, setActive] = useState<any>(1);

  const handleIdCheck = (isChecked: boolean) => {
    // 중복 확인 결과에 따라 필요한 로직을 수행
    if (!isChecked) {
      
    }
  };
  
  let tabs = [
    {
      id: 1,
      label: "아이디 입력",
      progress: 25,
      content: <IdInput signUpData={signUpData} setSignUpData={setSignUpData} onIdCheck={handleIdCheck}/>
    },
    {
      id: 2,
      label: "비밀번호 입력",
      progress: 50,
      content: <PwInput signUpData={signUpData} setSignUpData={setSignUpData}/>
    },
    {
      id: 3,
      label: "휴대폰 인증",
      progress: 75,
      content: <PhoneCert signUpData={signUpData} setSignUpData={setSignUpData}/>
    },
    {
      id: 4,
      label: "정보 입력",
      progress: 100,
      content: <FormArea signUpData={signUpData} setSignUpData={setSignUpData}/>
    },
  ]

  
  return (
    <>
      <BackStepHeader active={active} setActive={setActive}/>
      <LinearProgress variant="determinate" value={tabs.find(tab => tab.id === active)?.progress} />
      <Progress size="sm" aria-label="Loading..." value={tabs.find(tab => tab.id === active)?.progress} className="max-w-md" />
      <div className="flex w-full flex-col bg-white">
        <Card>
          <CardBody>
            {tabs.find(tab => tab.id === active)?.content}
          </CardBody>
        </Card>
        </div>
{/*           <div className='grid place-items-center mt-3'>
          <button className='h-[44px] w-full bg-[#4338ca] rounded-2xl grid place-items-center text-white font-semibold'>다음</button>
          </div> */}
      <JoinButton
        active={active} setActive={setActive}
        signUpData={signUpData} setSignUpData={setSignUpData}
      />
    </>
  )
}

export default JoinStep

/* 'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

function Step(props: { step: number, title: string, description?: string, loginId?: string, name?: string }) {

  const pathname = usePathname();

  const maskSecondCharacter = (str: string) => {
    return str[0] + '*' + str.slice(2);
}

  return (
    <div>
        <p>{props.title}</p>
        <p>{props.description}</p>

        {pathname === '/join/success'
          ?
          <div>
              <p className="sp_tit1">
                  <strong className="txt_line0">{props.name && maskSecondCharacter(props.name)}</strong> 님,
                  <span className="user_underline"> {props.loginId} ID</span>로
                  <br />모아
                  <strong className="fw500"> 이메일 회원 가입</strong>이
                  <br />
                  완료되었습니다.
              </p>
          </div>
          : null
        }
    </div>
  )
}

export default Step */