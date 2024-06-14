"use client"
import React, { useRef, useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { FieldError, UseFormRegister, UseFormSetValue, useForm } from 'react-hook-form';
import { toBase64 } from '@/utils/toBase64';
import { IconType } from 'react-icons';
import imageCompression from 'browser-image-compression';

export const inputStyle = "border-2 rounded-md p-2 outline-none focus:border-themeColor";

const InputStyles = {
    textInput: {
        base: "border-2 rounded-md p-2 outline-none focus:border-themeColor",
        e_err: "border-alertCritical",
        e_idle: "border-gray-300",
    },
    label: {
        e_idle: "text-gray-400 text-sm",
        e_selected: "text-themeColor text-md font-bold",
    }
};

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
            isRequired?: boolean
            requireText?: string
        },
        register: UseFormRegister<any>,
        thisErr: FieldError | undefined
    }
) => {
    let { placeHolder, regName, type, requireText } = props.base;
    let labelRef = React.createRef<HTMLDivElement>();
    let [m_labelStyle, setLabelStyle] = useState<"text-gray-400 text-sm" | "text-themeColor text-md font-bold">("text-gray-400 text-sm");

    return (
        <div className={"flex flex-col"}>
            <div className={`${m_labelStyle} transition-all`} ref={labelRef}>
                {placeHolder}
            </div>
            <input
                className={`${inputStyle} ${props.thisErr ? InputStyles.textInput.e_err : InputStyles.textInput.e_idle}`}
                placeholder={placeHolder}
                type={type || "text"}
                {...props.register(regName, { required: (props.base.isRequired ? (requireText || `${placeHolder} is required.`) : false) })}
                onFocus={() => { setLabelStyle("text-themeColor text-md font-bold") }}
                onBlur={() => { setLabelStyle("text-gray-400 text-sm") }}>
            </input>
            <div className={"text-alertCritical text-sm"}>{props.thisErr?.message}</div>
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
            styles?: string
        },
        register: UseFormRegister<any>,
        setValue: UseFormSetValue<any>,
        thisErr: FieldError | undefined
    }
) => {

    let { regName, styles } = props.base;

    const fileInputRef = React.createRef<HTMLInputElement>();
    const [m_avatarURL, setAvatarURL] = useState<string>();
    const [m_avatarUsrIconDisplay, setAvatarUsrIconDisplay] = useState<" hidden" | "">("");

    return (
        <div>
            <div
                className={styles || "w-24 h-24 bg-themeColor rounded-full justify-center hover:cursor-pointer m-auto"}
                onClick={() => { fileInputRef.current?.click() }}
                style={{
                    backgroundImage: `url(${m_avatarURL})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}>

                {/* Default Icon */}
                <BiUser className={`w-full h-full text-white p-8 text-2xl${m_avatarUsrIconDisplay}`}></BiUser>

                {/* File Input */}
                <input
                    className={"hidden"}
                    type="file"
                    accept="*.png"
                    {...props.register(regName)}
                    ref={fileInputRef}
                    onChangeCapture={async (e: React.FormEvent<HTMLInputElement>) => {
                        let target = e.target as HTMLInputElement;
                        if (target.files && target.files.length > 0) {
                            let fileObj = target.files[0];
                            let fileObjCompressed = fileObj;

                            try {
                                fileObjCompressed = await imageCompression(fileObj, { maxSizeMB: 0.5, maxWidthOrHeight: 100 });
                                if (fileObjCompressed.size / 1024 / 1024 > 0.5) {
                                    alert("File should not exceed 0.5MB!");
                                    return;
                                }
                            } catch (err) {
                                alert("File should not exceed 0.5MB!");
                                return;
                            }

                            setAvatarURL(URL.createObjectURL(fileObjCompressed));
                            console.log(URL.createObjectURL(fileObjCompressed));
                            setAvatarUsrIconDisplay(" hidden");
                            toBase64(fileObjCompressed).then((res: string) => {
                                props.setValue("avatarURL", res);
                            });
                        }
                    }}>
                </input>
            </div>
            <div className={"text-alertCritical text-sm"}>{props.thisErr?.message}</div>
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
export const PhotoInput = (
    props: {
        base: {
            regName: string,
            styles?: string,
            Icon: IconType,
        },
        register: UseFormRegister<any>,
        setValue: UseFormSetValue<any>,
        thisErr: FieldError | undefined
    }
) => {

    let { regName, styles, Icon } = props.base;

    const fileInputRef = React.createRef<HTMLInputElement>();
    const [m_photoURL, setPhotoURL] = useState<string>();
    const [m_iconDisplay, setIconDisplay] = useState<" hidden" | "">("");

    return (
        <div>
            <div
                className={styles || "w-48 h-32 border border-themeColorLight border-[2.5px] p-3 rounded-lg bg-themeColorUltraLight hover:opacity-80 hover:scale-[1.02] hover:cursor-pointer transition-all"}
                onClick={() => { fileInputRef.current?.click() }}
                style={{
                    backgroundImage: `url(${m_photoURL})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}>

                {/* Default Icon */}
                <Icon className={`w-full h-full text-themeColor p-8 text-2xl${m_iconDisplay}`}></Icon>

                {/* File Input */}
                <input
                    className={"hidden"}
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    {...props.register(regName)}
                    ref={fileInputRef}
                    onChangeCapture={(e: React.FormEvent<HTMLInputElement>) => {
                        let target = e.target as HTMLInputElement;
                        if (target.files && target.files.length > 0) {
                            let fileObj = target.files[0];
                            setPhotoURL(URL.createObjectURL(fileObj));
                            setIconDisplay(" hidden");
                            toBase64(fileObj).then((res: string) => { props.setValue(regName, res) });
                        }
                    }}>
                </input>
            </div>
            <div className={"text-alertCritical text-sm"}>{props.thisErr?.message}</div>
        </div>
    );
}