'use client'

import MeetingCreateHeader from '@/components/(navigation)/(top)/MeetingCreateHeader'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function inquirylayout({children}:
  {children: React.ReactNode},) {

    const pathname = usePathname()
  return (
    <>
    <MeetingCreateHeader />
    <div className='flex'>
      <div className={pathname==='/setting/inquiry/write' ?`w-1/2 h-8 leading-5 text-center border-b-[3px] border-[#72A555] pb-2` : `w-1/2 h-8 leading-5 text-center`}>
        <Link href='/setting/inquiry/write'>
          1:1문의하기
        </Link>
      </div>

      <div className={pathname==='/setting/inquiry/history' ?`w-1/2 h-8 leading-5 text-center border-b-[3px] border-[#72A555] pb-2` : `w-1/2 h-8 leading-5 text-center`}>
        <Link href='/setting/inquiry/history'>
          1:1문의 내역
        </Link>
      </div>
    </div>
    <div>
      {children}
    </div>
    </>
  )
}