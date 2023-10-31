import React from 'react'

function settings() {
  return (
    <>
    <main>
      <ul>
        <li className='setting_1'>안내</li>
        <li>공지사항</li>
        <li>이벤트</li>
        <li>자주 묻는 질문</li>
        <li>1:1 문의</li>
      </ul>

      <ul>
        <li className='setting_2'>사용자설정</li>
        <li>알림 설정</li>
        <li>차단 멤버 관리</li>
        <li>경고 점수 조회</li>
        <li>정산 계좌 관리</li>
      </ul>
    </main>
    </>
  )
}

export default settings