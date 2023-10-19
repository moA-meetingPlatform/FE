import ChangePwForm from '@/components/page/login/ChangePwForm'
import React from 'react'

function changePw() {
  return (
    <>
    <div>
      <p>
        비밀번호를 잊어버리셨나요?
      </p>
      <div>
        <ChangePwForm />
      </div>
    </div>
    </>
  )
}

export default changePw