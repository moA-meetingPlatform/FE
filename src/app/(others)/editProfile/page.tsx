'use client'

import BackbuttonHeader from '@/components/(navigation)/(top)/BackbuttonHeader';
import CategorySelect from '@/components/(page)/signup/after/CategorySelect';
import AWS from 'aws-sdk';
import Image from 'next/image'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function ProfileModify(props:any) {
  const router = useRouter()
  const [loding, setLoding] = useState<boolean>(false);
  const [myFile, setMyFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY as string,
    secretAccessKey: process.env.SECRET_KEY as string,
    region: process.env.AWS_REGION as string,
    signatureVersion: 'v4',
})

const handleCertImgFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
  setMyFile(null);
  const files = (e.target as HTMLInputElement).files;
  console.log(files)
  if (files?.length) {
      const file = files[0];
      setMyFile(file);
      setLoding(true);

      try {
          const upload = new AWS.S3.ManagedUpload({
          params: {
              ACL: "public-read",
              Body: file,
              Key: "contents/" + file.name,
              Bucket: process.env.BUCKET_NAME as string,
          },
          });
          const promise = upload.promise();
          // console.log("promise", (await promise).Location);
          const myUrl = (await promise).Location;

          setImageUrl(myUrl)

          setLoding(false);
      } catch (error) {
      // Handle network or other errors
      console.error('Error uploading image:', error);
      setLoding(false);
      }
  }
}

const handleProfileUpdate = async () => {
  try {
    // PATCH 요청을 보낼 URL
    const apiUrl = '/api/updateProfile';

    // PATCH 요청의 body에 넣을 데이터
    const requestBody = imageUrl ? { certificateImageUrl: imageUrl } : {};

    // PATCH 요청 보내기
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      // 성공적으로 업데이트된 경우 페이지 이동 등 추가 로직

      router.push('/author/[id]'); // 프로필 페이지로 이동
    } else {
      console.error('Error updating profile:', response.statusText);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};




  return (
    <>
    <main>

      <BackbuttonHeader contents='프로필 수정'/>
      <div className='name_modify mt-10'>
      <p className='text-xl font-semibold'>프로필 사진</p>
        <div className='flex flex-col justify-start md:w-[80%] w-full transition-all'>
          <input
              type="file"
              name="companyCertImg"
              id='fileInput'
              className='file:text-xs file:bg-[#f7852e] file:border-none file:text-white file:px-6 file:rounded-full file:text-end file:h-10 file:font-semibold file:mr-2 border-2 border-[#E5E7EB] rounded-full w-full text-[0.8rem] pr-6'
              onChange={handleCertImgFile}
          />
          </div>
        <p className='text-xl font-semibold'>닉네임</p>
        <input
        type="text"
        name="nickname"
        className='w-full border rounded-lg mt-2'/>
        <p>닉네임은 14일에 한번씩 변경할 수 있습니다.</p>
      </div>

      <div className='introduce_modify mt-5'>
      <p className='text-xl font-semibold'>소개글</p>
      <input
      type="text"
      name='introduce'
      className='w-full h-[100px] border rounded-lg mt-2' />
      </div>

      <div className='flex mt-10'>
      <button className='mx-auto h-[44px] w-[300px] bg-[#4338ca] rounded-2xl text-white font-semibold'>
        수정하기
        </button> 
      </div>
    </main>
    </>
  )
}

export default ProfileModify
