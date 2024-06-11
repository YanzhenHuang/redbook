import { Main } from "@/components/Frames";
import { BASE_FILES, pb } from "@/lib/db_config";
import { IFeedsFetch } from "@/types";
import Link from "next/link";

const getFeedInfo = async (id: string): Promise<IFeedsFetch> => {
    return pb.collection<IFeedsFetch>('feeds').getOne(id, { expand: 'id,uid,title,content,photo,public,created,updated' });
}

export default async function Home({ params }: any) {
    let feed = await getFeedInfo(params.id);
    return (
        <Main title={`Feed Detail - ${params.id}`}>

            <div className={"absolute top-40 flex flex-col gap-5"}>
                {/* Route Indicator */}
                <div className={"flex flex-row gap-5 text-3xl font-bold pl-10"}>
                    <Link href={"/feeds/1"}><p className={"text-gray-500"}>Posts /</p></Link>
                    <p>{params.id}</p>
                </div>

                {/* Feed Information */}
                <div className={"flex flex-row drop-shadow-2xl shadow-black-500/50"}>
                    {/* Left - Image */}
                    <img src={`${BASE_FILES}/${params.id}/${feed.photo}`} className={"rounded-l-2xl w-[24rem] h-[32rem] object-cover"} />

                    {/* Right - Content */}
                    <div className={"block rounded-r-2xl bg-white w-[24rem] h-[32rem] pl-10 pr-10 pt-7 pb-7 text-lg"}>
                        <div className={"flex flex-row items-center gap-5"}>
                            <div className={"bg-themeColor rounded-full w-12 h-12"}></div>
                            <div className={"text-gray-500"}><p>User Name</p></div>
                        </div>
                        <div className={"mt-4 font-bold"}>{feed.title}</div>
                        <div className={"mt-4"}>{feed.content}</div>
                        <div className={"mt-4 text-gray-500"}>{feed.updated}</div>
                    </div>
                </div>
            </div>
        </Main>
    );
}   