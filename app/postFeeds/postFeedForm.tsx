"use client"
import { PhotoInput, TextInput, inputStyle } from "@/components/uiComponents/Inputs";
import { PostFeed } from "@/lib/feeds";
import { IFeedPost } from "@/types";
import { toBase64 } from "@/utils/toBase64";
import { redirect } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiUpArrow, BiUpload } from "react-icons/bi";


export const PostFeedForm = (params: { id: string }) => {
    const { id } = params;
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<IFeedPost>();

    const onSubmit: SubmitHandler<IFeedPost> = async (data) => {

        let res = await PostFeed(data);
        if (res.errcode == 400 || res.errcode == 403) {
            alert(res.message);
            return;
        }
        alert("Post Success!");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* User ID */}
            <input type={"hidden"} value={id} {...register("uid")} />

            {/* Photo */}
            <PhotoInput
                base={{ regName: "photoURL", Icon: BiUpload }}
                register={register}
                setValue={setValue}
                thisErr={errors.photoURL} />

            {/* Title */}
            <TextInput
                base={{ placeHolder: "Title", regName: "title", isRequired: true, }}
                register={register}
                thisErr={errors.title} />

            {/* Content */}
            <textarea
                className={inputStyle}
                placeholder={"Content"}
                {...register("content")} />

            {/* Submit */}
            <input type="submit" className={"bg-themeColor text-white font-bold rounded-full block pl-5 pr-5 pt-2 pb-2 hover:cursor-pointer hover:bg-themeColorDark hover:scale-[1.02] transition-all"} />

        </form>
    );
}