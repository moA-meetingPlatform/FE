'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './FormArea.module.css'
import { SignUpFormDataType } from '@/types/userDataType'
import { useRouter } from 'next/navigation'
import PublicModal from '@/components/(widget)/modal/Modal';
import { useDisclosure } from "@nextui-org/react";
import { DaumAddressType } from '@/types/DaumAddressType';
import { SignupType } from '@/types/SignupType';


export default function FormArea(props: {signUpData: SignupType, setSignUpData:React.Dispatch<React.SetStateAction<SignupType>>}) {

  const { signUpData, setSignUpData } = props;

    const isClient = typeof window !== 'undefined';
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [modalContent, setModalContent] = useState<string>("");
    const [isView, setIsView] = useState<boolean>(false);
    const [address, setAddress] = useState<DaumAddressType>();

    // form 기본값
    const [signupData, setSignupData] = useState<SignUpFormDataType>({
        name: '', 
        birthdate: '',
        phoneNumber: '',
        nickname: '',
        gender: 'M',
        agree1: false,
        agree2: false,
        agree3: false,
    })

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setSignupData({
                ...signupData,
                [name]: checked
            });
        } else {
            setSignupData({
                ...signupData,
                [name]: value
            });
        }
    }

        const handleSignUp = async () => {
        const {
            name,
            phoneNumber,
            birthdate,
            nickname,
            gender,
            agree1: agreeEmail,
            agree2: sms,
            agree3: push,
        } = signupData;
        // const fullAddress = zoneCode+ "," + address + "," + detailAddress;

      // 유효성 검사 로직 추가
    if (!name || !phoneNumber || !birthdate || !nickname || !gender) {
      setModalContent("필수 항목을 모두 입력해주세요.");
      onOpen();
      return;
  }

/*         try {
            const response = await fetch('http://localhost:3000/api/v1/user/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userSignUpIn: {
                        name,
                        email: "",
                        phoneNumber,
                        birthdate,
                        nickname,
                        gender
                    },
                    agreeAdvertiseIn: {
                        agreeEmail,
                        sms,
                        push,
                    }
                })
            })


            const data = await response.json();
            if (response){
                localStorage.setItem('tempName', data.result.name.toString());
                localStorage.setItem('tempGender', data.result.gender.toString());
                localStorage.setItem('tempNickname', data.result.nickname.toString());
                localStorage.setItem('tempBirthdate', data.result.birthdate.toString());
                localStorage.setItem('tempPhonenumber', data.result.phoneNumber.toString());
                localStorage.setItem('tempAgreeEmail', data.result.agreeEmail.toString());
                localStorage.setItem('tempSms', data.result.sms.toString());
                localStorage.setItem('temPush', data.result.push.toString());
            }
            router.push('/join')
        } catch (error) {
            console.error("Error sending POST request:", error);
        } */
  }

    const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setSignupData(prevData => ({
            ...prevData,
            agree1: checked,
            agree2: checked,
            agree3: checked,
            // agree6: checked
        }));
    }

    const isAllChecked = (): boolean => {
        return !!signupData.agree1 && !!signupData.agree2 && !!signupData.agree3/* && !!signupData.agree6*/;
    }
    

    useEffect(() => {
        // Logic for the first useEffect
        const tempName = isClient && localStorage.getItem('tempName');
        const tempphoneNumber = isClient && localStorage.getItem('tempphoneNumber');
        // const tempagree2 = isClient && localStorage.getItem('tempagree2') === 'true';
        const tempagree1 = isClient && localStorage.getItem('tempagree1') === 'true';
        const tempagree2 = isClient && localStorage.getItem('tempagree2') === 'true';
        const tempagree3 = isClient && localStorage.getItem('tempagree3') === 'true';
        // const tempagree6 = isClient && localStorage.getItem('tempagree6') === 'true';

        if (tempName && tempphoneNumber) {
            setSignupData({
                ...signupData,
                name: tempName,
                phoneNumber: tempphoneNumber,
            })
        }
        setSignupData(prevData => ({
            ...prevData,
/*             agree1: tempagree1,
            agree2: tempagree2, */
            agree1: tempagree1,
            agree2: tempagree2,
            agree3: tempagree3,
            // agree6: tempagree6
        }));

        // Logic for the second useEffect
/*         if (address) {
            
            setSignupData({
                ...signupData,
                zoneCode: address.zonecode,
                address: address.address,
            });
        } */
    }, [address] );;

    return (
      <>
        <main className='grid place-items-center'>
          <div>
            <PublicModal isOpen={isOpen} onOpenChange={onOpenChange} content={modalContent} />
          </div>

          <div className='mt-5 tracking-tighter'>

            <div className='w-[290px] font-semibold'>
              <p className='text-xl leading-10'>정보를 입력하고</p>
              <p className='text-xl leading-10'><span className='text-[#4338ca]'>moA</span>의 <br />커뮤니티로 모여주세요!</p>
            </div>
              <div className={`mt-10 ${styles.form_box}`}>
                  <p className={styles.tit}> 이름 <span className="hidden">필수항목</span></p>
                  <div className={styles.input_box}>
                      <input type="text" id="name" name='name' title="이름" />
                  </div>
              </div>

              <div className='flex gap-3'>
                <div className={`${styles.form_box}`}>
                    <p className={styles.tit}> 성별 <span className="hidden">필수항목</span></p>
                      <select name="gender" id="gender">
                        <option value="M" deta-id="gender">남자</option>
                        <option value="F" deta-id="gender">여자</option>
                      </select>
                </div>

                <div className={`${styles.form_box}`}>
                    <p className={styles.tit}> 닉네임 <span className="hidden">필수항목</span></p>
                    <div className={styles.input_box}>
                        <input type="nickname" id="nickname" name='nickname'
                            placeholder='3~10자리로 입력' title="회원 가입을 위한 닉네임 입력"
                            onChange={handleOnChange} />
                    </div>
                    <p className={styles.error_txt}> 닉네임 형식에 맞게 입력해주세요. </p>
                </div>
              </div>

              <div className={`${styles.form_box}`}>
                  <p className={styles.tit}> 생년월일 <span className="hidden">필수항목</span></p>
                  <div className={styles.input_box}>
                      <input type="text" id="birthdate" name='birthdate' title="생년월일" placeholder='20231212와 같이 8자리로 입력'/>
                  </div>
              </div>

              <div className={`${styles.form_box}`}>
                  <p className={styles.tit}> 휴대폰번호 <span className="hidden">필수항목</span></p>
                  <div className={styles.input_box}>
                      <input type="text" id="phoneNumber" name='phoneNumber' title="휴대폰번호" />
                  </div>
              </div>


          </div>
          <div className='my-5'>
              <div className={styles.agree_form_box}>
                  <div className='border p-1 rounded-lg bg-[#eef2ff] w-[250px]'>
                    <p> 모아 광고정보 수신동의 </p>
                    <div className='mt-3'>
                      <input id="receiveAllspoint" type="checkbox" value="0" checked={isAllChecked()} onChange={handleAllCheck} className='rounded-sm'/>
                        <label htmlFor="receiveAllspoint" className='ml-2'>전체동의</label>
                      </div>

                      <div className='flex mt-3'>
                        <div>
                          <input id="receivespoint0" type="checkbox" name='agree1' checked={!!signupData.agree1} onChange={handleOnChange} className='rounded-sm'/>
                          <label htmlFor="receivespoint0" className='ml-2'>이메일</label>
                        </div>
                        <div className='ml-4'>
                          <input id="receivespoint1" type="checkbox" name='agree2' checked={!!signupData.agree2} onChange={handleOnChange} className='rounded-sm' />
                          <label htmlFor="receivespoint1" className='ml-2'>문자</label>
                        </div>
                        <div className='ml-4'>
                          <input id="receivespoint2" type="checkbox" name='agree3' checked={!!signupData.agree3} onChange={handleOnChange} className='rounded-sm' />
                          <label htmlFor="receivespoint2" className='ml-2'>push</label>
                        </div>
                      </div>
                  </div>
              </div>
          </div>

          <div className='text-xs tracking-tighter font-semibold text-[#767676]'>
            <p className='mb-2'>
              가입을 진행할 경우, 서비스약관 및 개인정보처리방침에 동의한 것으로 간주합니다.
            </p>
            <p>
              push 알림을 동의할 시, 직장 인증완료 알림을 받을 수 있습니다.
            </p>
            <p>
                (push 알림을 받으시려면 앱 권한 설정을 변경하셔야 합니다.)
            </p>
          </div>
          </main>
        </>
    )
}


