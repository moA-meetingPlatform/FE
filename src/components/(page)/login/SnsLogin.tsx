'use client'

import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image';
import MoaLogo from '@/components/Logo/MoaLogo';
import MoaLogo2 from '@/components/Logo/MoaLogo2';
import Firstbottom from '@/components/Logo/firstbottom';

export default function SnsLogin() {

  const query = useSearchParams();
  const callBackUrl = query.get('callbackUrl');
  const session = useSession()


  const handleLogin = async (provider: string) => {
    
    const result = await signIn(provider, {
        redirect: true,
        callbackUrl: callBackUrl ? callBackUrl : '/'
    })
};

  return (
    <>
      <div className='main_logo mt-20 grid place-items-center'>
        <MoaLogo2 />
      </div>
      <div className='grid place-items-center mt-40'>
        <button onClick={() => handleLogin('kakao')} title="새창 열림"
        className='bg-[#fee102] h-9 w-[300px] rounded-full font-semibold text-yellow-800'>
          <span>카카오톡으로 5초만에 시작하기</span>
        </button>
        <div className='mt-3 border-t'>
          <Link href="/login/otherLogin">
            <div className='mt-3 bg-[#eef2ff] h-9 leading-9 w-[300px] rounded-full font-semibold text-center'>
              다른 방법으로 시작하기
            </div>
          </Link>
        </div>
        <p className='text-[12px]'>회원가입없이 둘러보기</p>
      </div>
      <div className='grid place-items-center'>
        <Firstbottom />
      </div>
    </>
  )
}
