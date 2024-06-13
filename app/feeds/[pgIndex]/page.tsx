import { dynamic, dynamicParams, revalidate, fetchCache, runtime, preferredRegion } from '@/lib/server_config'
import { IF, IFELSE, Main } from '@/components/Frames';
import { FetchFeeds } from '@/lib/feeds/index';
import { Grid } from '@/components/Layout';
import { Feed } from '@/components/uiComponents/Feed';

// Next-Auth
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from 'next-auth/next';
import { Header } from '@/components/uiComponents/Header';
import { NavUList } from '@/components/Lists';
import Link from 'next/link';

export default async function Home({ params }: any) {
    const session = await getServerSession(options);

    let feedsLR = await FetchFeeds();
    return (
        <Main title={"Feeds"}>
            <Header title={"Feeds"}>
                <NavUList gap={2}>
                    <li className={`List-none`}>
                        <IF condition={session != void 0}>
                            {session?.user?.name}
                        </IF>
                    </li>
                    <li className={`list-none`}>
                        <IFELSE condition={!session}>
                            <Link href="/api/auth/signin">Sign In</Link>
                            <Link href="/api/auth/signout">Sign Out</Link>
                        </IFELSE>
                    </li>
                    <li className={`list-none`}>
                        <IF condition={!session}>
                            <Link href="/user/register">Sign Up</Link>
                        </IF>
                    </li>
                </NavUList>
            </Header>

            <Grid>
                {feedsLR?.items.map((item, index) => (
                    <Feed key={index} index={index} item={item}></Feed>
                ))}
            </Grid>
        </Main>
    );
}
