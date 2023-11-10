'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import CertTimer from '../login/CertTimer';
import ButtonCircle from "@/components/Button/ButtonCircle";
import Input from "@/components/Input/Input";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

interface PhoneInputProps {
  // 다른 프로퍼티 정의
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
}

function Jobverify() {

  const [verify, setVerify] = useState<any>(false)
  const [remainingTime, setRemainingTime] = useState<any>(300);

  const handleResend = () => {
    if (verify) { // 인증번호 재전송을 누를 때 verify를 false로 설정
    setRemainingTime(180);
    } // 인증번호 재전송을 누를 때 remainingTime을 180으로 초기화
  };


  return (
    <>
    <main className='grid place-items-center'>
    <div className='tracking-tighter py-4'>
      <p className='text-lg'>사내메일 주소를 정확하게 입력해주세요.</p>
      <p className='text-sm'>모아를 원활하게 사용하기 위해 인증해주세요.
      </p>
    </div>

    <div>
    <p>회사이메일</p> 
    <div className='flex justify-between'>
    <input type="text" className='rounded-xl h-10 min-w-[150px] w-[200px]'/>
    <button
          className={
            verify
              ? "bg-[#eef2ff] min-w-[128px] w-32 h-10 rounded-3xl font-semibold"
              : "bg-[#4338ca] min-w-[128px] text-white w-32 h-10 rounded-3xl font-semibold"
          }
          onClick={() => {
            setVerify(true);
              handleResend();
          }}
          style={{ alignSelf: "flex-end"}}
        >
        {verify ? "인증번호 재전송" : "인증번호 보내기"}
        </button>
    </div>

    {
      verify &&
        <div>
          <div className='grid place-items-center mt-3'>
            <CertTimer verify={verify} remainingTime={remainingTime} setRemainingTime={setRemainingTime}/>
          </div>

        <form className="mt-5 mx-3 relative max-w-sm">
          <Input
            required
            aria-required
            placeholder="인증번호 입력"
            type="number"
          />
          <ButtonCircle
            type="submit"
            className="absolute transform top-1/2 -translate-y-1/2 end-1 dark:bg-neutral-300 dark:text-black"
          >
            <ArrowRightIcon className="w-5 h-5 rtl:rotate-180" />
          </ButtonCircle>
        </form>
        </div>
    }
    
    <div>
    <button className='w-full mt-40 h-10 rounded-xl bg-[#4338ca] text-white'>가입완료</button>
    <Link href='/join/jobverify/certverify'>
    <button className='w-full mt-3 h-10 rounded-xl border-2 border-[#4338ca]'>회사 이메일이 없습니다.</button>
    </Link>
    </div>
    </div>
    </main>
    </>
  )
}

export default Jobverify