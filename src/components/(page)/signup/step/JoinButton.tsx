import { SignupType } from '@/types/SignupType'
import { useRouter } from 'next/navigation'
import React, { SetStateAction } from 'react'

function JoinButton({active, setActive, signUpData, setSignUpData} : 
  {active:number, setActive:React.Dispatch<SetStateAction<number>>, signUpData:SignupType, setSignUpData:React.Dispatch<React.SetStateAction<SignupType>>}) {

    const router=useRouter()

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

    const handleSignupFetch= async ()=>{
      let errText:ErrorSignupType={
        userId : "", 
        userPassword : "",
        checkPassword :"",
        phoneNumber : "",
      }
    }

  return (
    <>
      <div className='grid place-items-center mt-3'>
        <button className='h-[44px] w-[300px] bg-[#4338ca] rounded-2xl grid place-items-center text-white font-semibold'
        onClick={
/*           active===3 ? ()=>router.push('/login')
          :
          active===2 ? handleSignupFetch
          :
          active===1 ? handleSignupFetch
          : */
          ()=>setActive(active +1)
        }>
          다음
        </button>
      </div>
    </>
  )
}

export default JoinButton