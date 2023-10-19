import React from 'react'
import Image from 'next/image'

function profile() {
    return (
        <>
        <main className='px-5'>
            <div className='profile_top_box mt-12 flex justify-between'>
                <div className='profile_image'>
                    <Image 
                    src={'/images/moa1.png'}
                    alt="프로필사진"
                    width={100}
                    height={46.156}
                    className='border rounded-full'
                    />
                </div>
                <div className='profile_temperature flex items-end'>
                    <button className='bg-green-300 w-14 h-6 rounded-full'>
                    36.5
                    </button>
                </div>
            </div>

            <div className='profile_middle_box pt-2'>
                <h2 className='font-bold text-xl'>김모아</h2>
                <div className='profile_introduce_box mt-7 text-[14px] font-semibold text-[#777777]'>
                    <p>몰랐던 취미나 관심사를 함께 발굴해나가 봐요!</p>
                </div>
            </div>

            <div className='profile_bottom_box mt-7'>
                <ul className='intrest_badge'>
                    <li className='inline-block mr-2 bg-slate-200 rounded-full h-6 px-3 leading-6 text-[13px]'>영화</li>
                    <li className='inline-block mr-2 bg-slate-200 rounded-full h-6 px-3 leading-6 text-[13px]'>커피</li>
                    <li className='inline-block mr-2 bg-slate-200 rounded-full h-6 px-3 leading-6 text-[13px]'>캘리그라피</li>
                </ul>
            </div>


            <div className='mymeeting_box flex-col mt-16'>
                <div className='mymeeting_header flex justify-end space-x-20 border-b-1 border-black'>
                    <h1 className='text-[25px] font-bold text-center'>내모임</h1>
                    <button>모임추가</button>
                </div>
                    <div className='mymeeting_contents_box bg-slate-200 mx-[-20px]'>
                    <div className='like_meeting_box'>
                        <div>
                            좋아요
                        </div>
                    </div>
                    <div className='waiting_meeting_box'>
                        <div>
                            대기
                        </div>
                    </div>
                    <div className='attend_meeting_box'>
                        <div>
                            참여
                        </div>
                        <div className='meeting_contents mt-3 px-1'>
                            <div className='meeting_contents_title bg-white rounded-3xl p-5 w-[380px]'>
                                참여신청 <span>23.10.01(일) 신청</span>
                                <div className='meeting_contents_middle flex'>
                                    <Image
                                    src={'/images/moa4.png'}
                                    alt="모임사진"
                                    width={70}
                                    height={70}
                                    className='rounded-xl'/>
                                    <div className='pl-3'>
                                        <p>종료 <span className='rest_mem_num'>9/10</span></p>
                                        <p>김모아와 함께하는 정상이어디야...</p>
                                        <p>소셜링 부산진구 12.3(토) 오후 6:00</p>
                                    </div>
                                </div>
                                <button className='mt-5 w-full border-2 h-12 rounded-lg'>앵콜 요청</button>
                            </div>
                        </div>

                        <div className='view_more_button mt-5 mx-1 bg-white rounded-xl text-center leading-[48px] h-12 w-[380px]'>
                            더보기 {">"}
                        </div>

                        <div className='waiting_meeting_box'>
                            <div>
                                진행
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}

export default profile