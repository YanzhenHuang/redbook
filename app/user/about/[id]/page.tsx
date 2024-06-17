import { dynamic, dynamicParams, revalidate, fetchCache, runtime, preferredRegion } from '@/lib/server_config'
import { options } from "@/app/api/auth/[...nextauth]/options";
import { IFELSE, Main } from "@/components/Frames";
import { getServerSession } from "next-auth/next";
import { GetUserInfo } from '@/lib/user';
import { FetchFeeds } from '@/lib/feeds';
import { Grid } from '@/components/Layout';
import { Feed } from '@/components/uiComponents/Feed';
import { Header } from '@/components/uiComponents/Header';

export default async function About({ params }: any) {
    const { id } = params;
    const userInfo = await GetUserInfo(id);
    let feedsLR = await FetchFeeds({ number: 1, perPage: 50 }, `uid="${id}"`);

    return (
        <Main title={"About"}>
            <Header title={"About Me"} extraStyle={"fixed"} />
            <br /><br /><br />
            <div className={"flex flex-row gap-16 mb-30 relative top-30s"}>
                {/*!userInfo || !userInfo.record.avatarURL */}
                <IFELSE condition={!userInfo || !userInfo.avatarURL}>
                    <div className={"w-40 h-40 object-cover rounded-full bg-themeColorLight"} />
                    <div>
                        <img
                            src={userInfo?.avatarURL}
                            className={"w-40 h-40 object-cover rounded-full"} />
                    </div>
                </IFELSE>
                <div>
                    <div className={"flex flex-col gap-1"}>
                        <p className={"font-bold"}>{userInfo?.username}</p>
                        <p className={"text-sm opacity-70"}>{`UID: ${userInfo?.id}`}</p>
                    </div>
                </div>
            </div>

            <br />
            {/* Get all feeds IFeedsFetch where uid=session uid */}
            <Grid>
                {feedsLR?.items.map((item, index) => (
                    <Feed key={index} index={index} item={item}></Feed>
                ))}
            </Grid>
        </Main >
    );
}