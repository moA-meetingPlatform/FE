import { SignupType } from '@/types/SignupType'
import React from 'react'

function PhoneCert(props: {signUpData: SignupType, setSignUpData:React.Dispatch<React.SetStateAction<SignupType>>}) {

  const { signUpData, setSignUpData } = props;
  return (
    <>
    <main className='mb-40'>
      <div className='grid place-items-center'>
      <div className='text-xl py-3 font-semibold w-[280px]'>
        전화번호를 인증해 주세요.
        <p className='text-sm mt-3 font-medium'>본인명의의 휴대전화번호를 입력해주세요. </p>
      </div>

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
      </div>

      <div className='grid place-items-center'>
        <div className='flex w-[290px] justify-end'>
          <button className='bg-[#eef2ff] w-32 h-10 rounded-3xl font-semibold mt-3'
/*               onClick={(e) => {
                  handleLocalStorage(certData.userName, certData.phone, certData.birth);
                  handleCertification();
              }} */> 인증번호 요청
          </button>
        </div>
      </div>
    </main>
    </>
  )
}

export default PhoneCert