import { options } from "@/app/api/auth/[...nextauth]/options";
import { IFELSE, Main } from "@/components/Frames";
import { BASE_FILES, pb } from "@/lib/db_config";
import { IFeedsFetch } from "@/types";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

const getFeedInfo = async (id: string): Promise<IFeedsFetch> => {
    return pb.collection<IFeedsFetch>('feeds').getOne(id, { expand: 'id,uid,title,content,photo,public,created,updated' });
}

export default async function Home({ params }: any) {
    let feed = await getFeedInfo(params.id);
    const session = await getServerSession(options);
    const userInfo = session && JSON.parse(session?.user?.name as string);

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
                            <IFELSE condition={session != void 0}>
                                <img className={"rounded-full w-10 h-10"} src={userInfo.record.avatarURL} />
                                <div className={"bg-themeColor rounded-full w-10 h-10"}></div>
                            </IFELSE>
                            <div className={"text-gray-500 text-md"}><p>{userInfo?.record.username}</p></div>
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