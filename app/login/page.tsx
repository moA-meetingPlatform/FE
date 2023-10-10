import React from 'react'
import SnsLogin from '@/components/page/login/SnsLogin'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { options } from '../api/auth/[...nextauth]/options'

export const metadata = {
  title: '모아 - 로그인',
  description: '로그인 페이지',
}

export default async function LoginPage() {

  const session = await getServerSession(options)

  if (session !== null) {
    redirect('/')
  }


  return (

    <main>
      <div className='login_cnt'>
        <SnsLogin />
      </div>
    </main>
  )
}