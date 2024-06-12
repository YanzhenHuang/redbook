import { Main } from '@/components/Frames';
import { RegForm } from './regForm';

export default async function Home({ params }: any) {
    return (
        <Main title={"Register"}>
            <RegForm />
        </Main>
    );
}