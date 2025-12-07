'use client'
import React, { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useVerifyEmailMutation } from '@/store/api'
import { RootState } from '@/store/store'
import { useState } from 'react'
import { verify } from 'crypto'
import { authStatus, setEmailVerified } from '@/store/slice/userSlice'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { CheckCircle, Verified } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const page: React.FC = () => {
    const { token } = useParams<{ token: string }>()
    const router = useRouter();
    const dispatch = useDispatch();
    const [verifyEmail] = useVerifyEmailMutation();
    const isVerifyEmail = useSelector((state: RootState) => state.user.isEmailVerified)
    const [verificationStatus, setVerificationStatus] = useState<"loading" | "success" | "alreadyVerified" | "failed">("loading")


    useEffect(() => {
        const verify = async () => {
            if (isVerifyEmail) {
                setVerificationStatus("alreadyVerified")
                return;
            }
            try {
                const response = await verifyEmail(token).unwrap();
                if (response.success) {
                    dispatch(setEmailVerified(true))
                    setVerificationStatus("success")
                    dispatch(authStatus())
                    toast.success('Email verified successfully')
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 3000)


                }
                else {
                    throw new Error(response.message || "Failed to verify email")
                }
            } catch (error) {
                //toast.error("Failed to verify email")
                console.error("Failed to verify email", error)
            }
        }
        if (token) {
            verify();
        }
    }, [token, verifyEmail, dispatch, isVerifyEmail])

    return (
        <div className='p-20 flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {verificationStatus === "loading" && (
                    <div className='bg-white p-8 max-w-md rounded-xl shadow-lg border flex flex-col items-center text-center'>
                        <Loader2 className='h-16 w-16 text-blue-500 animate-spin mb-4' />
                        <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
                            Verifying Your Email
                        </h2>
                        <p className='text-gray-500'>
                            Please wait while we confirm your email address...
                        </p>
                    </div>
                )}
                {verificationStatus === "success" && (
                    <div className='bg-white p-8 max-w-md rounded-xl shadow-lg border'>
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                            className='flex flex-col items-center text-center'
                        >
                            <CheckCircle className='h-16 w-16 text-green-500 mx-auto mb-4' />
                            <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
                                Email Verified
                            </h2>
                            <p className='text-gray-500'>
                                Your Email has been successfuly verified. You'll ve redirecting to the homepage shortly
                            </p>
                        </motion.div>
                    </div>
                )}
                {verificationStatus === "alreadyVerified" && (
                    <div className='bg-white p-8 max-w-md rounded-xl shadow-lg border'>
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                            className='flex flex-col items-center text-center'
                        >
                            <CheckCircle className='h-16 w-16 text-green-500 mx-auto mb-4' />
                            <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
                                Email Already Verified
                            </h2>
                            <p className='text-gray-500 mb-4'>
                                Your Email is already verified. Yoy can use our services
                            </p>
                            <Button
                                onClick={() => router.push('/')}
                                className='bg-blue-500 mt-2 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105'
                            >
                                Go to Homepage
                            </Button>
                        </motion.div>
                    </div>
                )}
            </motion.div>
        </div>
    )
}

export default page