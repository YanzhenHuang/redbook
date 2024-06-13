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
import { BiPlus } from 'react-icons/bi';

export default async function Home({ params }: any) {
    const session = await getServerSession(options);

    let feedsLR = await FetchFeeds();
    return (
        <Main title={"Feeds"}>
            <Header title={"Feeds"}>
                <NavUList gap={4}>
                    <Link
                        href={"/postFeeds"}
                        className={"bg-themeColor text-white font-bold rounded-full block pl-2 pr-2 pt-1 pb-1 hover:cursor-pointer hover:bg-themeColorDark hover:scale-[1.02] transition-all"}>
                        <BiPlus />
                    </Link>
                    <IF condition={session != void 0}>
                        {`${session?.user?.name} ${session?.user?.id}`}
                    </IF>
                    <IFELSE condition={!session}>
                        <Link href="/api/auth/signin?callbackUrl=%2Ffeeds%2F1">Sign In</Link>
                        <Link href="/api/auth/signout?callbackUrl=%2Ffeeds%2F1">Sign Out</Link>
                    </IFELSE>
                    <IF condition={!session}>
                        <Link href="/user/register">Sign Up</Link>
                    </IF>
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
