import React from 'react'

function CertVerify() {
  return (
    <>
    <main>
      <div className='tracking-tighter py-4'>
        <p className='text-lg'>재직증명서를 업로드 해주세요.</p>
        <p className='text-sm'>사내메일이 없다면 재직증명서로 인증할 수 있습니다.
        </p>
      </div>
      <div className='flex justify-between'>
        <span>
          <input id="phone" name='phone' maxLength={11} type="tel"
            className='w-full border-0 border-b-2'
              // onChange={(e) => handleOnChange(e, certData, setCertData)}
          />
        </span>
      <button className='bg-[#eef2ff] rounded-full p-2 min-w-[80px] font-semibold '>찾아보기</button>      
      </div>

      <div className='px-3'>
      <button className='w-full mt-40 h-10 rounded-xl bg-[#4338ca] text-white'>가입완료</button>
      </div>
    </main>
    </>
  )
}

export default CertVerify