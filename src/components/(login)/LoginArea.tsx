'use client'

import React, { useEffect, useState } from 'react'
import styles from './LoginArea.module.css'
import Link from 'next/link';
import { LogInFormDataType } from '@/types/userDataType';
import { signIn, signOut } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import PublicModal from '../(widget)/modal/Modal';
import { useDisclosure } from '@nextui-org/react';

type CustomUser = {
  backendResponse?: any; // 또는 백엔드 응답의 구체적인 타입을 여기에 정의하실 수 있습니다.
}


export default function Loginarea() {
  const router = useRouter();
  const query = useSearchParams();
  const callBackUrl = query.get('callbackUrl');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalContent, setModalContent] = useState<string>("");


  const isClient = typeof window !== 'undefined';

  const [loginData, setLoginData] = useState<LogInFormDataType>({
    loginId: '',
    password: '',
    isAutoId: false,
    isAutoLogin: false
  });
  const [pwType, setPwType] = useState<boolean>(true);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'isAutoId') {
      if (e.target.checked) {
        handleLocalStorage(loginData.loginId);
      } else {
        // 체크박스가 해제되면 로컬 스토리지의 값도 삭제
        localStorage.removeItem('autoLogin');
      }
    }
    if (name === 'isAutoId' || name === 'isAutoLogin') {

      setLoginData({
        ...loginData,
        [name]: e.target.checked
      })
    } else {

      setLoginData({
        ...loginData,
        [name]: value
      })
    }
  }

  const handleLocalStorage = (loginId: String) => {
    localStorage.setItem('autoLogin', loginId.toString())
  }

  const handlePwType = () => {
    setPwType(!pwType)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const autoLogin = isClient && localStorage.getItem('autoLogin') || '';

      if (autoLogin) {
        setLoginData({
          ...loginData,
          loginId: autoLogin,
          isAutoId: true
        })
      }
    }
  }, [])

  const handleLogin = async () => {
    if (!loginData.loginId && !loginData.password) {
      setModalContent('아이디와 비밀번호를 입력해주세요.')
      onOpen();
      return;
    }
    if (!loginData.loginId) {
      setModalContent('아이디를 입력해주세요.')
      onOpen();
      return;
    }
    if (!loginData.password) {
      setModalContent('비밀번호를 입력해주세요.')
      onOpen();
      return;
    }

    // console.log(loginData)
    const result = await signIn('credentials', {
      loginId: loginData.loginId,
      password: loginData.password,
      redirect: false,
      callbackUrl: callBackUrl ? callBackUrl : '/'
    })
    
    if (result?.error) {
      setModalContent('아이디 또는 비밀번호를 확인해 주세요.');
      onOpen();
  } else {
      router.push(callBackUrl ? callBackUrl : '/')
  }


  };



  return (
    <div className={styles.login_input_area}>
      <div>
        <PublicModal isOpen={isOpen} onOpenChange={onOpenChange} content={modalContent}  />
      </div>
      <div className={styles.input_box}>
        <input id="loginId"
          name="loginId"
          type="text"
          placeholder="아이디"
          onChange={handleOnChange}
          defaultValue={loginData.loginId}
          title="로그인을 위해 아이디를 입력해주세요." />
      </div>
      <div className={styles.input_box}>
        <input id="password"
          name='password'
          type={pwType ? 'password' : 'text'}
          placeholder="비밀번호 (영문, 숫자, 특수문자 8~20자)"
          onChange={handleOnChange}
          title="로그인을 위해 비밀번호를 입력해주세요." />
        <button type="button" onClick={handlePwType}>
          <Link href="" id="pw00_btn" className={styles.ico_eye_slash}>비밀번호 보기</Link>
        </button>
      </div>
      <div className={`${styles.chk_group_box} ${styles.col2}`}>
        <div className={styles.chk_box}>
          <input id="isAutoId"
            type="checkbox"
            name='isAutoId'
            checked={loginData.isAutoId && true}
            onChange={handleOnChange} />
          <label htmlFor="isAutoId">아이디 저장</label>
        </div>
        <div className={styles.chk_box}>
          <input id="isAutoLogin"
            type="checkbox"
            name='isAutoLogin'
            onChange={handleOnChange} />
          <label htmlFor="isAutoLogin">자동로그인</label>
        </div>
      </div>
      <div className={styles.btn_box}>
        <button onClick={handleLogin} className={styles.btn_primary}>로그인</button>
      </div>
      <ul className={styles.btn_list_box}>
        <li>
          <Link href="/login/findId" className={styles.btn}>아이디 찾기</Link>
        </li>
        <li>
          <Link href="/login/findPw" className={styles.btn}>비밀번호 찾기</Link>
        </li>
        <li>
          <Link href="/cert" className={styles.btn}>회원가입</Link>
        </li>
      </ul>

      
    </div>

  )
}
