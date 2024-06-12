import { Main } from '@/components/Frames';
import { SigninForm } from './signinForm';
import { pb } from '@/lib/db_config';

export default async function Home({ params }: any) {
    return (
        <Main title={"Signin"}>
            <SigninForm />
        </Main>
    );
}