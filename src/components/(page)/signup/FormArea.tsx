'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './FormArea.module.css'
import { SignUpFormDataType } from '@/types/userDataType'
import { useRouter, useSearchParams } from 'next/navigation';
import PublicModal from '@/components/(widget)/modal/Modal';
import { useDisclosure } from "@nextui-org/react";
import { DaumAddressType } from '@/types/DaumAddressType';
import PostCodeDaum from '@/components/(widget)/post/PostCodeDaum';


/* interface FormAreaProps {
  url: string;
  setUrl: (newUrl: string) => void;
  updateQueryParams: any;  // Ideally, provide a more specific type than 'any'
} */

export default function FormArea() {
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

    const isClient = typeof window !== 'undefined';
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [modalContent, setModalContent] = useState<string>("");
    const [isView, setIsView] = useState<boolean>(false);
    const [address, setAddress] = useState<DaumAddressType>();
    const [idChecked, setIdChecked] = useState<boolean>(false);
    const loginIdRef = useRef<HTMLInputElement>(null);
    // form 기본값
    const [signupData, setSignupData] = useState<SignUpFormDataType>({
        loginId: '',
        password: '',
        userName: '',
        phone: '',
        zoneCode: '',
        address: '',
        detailAddress: '',
        birth: '',
        nickName: '',
        agree3: false,
        agree4: false,
        agree5: false,
        // agree6: false
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
        if (!idChecked) {
            setModalContent("아이디 중복 확인을 해주세요.");
            onOpen();
            loginIdRef.current?.focus();  // 아이디 입력 필드에 포커스
            return;
        }

        
        const {
            loginId,
            userName,
            password,
            phone,
            zoneCode,
            address,
            detailAddress,
            birth,
            nickName,
            agree3: agreeEmail,
            agree4: letter,
            agree5: dm,
            // agree6: tm
        } = signupData;

        const fullAddress = zoneCode+ "," + address + "," + detailAddress;

        try {
            const response = await fetch('http://localhost:3000/api/v1/user/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userSignUpIn: {
                        loginId,
                        userName,
                        email: "",
                        password,
                        phone,
                        address: fullAddress,
                        birth,
                        nickName
                    },
                    agreeAdvertiseIn: {
/*                         optionOne,
                        optionTwo, */
                        agreeEmail,
                        letter,
                        dm,
                        // tm
                    }
                })
            })
            const data = await response.json();
            if (response){
                localStorage.setItem('tempLoginId', data.result.loginId.toString());
                localStorage.setItem('tempAddress', data.result.address.toString());
                localStorage.setItem('tempEmail', data.result.email.toString());
                localStorage.setItem('tempBirth', data.result.birth.toString());
                localStorage.setItem('tempNickName', data.result.nickName.toString());
                localStorage.setItem('tempAgreeEmail', data.result.agreeEmail.toString());
                localStorage.setItem('tempLetter', data.result.letter.toString());
                localStorage.setItem('tempDm', data.result.dm.toString());
                // localStorage.setItem('tempTm', data.result.tm.toString());
            }
            router.push('/join/success')
        } catch (error) {
            console.error("Error sending POST request:", error);
        }
    }

    const checkId = async () => {
        try {
            const response = await fetch(`https://localhost:3000/api/v1/user/id-check?loginId=${signupData.loginId}`);
            const data = await response.json();
            
            if (data.success) {
                setModalContent("입력하신 아이디는 사용이 가능 합니다.");
                setIdChecked(true);  // 아이디 중복 확인 완료
            } else {
                setModalContent("입력하신 아이디는 사용이 불가능 합니다.");
                setIdChecked(false); // 아이디 중복 확인이 되지 않음
            }
        } catch (error) {
            console.error("Error sending POST request:", error);
            setModalContent("ID 중복 확인 중 오류가 발생했습니다. 다시 시도해주세요.");
            setIdChecked(false);  // 아이디 중복 확인이 되지 않음
        }
        onOpen();
    }
    

    const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setSignupData(prevData => ({
            ...prevData,
            agree3: checked,
            agree4: checked,
            agree5: checked,
            // agree6: checked
        }));
    }

    const isAllChecked = (): boolean => {
        return !!signupData.agree3 && !!signupData.agree4 && !!signupData.agree5/* && !!signupData.agree6*/;
    }
    

    useEffect(() => {
        // Logic for the first useEffect
        const tempName = isClient && localStorage.getItem('tempName');
        const tempPhone = isClient && localStorage.getItem('tempPhone');
        // const tempagree2 = isClient && localStorage.getItem('tempagree2') === 'true';
        const tempagree3 = isClient && localStorage.getItem('tempagree3') === 'true';
        const tempagree4 = isClient && localStorage.getItem('tempagree4') === 'true';
        const tempagree5 = isClient && localStorage.getItem('tempagree5') === 'true';
        // const tempagree6 = isClient && localStorage.getItem('tempagree6') === 'true';

        if (tempName && tempPhone) {
            setSignupData({
                ...signupData,
                userName: tempName,
                phone: tempPhone,
            })
        }
        setSignupData(prevData => ({
            ...prevData,
/*             agree1: tempagree1,
            agree2: tempagree2, */
            agree3: tempagree3,
            agree4: tempagree4,
            agree5: tempagree5,
            // agree6: tempagree6
        }));

        // Logic for the second useEffect
        if (address) {
            
            setSignupData({
                ...signupData,
                zoneCode: address.zonecode,
                address: address.address,
            });
        }
    }, [address]);

    return (
        <div>
            <p></p>
            <div>
                <div>
                    <PublicModal isOpen={isOpen} onOpenChange={onOpenChange} content={modalContent} />
                </div>
            </div>
            <div className={styles.cnt_box0}>
                <div className={`${styles.form_box} ${styles.required}`}>
                    <p className={styles.tit}> 아이디<span className="hidden">필수항목</span></p>
                    <div className={styles.input_btn_box}>
                        <div className={styles.input_box}>
                            <input type="text" id="loginId" name='loginId'
                                placeholder='영문, 숫자 6~20자리 입력해주세요.' title="회원 가입을 위한 아이디 입력"
                                onChange={handleOnChange} 
                                  ref={loginIdRef}  />
                        </div>
                        <div className={styles.btn_box}>
                            <button className={styles.btn2} onClick={checkId} > 중복확인 </button>
                        </div>
                    </div>
                    <p className={styles.error_txt}> 아이디 형식에 맞게 입력해주세요. </p>
                </div>
                <div className={`${styles.form_box} ${styles.required}`}>
                    <p className={styles.tit}> 비밀번호 <span className="hidden">필수항목</span></p>
                    <div className={styles.input_box}>
                        <input type="password" id="password" name='password'
                            placeholder='영문, 숫자, 특수문자 중 2가지 이상을 조합하여 8-20자리로 입력해 주세요.' title="회원 가입을 위한 비밀번호 입력"
                            onChange={handleOnChange} />
                    </div>
                    <p className={styles.error_txt}> 비밀번호 형식에 맞게 입력해주세요. </p>
                </div>
                <div className={`${styles.form_box} ${styles.required}`}>
                    <p className={styles.tit}> 비밀번호 확인
                        <span className="hidden">필수항목</span></p>
                    <div className={styles.input_box}>
                        <input type="password" id="pwck" name='pwck' placeholder='입력하신 비밀번호를 다시 한번 입력해주세요.' />
                    </div>
                    <p className={styles.error_txt}> 비밀번호가 일치하지 않습니다. </p>
                </div>
                <div className={`${styles.form_box} ${styles.required}`}>
                    <p className={styles.tit}> 닉네임 <span className="hidden">필수항목</span></p>
                    <div className={styles.input_box}>
                        <input type="nickName" id="nickName" name='nickName'
                            placeholder='3~10자리로 입력해주세요.' title="회원 가입을 위한 닉네임 입력"
                            onChange={handleOnChange} />
                    </div>
                    <p className={styles.error_txt}> 비밀번호 형식에 맞게 입력해주세요. </p>
                </div>
                <div className={`${styles.form_box} ${styles.required}`}>
                    <p className={styles.tit}> 이름 <span className="hidden">필수항목</span></p>
                    <div className={styles.input_box}>
                        <input type="text" id="userName" name='userName' title="이름" value={signupData.userName.toString()} readOnly
                            className={styles.readonly_bg} />
                    </div>
                </div>
                <div className={`${styles.form_box} ${styles.required}`}>
                    <p className={styles.tit}> 생년월일 <span className="hidden">필수항목</span></p>
                    <div className={styles.input_box}>
                        <input type="text" id="birth" name='birth' title="생년월일" value={signupData.phone.toString()} readOnly
                        //TODO: 생년월일 받아오기
                            className={styles.readonly_bg} />
                    </div>
                </div>
                <div className={`${styles.form_box} ${styles.required}`}>
                    <p className={styles.tit}> 휴대폰번호 <span className="hidden">필수항목</span></p>
                    <div className={styles.input_box}>
                        <input type="text" id="phone" name='phone' title="휴대폰번호" value={signupData.phone.toString()} readOnly className={styles.readonly_bg} />
                    </div>
                </div>
                <div className={`${styles.form_box} ${styles.required}`}>
                    <p className={styles.tit}> 자택주소 <span className="hidden">필수항목</span></p>
                    <div className={styles.input_address_box}>
                        <div className={`${styles.input_btn_box} ${styles.w_type2}`}>
                            <div className={styles.input_box}>
                                <input type="text" id="zoneCode" name='zoneCode' value={signupData.zoneCode.toString()} readOnly placeholder='우편번호' />
                            </div>
                            <div className={styles.btn_box}>
                                <div className={styles.btn2}> 
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
                </div>
            </div>
            <div className={styles.terms_agree_box}>
                <div className={styles.agree_form_box}>
{/*                     <ul className={`${styles.agree_list} ${styles.btn_type0} ${styles.txt_type0}`}>
                        <li className={`${styles.agree_form} ${styles.join_agree}`}>
                            <div className={styles.chk_box}>
                                <input type="checkbox" id="terms0" name='agree1' checked={!!signupData.agree1} onChange={handleOnChange} />
                                <label htmlFor="terms0">[선택] 혜택제공 및 분석을 위한 개인정보 수집 및 이용 동의</label>
                            </div>
                            <button className={styles.agree_show}><span>내용보기</span></button>
                        </li>
                        <li className={`${styles.agree_form} ${styles.join_agree}`}>
                            <div className={styles.chk_box}>
                                <input type="checkbox" id="terms1" name='agree2' checked={!!signupData.agree2} onChange={handleOnChange} />
                                <label htmlFor="terms1">[선택] 이마트/신세계 공동 개인정보 수집 및 이용 동의</label>
                            </div>
                            <button className={styles.agree_show}><span>내용보기</span></button>
                        </li>
                    </ul> */}
                    <div className={styles.agree_sub_box}>
                        <p className={styles.add_info_agree_tit}> 모아 광고정보 수신동의 </p>
                        <div className={`${styles.chk_box} ${styles.simple}`}>
                        <input id="receiveAllspoint" type="checkbox" value="0" checked={isAllChecked()} onChange={handleAllCheck} />
                            <label htmlFor="receiveAllspoint">전체동의</label>
                        </div>
                        <div className={`${styles.chk_group_box} ${styles.col_f}`}>
                            <div className={`${styles.chk_box} ${styles.simple}`}>
                                <input id="receivespoint0" type="checkbox" name='agree3' checked={!!signupData.agree3} onChange={handleOnChange} />
                                <label htmlFor="receivespoint0">이메일</label>
                            </div>
                            <div className={`${styles.chk_box} ${styles.simple}`}>
                                <input id="receivespoint1" type="checkbox" name='agree4' checked={!!signupData.agree4} onChange={handleOnChange} />
                                <label htmlFor="receivespoint1">문자</label>
                            </div>
                            <div className={`${styles.chk_box} ${styles.simple}`}>
                                <input id="receivespoint2" type="checkbox" name='agree5' checked={!!signupData.agree5} onChange={handleOnChange} />
                                <label htmlFor="receivespoint2">DM</label>
                            </div>
{/*                             <div className={`${styles.chk_box} ${styles.simple}`}>
                                <input id="receivespoint3" type="checkbox" name='agree6' checked={!!signupData.agree6} onChange={handleOnChange} />
                                <label htmlFor="receivespoint3">TM</label>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.add_info_agree_txt}>
                <p>
                  가입을 진행할 경우, 서비스약관 및 개인정보처리방침에 동의한 것으로 간주합니다.
                </p>
                <p>
                    <span className='text-red-600'>*</span>push 알림을 동의할 시, 직장 인증완료 알림을 받을 수 있습니다.
                </p>
                <p className='indent-1'>
                    (push 알림을 받으시려면 어플리케이션 권한 설정에 동의하셔야 합니다.)
                </p>
            </div>
            <div className={styles.cnt_box2}>
                <div className={styles.btn_box}>
                    <button className={styles.btn_primary}
                        onClick={() => {
                            
                            handleSignUp();
                            
                        }}>확인</button>
                </div>
            </div>
            <div className={styles.notice_box}>
                <h3 className={styles.tit}>[유의사항]</h3>
                <ul className={styles.list_cnt}>
                    <li>아이디는 영문 소문자, 숫자를 조합하여 6-20자리로 입력해 주세요.</li>
                    <li>비밀번호는 영문 대/소문자, 숫자, 특수문자 중 3가지 이상을 조합하여 8-20자리로 입력해 주세요.</li>
                    <li>아이디와 동일한 비밀번호는 사용하실 수 없습니다.</li>
                    <li>생년월일, 전화번호와 동일하거나 일부를 포함한 비밀번호는 사용하실 수 없습니다.</li>
                    <li>3글자 이상의 동일한 숫자/문자 또는 연속된 숫자/문자, 키보드 상 연속된 배열의 문자는 입력하실 수 없습니다.</li>
                    <li>개명하신 회원님의 경우 통신사 등에 등록된 본인인증 정보가 개명하신 이름으로 바뀐 이후부터 자동으로 변경됩니다.</li>
                    <li>본인인증을 통해 확인된 정보는 수정하실 수 없습니다.</li>
                </ul>
            </div>
        </div>
    )
}
