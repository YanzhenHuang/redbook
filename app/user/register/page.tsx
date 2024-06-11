import { Main } from '@/components/Frames';
import { RegForm } from './regForm';
import { pb } from '@/lib/db_config';


const Register = async (data: any) => {
    "use server"

    let regData = {
        "username": data.username,
        "email": data.email,
        "emailVisibility": true,
        "password": data.password,
        "passwordConfirm": data.passwordConfirm,
        "name": "",
        "avatar": data.avatar,
    };

    return pb.collection("users").create(regData);
}

export default async function Home({ params }: any) {
    return (
        <Main title={"Register"}>
            <RegForm
                submitAction={Register}
            ></RegForm>
        </Main>
    );
}