import { dynamic, dynamicParams, revalidate, fetchCache, runtime, preferredRegion } from '@/lib/server_config'
import { Main } from '@/components/Frames';
import { FetchFeeds } from '@/lib/feeds/index';
import { BASE_FILES } from '@/lib/db_config';
import { Grid } from '@/components/Layout';
import { Feed } from '@/components/uiComponents/Feed';

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from 'next-auth/next';

export default async function Home({ params }: any) {
    const session = await getServerSession(options);

    let feedsLR = await FetchFeeds();
    return (
        <Main title={"Feeds"}>
            {session ? (<h1>{session?.user?.name}</h1>) : (<h1>Not logged in.</h1>)}
            <Grid>
                {feedsLR?.items.map((item, index) => (
                    <Feed key={index} index={index} item={item}></Feed>
                ))}
            </Grid>
        </Main>
    );
}
