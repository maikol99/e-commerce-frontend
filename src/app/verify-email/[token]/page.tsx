import React from 'react'
import { useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useVerifyEmailMutation } from '@/store/api'
import { RootState } from '@/store/store'
import { useState } from 'react'

const page:React.FC = () => {
    const {token} = useParams<{token:string}>()
    console.log(token)
    const dispatch = useDispatch();
    const [verifyEmail] = useVerifyEmailMutation();
    const isVerifyEmail = useSelector((state: RootState) => state.user.isEmailVerified)

    const [verificationStatus,setVerificationStatus] = useState<"loading" | "success" | "alreadyVerified" | "failed">("loading")

    
  return (
    <div>page </div>
  )
}

export default page