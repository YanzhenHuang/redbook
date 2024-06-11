"use client"
import { Main } from '@/components/Frames';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiUser } from 'react-icons/bi';

const inputStyle = "border-2 border-gray-300 rounded-md p-2 outline-none focus:border-themeColor";

export const RegForm = (props: { submitAction: Function }) => {
    const { register, setValue, handleSubmit, formState: { errors }, watch } = useForm();

    // For user avatar input.
    const fileInputRef = React.createRef<HTMLInputElement>();
    const [m_avatarURL, setAvatarURL] = useState<string>();
    const [m_avatarUsrIconDisplay, setAvatarUsrIconDisplay] = useState<"hidden" | "">("");


    const emptyFunc = (data: any) => {
        return data;
    }

    return (
        <Main>
            <form
                onSubmit={handleSubmit((data) => {
                    props.submitAction(data);
                    console.log(data);
                    console.log(data.avatar.type);
                })}
                className={"flex flex-col gap-4 absolute top-10 justify-center"}>


                {/* File Input */}
                {/* <input
                    type="file"
                    accept="*.png"
                    {...register("avatar")}
                    ref={fileInputRef}>
                </input> */}


                {/* User Avatar */}

                <div
                    className={"w-24 h-24 bg-themeColor rounded-full justify-center hover:cursor-pointer"}
                    onClick={() => { fileInputRef.current?.click() }}
                    style={{
                        backgroundImage: `url(${m_avatarURL})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}>

                    {/* Default Icon */}
                    <BiUser className={`w-full h-full text-white p-8 text-2xl ${m_avatarUsrIconDisplay}`}></BiUser>

                    {/* File Input */}
                    <input
                        className={"hidden"}
                        type="file"
                        accept="*.png"
                        {...register("avatar")}
                        ref={fileInputRef}
                        onChangeCapture={(e: React.FormEvent<HTMLInputElement>) => {
                            let target = e.target as HTMLInputElement;
                            if (target.files && target.files.length > 0) {
                                let fileObj = target.files[0];
                                setAvatarURL(URL.createObjectURL(fileObj));
                                setAvatarUsrIconDisplay("hidden");

                                // setValue("avatar", fileObj);
                            }
                        }}>
                    </input>
                </div>

                {/* User Name */}
                <input
                    className={`${inputStyle} ${errors.username?.message && "border-alert-500"}`}
                    placeholder={"User Name"}
                    {...register("username", { required: "User name is required." })}>
                </input>

                {/* Email */}
                <input
                    className={`${inputStyle} ${errors.email?.message && "border-alert-500"}`}
                    placeholder={"Email"}
                    type="email"
                    {...register("email", { required: "Email is required." })}>
                </input>

                {/* Password */}
                <input
                    className={`${inputStyle} ${errors.password?.message && "border-alert-500"}`}
                    placeholder={"Password"}
                    type="password"
                    {...register("password", { required: "You need a password to register." })}>
                </input>

                {/* Password Confirm */}
                <input
                    className={`${inputStyle} ${errors.passwordConfirm?.message && "border-alert-500"}`}
                    placeholder={"PasswordConfirm"}
                    type="password"
                    {...register("passwordConfirm", { required: "You need to confirm your password." })}>
                </input>

                {/* Submit */}
                <input type="submit" className={"bg-themeColor text-white font-bold rounded-full block pl-5 pr-5 pt-2 pb-2 hover:cursor-pointer hover:bg-themeColorDark hover:scale-[1.02] transition-all"} />
            </form>
        </Main >
    );
}