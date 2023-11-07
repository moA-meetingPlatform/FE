import { SignupType } from '@/types/SignupType'
import React from 'react'

function PwInput(props: {signUpData: SignupType, setSignUpData:React.Dispatch<React.SetStateAction<SignupType>>}) {
  return (
    <>
    <main className='grid place-items-center'>
      <div className='text-xl py-3 font-semibold w-[280px]'>
        비밀번호를 입력해주세요.
        <p className='text-sm mt-3 font-medium'>숫자,영어를 포함하여 8~12글자로 
        <br />작성해주세요.</p>
      </div>
      <div>
        <p>비밀번호</p>
        <input type="text" placeholder='비밀번호를 입력해주세요.' className='w-[280px] rounded-lg h-10'/>
      </div>
      <div>
        <p>비밀번호 확인</p>
        <input type="text" placeholder='비밀번호를 한 번 더 입력해주세요.' className='w-[280px] rounded-lg h-10'/>
      </div>
    </main>
    </>
  )
}

export default PwInput