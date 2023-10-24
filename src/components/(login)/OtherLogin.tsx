'use client'

import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function OtherLogin() {

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
      <div className='pt-20 px-[40px] pb-[80px]'>
        <ul>
          <li>
            <button onClick={() => handleLogin('naver')} title="새창 열림"
            className='bg-[#03c75a] mx-auto h-9 w-[300px] rounded-full font-semibold text-white'>
              <span>네이버 계정으로 로그인하기</span>
            </button>
          </li>

          <li className='pt-4'>
            <button onClick={() => handleLogin('google')} title="새창 열림"
          className='bg-[#3d81e7] mx-auto h-9 w-[300px] rounded-full font-semibold text-white'>
            <span>구글 계정으로 로그인하기</span>
          </button>
          </li>

          <li className='pt-4'>
            <Link href={'/login/moaLogin'}>
            <button className='bg-slate-400 mx-auto h-9 w-[300px] rounded-full font-semibold text-white'
            >
            <span>모아로 로그인하기</span>
          </button>
          </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}