import { GetUserInfo } from "@/lib/user";
import { IReplyFetch } from "@/types";

export const Reply = async (props: { item: IReplyFetch, index: number }) => {
    let { item, index } = props;
    let userInfo = await GetUserInfo(item.uid);

    return (
        <div className={"flex flex-col p-0 gap-0.5"}>
            <div className={"flex flex-row text-sm text-gray-500 justify-between items-center"}>
                <div className={"flex flex-row"}>
                    <img src={userInfo?.avatarURL} className={"w-5 h-5 mr-1 rounded-full"} />
                    <div><p>{userInfo?.username}</p></div>
                </div>
                <div><p>{item.created.split(' ')[0]}</p></div>
            </div>
            <p className={"text-sm"}>{item.content}</p>
        </div>
    );
}