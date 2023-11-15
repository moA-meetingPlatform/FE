'use client'

import { SignupType } from '@/types/SignupType'
import React, { useState } from 'react'

function PwInput(props: {signUpData: SignupType, setSignUpData:React.Dispatch<React.SetStateAction<SignupType>>;}) {

  const { signUpData, setSignUpData } = props;
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);


  const handlePasswordChange = (value: string) => {
    // 유효성 검사 (숫자, 영어, 특수문자 포함, 8~12 글자)
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,12}$/;
    if (!passwordRegex.test(value)) {
      setPasswordError('숫자, 영어, 특수문자를 포함하여 8~12글자로 작성하세요.');
    } else {
      setPasswordError(null);
    }
  }

  const handleConfirmPasswordChange = (value: string) => {
    if (value !== signUpData.userPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError(null);
    }
  }


  const handleOnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value}=e.target;

    if (name === 'userPassword') {
      handlePasswordChange(value);
    } else if (name === 'checkPassword') {
      handleConfirmPasswordChange(value);
    }

    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  }
  
  return (
    <>
    <main className='grid place-items-center mb-40'>
      <div className='text-xl py-3 font-semibold'>
        비밀번호를 입력해주세요.
        <p className='text-sm mt-3 font-medium'>숫자,영어, 특수문자를 포함하여 8~12글자로 작성해주세요.</p>
      </div>
      <div>
        <p>비밀번호</p>
        <input 
        type="password"
        name="userPassword"
        placeholder='비밀번호를 입력해주세요.' 
        className='w-[280px] rounded-lg h-10'
        onChange={(e) => {
          handleOnChange(e);
          handlePasswordChange(e.target.value);
        }}
        />
      </div>
      {passwordError && (
          <p className="text-red-500 text-sm mt-2">{passwordError}</p>
        )}
      <div className='mt-10'>
        <p>비밀번호 확인</p>
        <input 
        type="password"
        name="checkPassword"
        placeholder='비밀번호를 한 번 더 입력해주세요.' 
        className='w-[280px] rounded-lg h-10'
        onChange={(e) => {
          handleOnChange(e);
          handleConfirmPasswordChange(e.target.value);
        }}
        />
      </div>
      {confirmPasswordError && (
          <p className="text-red-500 text-sm mt-2">{confirmPasswordError}</p>
        )}
    </main>
    </>
  )
}

export default PwInput