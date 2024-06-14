import { Main } from "@/components/Frames";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
import { TextInput } from "@/components/uiComponents/Inputs";
import { useForm } from "react-hook-form";
import { PostFeedForm } from "./postFeedForm";

export default async function Home({ params }: any) {
    const session = await getServerSession(options);
    const userInfo = session && JSON.parse(session?.user?.name as string);



    return (
        <Main>
            <PostFeedForm id={userInfo.record.id} />
        </Main >
    );
}