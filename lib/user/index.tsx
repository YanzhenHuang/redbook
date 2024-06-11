"use server"
import { pb } from '@/lib/db_config';

export const Register = async (data: any) => {

    let regData = {
        "username": data.username,
        "email": data.email,
        "emailVisibility": true,
        "password": data.password,
        "passwordConfirm": data.passwordConfirm,
        "name": "",
        "avatarURL": data.avatarURL,
    };

    return pb.collection("users").create(regData);
}