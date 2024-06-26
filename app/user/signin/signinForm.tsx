"use client"

import { TextInput } from "@/components/uiComponents/Inputs";
import { AuthWithPassword } from "@/lib/user";
import { IUserAuthWithPassword } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export const SigninForm = () => {
    let { register, setValue, handleSubmit, formState: { errors } } = useForm<IUserAuthWithPassword>();
    let router = useRouter();

    const onSubmit: SubmitHandler<IUserAuthWithPassword> = async (data) => {
        let res = await AuthWithPassword(data);
        console.log(res);
        if (res.errcode == 400) {
            alert(res.message);
        }
        router.push("/feeds/1");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={"flex flex-col gap-4 top-10 justify-center"}>

            <TextInput
                base={{ placeHolder: "User Name or Email", regName: "identity", }}
                register={register}
                thisErr={errors.identity} />

            <TextInput
                base={{ placeHolder: "Password", regName: "password", type: "password" }}
                register={register}
                thisErr={errors.password} />

            {/* Submit */}
            <input type="submit" className={"bg-themeColor text-white font-bold rounded-full block pl-5 pr-5 pt-2 pb-2 hover:cursor-pointer hover:bg-themeColorDark hover:scale-[1.02] transition-all"} />
        </form>
    );
}