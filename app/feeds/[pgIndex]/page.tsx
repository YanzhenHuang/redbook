import { dynamic, dynamicParams, revalidate, fetchCache, runtime, preferredRegion } from '@/lib/server_config'
import { Main } from '@/components/Frames';
import { FetchFeeds } from '@/lib/feeds/index';
import { BASE_FILES } from '@/lib/db_config';
import { Grid } from '@/components/Layout';
import { Feed } from '@/components/uiComponents/Feed';

export default async function Home({ params }: any) {

    let feedsLR = await FetchFeeds();
    return (
        <Main title={"Feeds"}>
            <Grid>
                {feedsLR?.items.map((item, index) => (
                    <Feed key={index} index={index} item={item}></Feed>
                ))}
            </Grid>
        </Main>
    );
}
