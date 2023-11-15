import { SignupType } from '@/types/SignupType'
import { useRouter } from 'next/navigation'
import React, { SetStateAction } from 'react'
import Swal from 'sweetalert2';


function JoinButton({active, setActive, signUpData, setSignUpData} : 
  {active:number, setActive:React.Dispatch<SetStateAction<number>>, signUpData:SignupType, setSignUpData:React.Dispatch<React.SetStateAction<SignupType>>}) {

    const router=useRouter()
    const maxTabs = 4;

    interface ErrorSignupType{
      userId : string, 
      userPassword : string,
      checkPassword :string,
      phoneNumber : string,
    }

    interface postSingupType{
      userId : string, 
      userPassword : string,
      phoneNumber : string,
    }

/*     const handleSignupFetch= async ()=>{
      let errText:ErrorSignupType={
        userId : "", 
        userPassword : "",
        checkPassword :"",
        phoneNumber : "",
      }
    }

    const handleNext = () => {
      if (active < maxTabs) {
        setActive(active + 1);
      } else {router.push("/moa-login")}
    }; */

    // IdInput 컴포넌트에서 userId를 업데이트하는 함수
const updateUserId = (newUserId: string) => {
  setSignUpData((prevData) => ({ ...prevData, userId: newUserId }));
};

// PwInput 컴포넌트에서 userPassword를 업데이트하는 함수
const updateUserPassword = (newPassword: string) => {
  setSignUpData((prevData) => ({ ...prevData, userPassword: newPassword }));
};

// PhoneCert 컴포넌트에서 phoneNumber를 업데이트하는 함수
const updatePhoneNumber = (newPhoneNumber: string) => {
  setSignUpData((prevData) => ({ ...prevData, phoneNumber: newPhoneNumber }));
};

// FormArea 컴포넌트에서 필요한 데이터를 업데이트하는 함수 (예시)
const updateFormData = (newData: any) => {
  setSignUpData((prevData) => ({ ...prevData, additionalData: newData }));
};



// JoinButton 컴포넌트에서 사용하는 handleClick 함수
const handleClick = () => {
  if (active < maxTabs) {
    // 각 단계에 따라 필요한 데이터 업데이트
    if (active === 1) {
      //TODO 이부분 살리기
/*       if (!signUpData.idChecked) {
        Swal.fire({
          icon: "warning",
          title: "경고",
          text: "아이디 중복 확인을 해주세요.",
        });
        return; // 중복 확인이 되지 않았다면 더 진행하지 않음
      } */
      updateUserId("newUserId");
    } else if (active === 2) {
      updateUserPassword("newPassword");
    } else if (active === 3) {
      updatePhoneNumber("newPhoneNumber");
    } else if (active === 4) {
      updateFormData("newData");
    }

    // 다음 단계로 이동
    setActive(active + 1);
  } else {
    router.push("/moa-login");
  }
};


  return (
    <>
      <div className='grid place-items-center bg-white'>
        <button className='h-[44px] w-[300px] bg-[#4338ca] rounded-2xl grid place-items-center text-white font-semibold'
        onClick={
          handleClick
        }>
          다음
        </button>
      </div>
    </>
  )
}

export default JoinButton