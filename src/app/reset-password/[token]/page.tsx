'use client'

import { useRouter, useParams } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useResetPasswordMutation } from '@/store/api';
import { useState } from 'react';
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Loader2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';


interface ResetPasswordFormData {
    token: string,
    newPassword: string,
    confirmPassword: string
}


const page: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const router = useRouter();
    const dispatch = useDispatch();
    const [resetPasswordLoading, setResetPasswordLoading] = useState(false)
    const [resetPassword] = useResetPasswordMutation()
    const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)



    const { register, handleSubmit, watch, formState: { errors }, } = useForm<ResetPasswordFormData>();

    const onSubmit = async (data: ResetPasswordFormData) => {
        setResetPasswordLoading(true)
        if (data.newPassword !== data.confirmPassword) {
            toast.error("Password do not match")
            return
        }

        try {
            await resetPassword({ token: token, newPassword: data.newPassword }).unwrap();
            setResetPasswordSuccess(true)
            toast.success('Password reset successfuly')
        } catch (error) {
            toast.error("failed to reset password ")
        } finally {
            setResetPasswordLoading(false)
        }
    }


    return (
        <div className='p-20 flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className='text-2xl font-seminbold text-gray-700 mb-6 text-center'>
                    Reset Your Password
                </h2>

                (!resetPasswordSuccess ? (
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <div className="relative">
                        <Input
                            {...register("newPassword", {
                                required: "New Password is required",
                            })}
                            placeholder="New Password"
                            type={showPassword ? "text" : "password"}
                            className="pl-10"
                        />
                        <Lock
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            size={20}
                        />
                        {showPassword ? (
                            <EyeOff
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                size={20}
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <Eye
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                size={20}
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                    {errors.newPassword && (
                        <p className="text-red-500 text-sw">
                            {errors.newPassword.message}
                        </p>
                    )}

                    <                   Input
                        {...register("confirmPassword", {
                            required: "Please Confirm Password Your Password",
                        })}
                        placeholder="Confirm New Password"
                        type={"password"}
                    />

                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sw">
                            {errors.confirmPassword.message}
                        </p>
                    )}

                    <Button type="submit" className="w-full font-bold bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
                        {resetPasswordLoading ? (
                            <Loader2 className="minimate-spin mr-2" size={20} />
                        ) : (
                            "Reset Password"
                        )}
                    </Button>

                </form>
                ):(
                <div></div>
                ))
            </motion.div>

        </div>
    )
}

export default page