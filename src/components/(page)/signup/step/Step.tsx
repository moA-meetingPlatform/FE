'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

function Step(props: { step: number, title: string, description?: string, loginId?: string, name?: string }) {

  const pathname = usePathname();

  const maskSecondCharacter = (str: string) => {
    return str[0] + '*' + str.slice(2);
}

  return (
    <div>
        <p>{props.title}</p>
        <p>{props.description}</p>

        {pathname === '/join/success'
          ?
          <div>
              <p className="sp_tit1">
                  <strong className="txt_line0">{props.name && maskSecondCharacter(props.name)}</strong> 님,
                  <span className="user_underline"> {props.loginId} ID</span>로
                  <br />모아
                  <strong className="fw500"> 이메일 회원 가입</strong>이
                  <br />
                  완료되었습니다.
              </p>
          </div>
          : null
        }
    </div>
  )
}

export default Step