"use client"
import React, { useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { FieldError, UseFormRegister, UseFormSetValue, useForm } from 'react-hook-form';
import { toBase64 } from '@/utils/toBase64';

const inputStyle = "border-2 rounded-md p-2 outline-none focus:border-themeColor";

/**
 * A standard text input that's been registered in a form using useForm().
 * @param props
 * @prop {UseFormRegister<any>} register - The register function passed by the useForm() hook.
 * @prop {FieldError | undefined} thisErr - The error message specifically for this input passed from the useForm() hook.
 * @returns 
 */
export const TextInput = (
    props: {
        base: {
            placeHolder: string,
            regName: string,
            type?: string,
            requireText?: string
        },
        register: UseFormRegister<any>,
        thisErr: FieldError | undefined
    }
) => {
    let { placeHolder, regName, type, requireText } = props.base;

    return (
        <div>
            <div className={"text-alertCritical text-sm"}>{props.thisErr?.message}</div>
            <input
                className={`${inputStyle} border-${props.thisErr ? "alertCritical" : "gray-300"}`}
                placeholder={placeHolder}
                type={type || "text"}
                {...props.register(regName, { required: (requireText || `${placeHolder} is required.`) })}>
            </input>
        </div>
    );
}

/**
 * A standard file input for uploading user avatars that's been registered in a form using useForm().
 * @param props 
 * @param {UseFormRegister<any>} register - The register function passed by the useForm() hook.
 * @param {UseFormSetValue<any>} setValue - The setValue function passed by the useForm() hook.
 * @returns 
 */
export const AvatarInput = (
    props: {
        base: {
            regName: string,
        },
        register: UseFormRegister<any>,
        setValue: UseFormSetValue<any>,
        thisErr: FieldError | undefined
    }
) => {

    let { regName } = props.base;

    const fileInputRef = React.createRef<HTMLInputElement>();
    const [m_avatarURL, setAvatarURL] = useState<string>();
    const [m_avatarUsrIconDisplay, setAvatarUsrIconDisplay] = useState<"hidden" | "">("");

    return (
        <div>
            <div
                className={"w-24 h-24 bg-themeColor rounded-full justify-center hover:cursor-pointer m-auto"}
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
                    {...props.register(regName)}
                    ref={fileInputRef}
                    onChangeCapture={(e: React.FormEvent<HTMLInputElement>) => {
                        let target = e.target as HTMLInputElement;
                        if (target.files && target.files.length > 0) {
                            let fileObj = target.files[0];
                            setAvatarURL(URL.createObjectURL(fileObj));
                            setAvatarUsrIconDisplay("hidden");
                            toBase64(fileObj).then((res: string) => { props.setValue("avatarURL", res) });
                        }
                    }}>
                </input>
            </div>
            <div className={"text-alertCritical text-sm"}>{props.thisErr?.message}</div>
        </div>
    );
}