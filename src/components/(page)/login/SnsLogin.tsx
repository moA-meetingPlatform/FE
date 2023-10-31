'use client'

import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link';

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
    <div>
      <div>
        <button onClick={() => handleLogin('kakao')} title="새창 열림"
        className='bg-[#fee102] h-9 w-[300px] rounded-full font-semibold text-yellow-800'>
          <span>카카오톡으로 5초만에 시작하기</span>
        </button>
        <Link href="/login/otherLogin">
          <div className='text-center font-semibold'>
            다른 방법으로 시작하기
          </div>
        </Link>
      </div>
    </div>
  )
}
