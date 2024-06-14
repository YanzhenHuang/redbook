import { Main } from "@/components/Frames";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
import { TextInput } from "@/components/uiComponents/Inputs";
import { useForm } from "react-hook-form";
import { PostFeedForm } from "./postFeedForm";
import { Header } from "@/components/uiComponents/Header";
import Link from "next/link";

export default async function Home({ params }: any) {
    const session = await getServerSession(options);
    const userInfo = session && JSON.parse(session?.user?.name as string);



    return (
        <Main>
            <Header title={"Post Feed"}>
                <Link href={"/feeds/1"}>All Feeds</Link>
            </Header>
            <PostFeedForm id={userInfo.record.id} />
        </Main >
    );
}