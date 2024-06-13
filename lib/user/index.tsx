"use server"
import { pb } from '@/lib/db_config';
import { IPBErrData, IUserAuthWithPassword, IUserAuthWithPasswordCallback, IUserRegister } from '@/types';
import { cookies } from 'next/headers';

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
 * Register user using given data.
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

/**
 * User Login with identity and password.
 * @param {IUserAuthWithPassword} data - User login data.
 * @returns 
 */
export const AuthWithPassword = async (data: IUserAuthWithPassword): Promise<any | undefined> => {
    try {
        const authData = await pb.collection<IUserAuthWithPassword>('users').authWithPassword(data.identity, data.password);
        pb.authStore.save(authData.token, authData.record);
        return authData;
        // return pb.authStore.model;
    } catch (err: any) {
        // let errMessages = ParseErrMsg(err) as string;
        // return { errcode: err.data.code, message: errMessages } as IPBErrData;
        return null;
    }
}


export const GetUserInfo = async (id: string): Promise<IUserAuthWithPasswordCallback | null> => {
    try {
        const userInfo = await pb.collection<IUserAuthWithPasswordCallback>('users').getOne(id);
        return userInfo;
    } catch (err: any) {
        return null;
    }
}

export const ConfirmVerification = async (data: any): Promise<any | undefined> => {
    await pb.collection('users').confirmVerification(data.token);
    await pb.collection('users').authRefresh();
}