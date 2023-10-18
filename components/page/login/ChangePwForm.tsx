'use client'

import React, { useState } from 'react'
import styles from './ChangePwForm.module.css'
import { ChangePWFormDataType } from '@/types/userDataType'
import { useDisclosure } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import PublicModal from '@/components/widget/modal/Modal';



export default function ChangePwForm() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [modalContent, setModalContent] = useState<string>("");
    const [routePath, setRoutePath] = useState<string>("");
    const session = useSession()
    
    
    const [newPw, setNewPw] = useState<ChangePWFormDataType>({
        password: '',
        newPassword: '',
        newPasswordCk: '',
    })
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewPw({
            ...newPw,
            [name]: value
        });
    }

    
/*     const newPassword = async () => {
        try{
            if (newPw.newPassword !== newPw.newPasswordCk) {
                setModalContent("비밀번호가 일치하지 않습니다.");
                setRoutePath("/member/changePwd");
                onOpen();
            }
            if (!session.data?.user.token) {
                console.error("Token is not provided.");
                return;
            }
            const res = await fetch('https://smilekarina.duckdns.org/api/v1/myinfo/changePwd', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.data.user.token}`
                },
                body: JSON.stringify(
                    {
                        loginId: null,
                        oldPwd: newPw.password,
                        newPwd: newPw.newPassword
                    }
                ),
            });
            const data = await res.json();
            
            if (data.success === true) {
                setModalContent("비밀번호가 변경되었습니다.");
                setRoutePath("/");
                onOpen();
                
            }
            else {
                setModalContent("비밀번호 변경에 실패하였습니다.");
                setRoutePath("/member/changePwd");
                onOpen();
            }
        }
        catch(e) {
            console.error("Error sending PUT request:", e);
        }
        
    } */
    return (
        <div>
            <div>
                <PublicModal isOpen={isOpen} onOpenChange={onOpenChange} content={modalContent} routePath={routePath} />
            </div>
            <div className={`${styles.cnt_box0}`}>
                <div className={`${styles.form_container}`}>
                    <div className={`${styles.form_box}`}>
                        <p className={`${styles.tit}`}> 신규 비밀번호
                        </p>
                        <div className={`${styles.input_box}`}>
                            
                            <input 
                                id="newPassword" 
                                name='newPassword' 
                                type="password" 
                                placeholder='신규 비밀번호' 
                                minLength={8} 
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className={`${styles.form_box}`}>
                        <p className={`${styles.tit}`}> 신규 비밀번호 확인 </p>
                        <div className={`${styles.input_box}`}>
                            
                            <input 
                                id="newPasswordCk" 
                                name='newPasswordCk' 
                                type="password" 
                                placeholder='신규 비밀번호를 입력해주세요.' 
                                minLength={8} 
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                </div>
                <div className={`${styles.btn_box}`}>
                    <button /* onClick={newPassword} */ className={`${styles.btn_primary}`}>확인</button>
                </div>
            </div>
            <div className={`${styles.notice_box}`}>
                <h3 className={`${styles.tit}`}>[유의사항]</h3>
                <ul className={`${styles.list_cnt}`}>
                    <li>영문 대/소문자, 숫자, 특수문자 중 3가지 이상을 조합하여 8-20자리로 입력해 주세요.</li>
                    <li>직전에 사용한 비밀번호는 사용하실 수 없습니다.</li>
                    <li>아이디와 동일한 비밀번호는 사용하실 수 없습니다.</li>
                    <li>생년월일, 전화번호와 동일하거나 일부를 포함한 비밀번호는 사용하실 수 없습니다.</li>
                    <li>3글자 이상의 동일한 숫자/문자 또는 연속된 숫자/문자, 키보드 상 연속된 배열의 문자는 입력하실 수 없습니다.</li>
                    <li>비밀번호 변경 시 신세계포인트 통합ID로 로그인하는 모든 신세계 그룹사 사이트의 비밀번호가 동일하게 변경됩니다. (최대 10분 소요)</li>
                    </ul>
                    </div>
        </div>
    )
}
