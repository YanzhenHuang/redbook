"use client"

import { GetUserInfo } from "@/lib/user";

export const UserCenter = async (props: { id: string | undefined }) => {
    let { id } = props;
    let userInfo = await GetUserInfo(id as string);

    return (
        <div>
            UserCenter: {userInfo?.record.avatarURL}
        </div>
    )
}