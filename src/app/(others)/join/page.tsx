import CertPage from '@/components/(page)/signup/CertPage'
import Step from '@/components/(page)/signup/step/Step'

import React from 'react'

function SignupStep() {
    return (
        <>
        <Step
          step={1}
          title={'본인인증'}
          description={'휴대폰 번호로 인증해 주세요.'}
        />
        <CertPage />
        </>
    )
}

export default SignupStep