'use client'

import { SignupType } from '@/types/SignupType'
import { useDisclosure } from '@nextui-org/react';
import React, { use, useRef, useState } from 'react'

interface IdInputProps {
  signUpData: SignupType;
  setSignUpData: React.Dispatch<React.SetStateAction<SignupType>>;
  onIdCheck: (isChecked: boolean) => void; // 추가: 중복 확인 결과 전달
}

function IdInput({ signUpData, setSignUpData, onIdCheck }: IdInputProps) {

  const [error, setError] = useState<string | null>(null);

  const handleOnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target;

        // 유효성 검사 (예시: 이메일 형식)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          setError('유효한 이메일 주소를 입력하세요.');
        } else {
          setError(null);
        }

    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  }

  //   if( name === "userId"){
  //     // console.log('111',name,value);
  //     setSignUpData({
  //       ...signUpData,
  //       [name]:value
  //     })
  //   } else {
  //     // console.log('222',name,value);
  //     setSignUpData({
  //       ...signUpData,
  //       [name]:value
  //     })
  //   }
  // } 

  const [idChecked, setIdChecked] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const loginIdRef = useRef<HTMLInputElement>(null);

  
/*   const handleSignUp = async () => {
    if (!idChecked) {
        setModalContent("아이디 중복 확인을 해주세요.");
        onOpen();
        loginIdRef.current?.focus();  // 아이디 입력 필드에 포커스
        return;
    } */

    const checkId = async () => {
      try {
          const response = await fetch(`https://moa-backend.duckdns.org/user/id-check?loginId=${signUpData.loginId}`);
          const data = await response.json();
          
          if (data.success) {
              setModalContent("입력하신 아이디는 사용이 가능 합니다.");
              setIdChecked(true);  // 아이디 중복 확인 완료
              onIdCheck(true); // 중복확인 전달
          } else {
              setModalContent("입력하신 아이디는 사용이 불가능 합니다.");
              setIdChecked(false); // 아이디 중복 확인이 되지 않음
              onIdCheck(true);} // 중복확인 전달
      } catch (error) {
          console.error("Error sending POST request:", error);
          setModalContent("ID 중복 확인 중 오류가 발생했습니다. 다시 시도해주세요.");
          setIdChecked(false);  // 아이디 중복 확인이 되지 않음
          onIdCheck(false);
      }
      onOpen();
  }


  return (
    <>
    <main className='grid place-items-center mb-40'>
      <div className='text-xl py-3 font-semibold'>
        이메일을 입력해주세요.
        <p className='text-sm mt-3 font-medium'>자주 쓰는 이메일을 사용하는 것이 좋습니다.</p>
      </div>
      <div>
        <input 
        name='userId' 
        onChange={handleOnChange} 
        type="text" 
        placeholder='example@moA.com' 
        className='rounded-lg h-10 w-[280px]'/>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}

      <div className='flex w-[290px] justify-end'>
      <button className='bg-[#4338ca] text-white w-32 h-10 rounded-3xl font-semibold mt-5'
      onChange={checkId}>중복확인</button>
      </div>
    </main>
    </>
  )
}

export default IdInput