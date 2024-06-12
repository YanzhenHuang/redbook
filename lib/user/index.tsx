"use server"
import { pb } from '@/lib/db_config';
import { IPBErrData, IUserRegister } from '@/types';

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

    if (dataArr.length <= 1) {
        errMessages += dataArr[0];
    } else {
        dataArr.map((data, index) => {
            let indexNum = (index + 1).toString() + " ";
            errMessages += indexNum + ". " + dataArrKey[index] + ": " + data.message + "\n";
        });
    }

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
    } catch (e: any) {
        let errMessages = ParseErrMsg(e) as string;
        return { errcode: e.data.code, message: errMessages } as IPBErrData;
    }

}