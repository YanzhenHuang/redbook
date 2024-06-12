"use client"
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Register } from '@/lib/user';
import { IUserRegister } from '@/types';
import { AvatarInput, TextInput } from '@/components/uiComponents/Inputs';

export const RegForm = () => {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<IUserRegister>();

    const onSubmit: SubmitHandler<IUserRegister> = async (data) => {
        Register(data);
        console.log(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={"flex flex-col gap-4 absolute top-10 justify-center"}>

            {/* User Avatar */}
            <AvatarInput
                base={{ regName: "avatarURL" }}
                register={register}
                setValue={setValue}
                thisErr={errors.avatarURL} />

            {/* User Name */}
            <TextInput
                base={{ placeHolder: "User Name", regName: "username" }}
                register={register}
                thisErr={errors.username} />

            {/* Email */}
            <TextInput
                base={{ placeHolder: "Email", regName: "email", type: "email" }}
                register={register}
                thisErr={errors.email} />

            {/* Password */}
            <TextInput
                base={{ placeHolder: "Password", regName: "password", type: "password" }}
                register={register}
                thisErr={errors.password} />

            {/* Password Confirm */}
            <TextInput
                base={{ placeHolder: "Confirm Password", regName: "passwordConfirm", type: "password", requireText: "You need to confirm you password." }}
                register={register}
                thisErr={errors.passwordConfirm} />


            {/* Submit */}
            <input type="submit" className={"bg-themeColor text-white font-bold rounded-full block pl-5 pr-5 pt-2 pb-2 hover:cursor-pointer hover:bg-themeColorDark hover:scale-[1.02] transition-all"} />
        </form>

    );
}