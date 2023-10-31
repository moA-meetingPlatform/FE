import React from 'react'

function verifycert() {
  return (
    <>
      <div>
        <p>회사명</p>
        <input type="text" className='border rounded-xl'/>
      </div>
      <div>
        <p>재직증명서</p>
        <div>
        <input type="text" className='border rounded-xl'/>
        <button className='bg-[#72A666] rounded-full p-2 min-w-[80px] text-white font-semibold '>찾아보기</button>
        </div>
      </div>
    </>
  )
}

export default verifycert