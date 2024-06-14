import { options } from "@/app/api/auth/[...nextauth]/options";
import { IFELSE, Main } from "@/components/Frames";
import { BASE_FILES } from "@/lib/db_config";
import { getServerSession } from "next-auth/next";
import { getFeedInfo } from "@/lib/feeds/index"
import Link from "next/link";
import { GetUserInfo } from "@/lib/user";

export default async function Home({ params }: any) {
    const feed = await getFeedInfo(params.id);
    const userInfo = await GetUserInfo(feed.uid);

    return (
        <Main title={`Feed Detail - ${params.id}`}>

            <div className={"absolute top-20 flex flex-col gap-5"}>
                {/* Route Indicator */}
                <div className={"flex flex-row gap-5 text-3xl font-bold pl-10"}>
                    <Link href={"/feeds/1"}><p className={"text-gray-500"}>Posts /</p></Link>
                    <p>{params.id}</p>
                </div>

                {/* Feed Information */}
                <div className={"flex flex-row drop-shadow-2xl shadow-black-500/50"}>
                    {/* Left - Image */}
                    <img
                        src={feed.photo ? `${BASE_FILES}/${params.id}/${feed.photo}` : feed.photoURL}
                        className={"rounded-l-2xl w-[24rem] h-[32rem] object-cover"} />

                    {/* Right - Content */}
                    <div className={"block rounded-r-2xl bg-white w-[24rem] h-[32rem] pl-10 pr-10 pt-7 pb-7 text-lg overflow-auto"}>
                        <div className={"flex flex-row items-center gap-5"}>
                            <IFELSE condition={!userInfo || !userInfo.avatarURL}>
                                <div className={"bg-themeColor rounded-full w-10 h-10"}></div>
                                <img className={"rounded-full w-10 h-10"} src={userInfo?.avatarURL} />
                            </IFELSE>
                            <div className={"text-gray-500 text-md"}><p>{userInfo?.username}</p></div>
                        </div>
                        <div className={"mt-4 font-bold text-sm"}>{feed.title}</div>
                        <div className={"mt-4 text-sm"}>{feed.content}</div>
                        <div className={"mt-4 text-gray-500 text-sm"}>{feed.updated}</div>
                    </div>
                </div>
            </div>
        </Main>
    );
}

