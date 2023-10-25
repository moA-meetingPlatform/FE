'use client'

import Link from 'next/link'

export default function inquirylayout({children}:
  {children: React.ReactNode},) {
  return (
    <>
    <div className='flex'>
      <div className='w-1/2 h-5 leading-5 text-center'>
        <Link href='/setting/inquiry/white'>
          1:1문의하기
        </Link>
      </div>

      <div className='w-1/2 h-5 leading-5 text-center'>
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