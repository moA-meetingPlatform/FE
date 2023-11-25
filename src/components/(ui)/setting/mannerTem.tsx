import React from 'react'

interface MannerTemparatureProps {
  temparature: string;
}

function MannerTemparature({ temparature = "36.5" }: MannerTemparatureProps) {
  return (
    <>
    <main>
      <button className='profile_temperature ml-3'>
        <div className='bg-[#eef2ff] w-16 h-6 leading-6 rounded-full text-xl text-center text-[#4338ca]'>
        {temparature}
        </div>
      </button>
    </main>
    </>
  )
}

export default MannerTemparature