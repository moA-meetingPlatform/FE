import { SignupType } from '@/types/SignupType'
import { useRouter } from 'next/navigation'
import React, { SetStateAction, useEffect, useState } from 'react'
import { useSearchParam } from 'react-use';
import Swal from 'sweetalert2';


function JoinButton({active, setActive, signUpData, setSignUpData, stepId } : 
  {active:any, setActive:React.Dispatch<SetStateAction<any>>, signUpData:SignupType, setSignUpData:React.Dispatch<React.SetStateAction<SignupType>>, stepId:number}) {

  const router = useRouter();
  console.log(active)
  const nextStep = () => {
    if(active[stepId-1]?.status){
      router.push(`/signup?step=${stepId+1}`)
    }else{
      Swal.fire({
        text: `입력내용을 확인해주세요.`,
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          container: "my-swal",
        },
      });
    }
  }

  return (
    <>
      <div className='w-full bg-white p-2 flex justify-between fixed bottom-0 gap-1 text-sm'>
        {
          stepId > 1 ? 
            <button className='w-[30%] h-[44px] bg-[gray] grid place-items-center text-white font-semibold rounded-xl'
            onClick={()=>router.push(`/signup?step=${stepId-1}`)}
          >
            이전
          </button>
          : null
        }
        
        <button className={`w-full h-[44px] grid place-items-center text-white font-semibold rounded-xl ${active[stepId-1]?.status ? 'bg-[#4338ca]' : 'bg-[#4338ca55] cursor-not-allowed'}`}
          onClick={
            nextStep
          }
        >
          다음
        </button>
      </div>
      </>
  )
}

export default JoinButton;