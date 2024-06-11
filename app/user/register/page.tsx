import { Main } from '@/components/Frames';
import { RegForm } from './regForm';
import { pb } from '@/lib/db_config';


export default async function Home({ params }: any) {
    return (
        <Main title={"Register"}>
            <RegForm />
        </Main>
    );
}