"use server"
import { pb } from '@/lib/db_config';
import { IPBErrData, IUserAuthWihPassword, IUserRegister } from '@/types';

/**
 * Parse error messages into a loose list.
 * @param e 
 * @returns 
 */
const ParseErrMsg = (e: any): string => {
    if (!e.data.data) {
        return "";
    }

    let dataArr = Object.values(e.data.data) as IPBErrData[];
    let dataArrKey = Object.keys(e.data.data);
    let errMessages = e.message + "\n";

    dataArr.map((data, index) => {
        let indexNum = (index + 1).toString() + " ";
        errMessages += indexNum + ". " + dataArrKey[index] + ": " + data.message + "\n";
    });

    return errMessages;
}

/**
 * 
 * @param {IUserRegister} data - User register data. 
 * @returns 
 */
export const Register = async (data: IUserRegister): Promise<any | undefined> => {

    let regData = {
        "username": data.username,
        "email": data.email,
        "emailVisibility": true,
        "password": data.password,
        "passwordConfirm": data.passwordConfirm,
        "name": "",
        "avatarURL": data.avatarURL,
    };

    try {
        const newUser = await pb.collection("users").create<IUserRegister>(regData);
        return newUser;
    } catch (err: any) {
        let errMessages = ParseErrMsg(err) as string;
        return { errcode: err.data.code, message: errMessages } as IPBErrData;
    }

}


export const AuthWithPassword = async (data: IUserAuthWihPassword) => {
    try {
        const authData = await pb.collection('users').authWithPassword(data.identity, data.password);
        return authData;
    } catch (err: any) {
        let errMessages = ParseErrMsg(err) as string;
        return { errcode: err.data.code, message: errMessages } as IPBErrData;
    }
}