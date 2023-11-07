import { SignupType } from '@/types/SignupType'
import React, { useState } from 'react'

function IdInput(props: {signUpData: SignupType, setSignUpData:React.Dispatch<React.SetStateAction<SignupType>>}) {

  const { signUpData, setSignUpData } = props;

  const handleOnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target;

    if( name === "userId"){
      // console.log('111',name,value);
      setSignUpData({
        ...signUpData,
        [name]:value
      })
    } else {
      // console.log('222',name,value);
      setSignUpData({
        ...signUpData,
        [name]:value
      })
      
    }
  } 

  return (
    <>
    <main className='grid place-items-center'>
      <div className='text-xl py-3 font-semibold'>
        이메일을 입력해주세요.
        <p className='text-sm mt-3 font-medium'>자주 쓰는 이메일을 사용하는 것이 좋습니다.</p>
      </div>
      <div>
        <input name='userId' onChange={handleOnChange} type="text" placeholder='example@moA.com' className='rounded-lg h-10 w-[280px]'/>
      </div>
    </main>
    </>
  )
}

export default IdInput