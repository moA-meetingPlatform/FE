'use client'

import React, { useState } from 'react'
import ButtonCircle from "@/components/Button/ButtonCircle";
import Input from "@/components/Input/Input";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import CertTimer from './CertTimer';


interface PhoneInputProps {
  // 다른 프로퍼티 정의
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
}

function PhoneInput(props: PhoneInputProps) {

  // const { setRemainingTime } = props;

  const [verify, setVerify] = useState<any>(false)
  const [remainingTime, setRemainingTime] = useState<any>(180);

  const handleResend = () => {
    if (verify) { // 인증번호 재전송을 누를 때 verify를 false로 설정
    setRemainingTime(180);
    } // 인증번호 재전송을 누를 때 remainingTime을 180으로 초기화
  };

  return (
    <>
    <main>

    <div className='w-[280px]'>
        <div className='flex justify-between'>
          <select title="휴대전화 통신사 선택" className='w-28'>
              <option value="01"> SKT </option>
              <option value="02"> KT </option>
              <option value="03"> LG U+ </option>
              <option value="04"> SKT 알뜰폰 </option>
              <option value="05"> KT 알뜰폰 </option>
              <option value="06"> LG U+ 알뜰폰 </option>
          </select>
          <span>
          <input id="phone" name='phone' maxLength={11} type="tel"
              placeholder='-없이 번호 입력' className='w-full ml-3 border-0 border-b-2'
              // onChange={(e) => handleOnChange(e, certData, setCertData)}
              />
          </span>
        </div>
      </div>


      <div className='grid place-items-center'>
        <div className='flex w-[290px] justify-end'>
{/*           <button className={verify ? "bg-[#eef2ff] w-32 h-10 rounded-3xl font-semibold mt-3" : "bg-[#4338ca] text-white w-32 h-10 rounded-3xl font-semibold mt-3"}
          onClick={() => {setVerify(true);
          if(!verify) {
            setRemainingTime(180);
          }}}
              onClick={(e) => {
                  handleLocalStorage(certData.userName, certData.phone, certData.birth);
                  handleCertification();
              }}>{verify ? "인증번호 재전송" : "인증번호 보내기"}
          </button> */}

          <button
          className={
            verify
              ? "bg-[#eef2ff] w-32 h-10 rounded-3xl font-semibold mt-3"
              : "bg-[#4338ca] text-white w-32 h-10 rounded-3xl font-semibold mt-3"
          }
          onClick={() => {
            setVerify(true);
              handleResend();
/*             if (!verify) {
              setRemainingTime(10);
            }
            setVerify(true); */
            
          }}
        >
        {verify ? "인증번호 재전송" : "인증번호 보내기"}
        </button>
        </div>
      </div>

    {
      verify &&
/*       <div className='grid place-items-center'>
        <p>3분 이내에 입력해주세요.</p>
        <div className='flex gap-3'>
        <input type="text" className='rounded-xl w-40'/>
        <button className='border px-2 rounded-lg bg-[#4338ca] font-semibold text-white'>확인</button>
        </div>
 */
        <div>
          <div className='grid place-items-center mt-3'>
            <CertTimer verify={verify} remainingTime={remainingTime} setRemainingTime={setRemainingTime}/>
          </div>

        <form className="mt-5 mx-3 relative max-w-sm">
          <Input
            required
            aria-required
            placeholder="인증번호 입력"
            type="number"
          />
          <ButtonCircle
            type="submit"
            className="absolute transform top-1/2 -translate-y-1/2 end-1 dark:bg-neutral-300 dark:text-black"
          >
            <ArrowRightIcon className="w-5 h-5 rtl:rotate-180" />
          </ButtonCircle>
        </form>
        </div>
    }
    </main>
    </>
  )
}

export default PhoneInput