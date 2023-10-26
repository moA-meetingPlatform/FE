import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { options } from '@/app/api/auth/[...nextauth]/options'
import OtherLogin from '@/components/(page)/login/OtherLogin'

export const metadata = {
  title: '모아 - 로그인',
  description: '로그인 페이지',
}

export default async function otherLoginPage() {

  const session = await getServerSession(options)

  if (session !== null) {
    redirect('/')
  }


  return (

    <main>
      <div className='login_cnt'>
        <OtherLogin />
      </div>
    </main>
  )
}