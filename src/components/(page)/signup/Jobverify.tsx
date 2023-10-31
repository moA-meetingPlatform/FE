import MeetingCreateHeader from '@/components/(navigation)/(top)/MeetingCreateHeader'
import Heading2 from '@/components/Heading/Heading2'
import React from 'react'

function Jobverify() {
  return (
    <>
    <div>
      회사이메일
    </div>
    <div className='flex -mx-4 justify-between'>
    <input type="text" className='border-x-none rounded-xl'/>
    <button className='bg-[#eef2ff] rounded-full p-2 min-w-[80px] font-semibold '>인증하기</button>
    </div>
    <div>
    <button className='w-full mt-40 h-10 rounded-xl bg-[#4338ca] text-white'>가입하기</button>
    <button className='w-full mt-3 h-10 rounded-xl border-2 border-[#4338ca]'>회사 이메일이 없습니다.</button>
    </div>
    </>
  )
}

export default Jobverify