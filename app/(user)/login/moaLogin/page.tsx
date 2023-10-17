'use client'

import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

import Loginarea from '@/components/page/login/LoginArea'


function moaLogin() {

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
      <Loginarea />
    </div>
  )
}

export default moaLogin