/* //sequence부분
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const route = useRouter();
  const searchParams = useSearchParams()

  const [inputThemeCategoryId, setInputThemeCategoryId] = useState(searchParams.get('ThemeCategoryId') || '');
  const { url, setUrl, updateQueryParams } = props;

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handleNext = () => {
    const baseURL = 'http://localhost:3000'; // Adjust as needed

    const updatedUrl = updateQueryParams(baseURL, url, {
      ThemeCategoryId: inputThemeCategoryId,
    });
    setUrl(updatedUrl);
    route.push(updatedUrl);
  }; */

                /* 주소 정보 */
/*               <div className={`${styles.form_box} ${styles.required}`}>
                  <p className={styles.tit}> 자택주소 <span className="hidden">필수항목</span></p>
                  <div className={styles.input_address_box}>
                      <div className={`${styles.input_btn_box} ${styles.w_type2}`}>
                          <div className={styles.input_box}>
                              <input type="text" id="zoneCode" name='zoneCode' value={signupData.zoneCode.toString()} readOnly placeholder='우편번호' />
                          </div>
                          <div className={styles.btn_box}>
                              <div className='border rounded-xl h-[45px] leading-[45px] px-2 bg-[#4338ca] font-semibold text-white'> 
                              <PostCodeDaum isView={isView} setIsView={setIsView} setAddress={setAddress} /></div>
                          </div>
                      </div>
                      <div className={`${styles.input_box} mb-2`}>
                          <input type="text" id="address" name='address' value={signupData.address.toString()} readOnly placeholder='주소' />
                      </div>
                      <div className={styles.input_box} >
                          <input type="text" id="detailAddress" name='detailAddress' placeholder='상세주소' onChange={handleOnChange} />
                      </div>
                  </div>
              </div> */

/*               <div className={styles.btn_box}>
                  <button className='w-full mt-14 h-10 rounded-xl bg-[#4338ca] text-white'
                      onClick={() => {
                          handleSignUp();
                      }}>확인</button>
              </div> */