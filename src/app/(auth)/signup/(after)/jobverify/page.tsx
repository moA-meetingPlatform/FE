import BackbuttonHeader from '@/components/(navigation)/(top)/BackbuttonHeader'
import Jobverify from '@/components/(page)/signup/Jobverify'
import React from 'react'

function JobForm() {
  return (
    <>
    <main>
      <BackbuttonHeader contents='회사인증' />
      <Jobverify />
    </main>
    </>
  )
}

export default JobForm