import { options } from "@/app/api/auth/[...nextauth]/options";
import { IFELSE, IF, Main } from "@/components/Frames";
import { BASE_FILES } from "@/lib/db_config";
import { getServerSession } from "next-auth/next";
import { FetchReplies, getFeedInfo } from "@/lib/feeds/index"
import Link from "next/link";
import { GetUserInfo } from "@/lib/user";
import { DeleteFeedButton } from "@/components/uiComponents/Buttons";
import { UList } from "@/components/Lists";
import { Reply } from "./replies";

export default async function Home({ params }: any) {
    // Feed user info
    const feed = await getFeedInfo(params.id);
    const feedUserInfo = await GetUserInfo(feed.uid);

    // Session user info
    const session = await getServerSession(options);
    const loginUserInfo = session?.user ? JSON.parse(session?.user.name as string) : void 0;

    // Replies
    const repliesLR = await FetchReplies(params.id);

    return (
        <Main title={`Feed Detail - ${params.id}`}>

            <div className={"absolute top-20 flex flex-col gap-5 items-center"}>
                {/* Route Indicator */}
                <div className={"flex flex-row gap-5 text-3xl font-bold pl-10"}>
                    <Link href={"/feeds/1"}><p className={"text-gray-500"}>Posts /</p></Link>
                    <p>{params.id}</p>
                </div>

                {/* Feed Information */}
                <div className={"flex md:flex-row sm:flex-col drop-shadow-2xl shadow-black-500/50"}>
                    {/* Left - Image */}
                    <img
                        src={feed.photo ? `${BASE_FILES}/${params.id}/${feed.photo}` : feed.photoURL}
                        className={"md:rounded-tr-none md:rounded-l-2xl  sm:rounded-t-2xl w-[24rem] h-[32rem] object-cover"} />

                    {/* Right - Content */}
                    <div className={"block md:rounded-bl-none md:rounded-r-2xl sm:rounded-b-2xl bg-white w-[24rem] h-[32rem] pl-10 pr-10 pt-7 pb-7 text-lg overflow-auto"}>
                        <div className={"flex flex-row items-center gap-5"}>
                            <IFELSE condition={!feedUserInfo || !feedUserInfo.avatarURL}>
                                <div className={"bg-themeColor rounded-full w-10 h-10"}></div>
                                <img className={"rounded-full w-10 h-10"} src={feedUserInfo?.avatarURL} />
                            </IFELSE>
                            <div className={"text-gray-500 text-md"}><p>{feedUserInfo?.username}</p></div>
                        </div>
                        <div className={"mt-4 font-bold text-sm"}>{feed.title}</div>
                        <div className={"mt-4 text-base"}>{feed.content}</div>
                        <div className={"mt-4 text-gray-500 text-sm"}>{feed.updated}</div>

                        {/* Replies */}
                        <UList flexDirection={"col"} l_className={"justify-left mt-4"} gap={4}>
                            {repliesLR?.items.map((item, index) => (
                                <Reply key={index} item={item} index={index} />
                            ))}
                        </UList>
                    </div>
                </div>

                {/* Delete Button */}
                <IF condition={loginUserInfo != void 0 && loginUserInfo.record.id === feed.uid}>
                    <DeleteFeedButton id={feed.id} />
                </IF>
            </div>
        </Main>
    );
}

