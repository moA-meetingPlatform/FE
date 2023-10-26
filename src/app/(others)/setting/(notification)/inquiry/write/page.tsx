import React from 'react'
import NoticeModal from '@/components/(page)/profile/noticeModal'

function inquiry() {
  return (
    <>
    <main className='mt-[50px]'>
      <div>
        <p>이름</p>
        <input type="text" className='border'/>
      </div>
      <div>
        <p>연락처</p>
        <input type="text" className='border'/>
      </div>
      <div>
        <select title='inquiry kind'>
          <option value="01">유저</option>
          <option value="02">모임</option>
          <option value="03">결제/환불</option>
          <option value="04">약관</option>

        </select>
      </div>
      <div>
        <p>제목</p>
        <input type="text" className='border'/>
      </div>

      <div>
        <p>내용</p>
        <input type="text" placeholder='내용을 입력해주세요.(최대 300자)'
        className='border w-full h-[150px]'/>
      </div>

      <NoticeModal />
    </main>
    </>
  )
}

export default inquiry