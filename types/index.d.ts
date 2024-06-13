import { User } from "next-auth";

/**
 * A generic state management interface for React components.
 * @member {T} state - The current state value.
 * @member {(newState: T) => void} setState - A function to update the state.
 */
export interface ReactGetSetState<T> {
    state: T;
    setState: (newState: T) => void;
}

/**
 * A generic interface for a feed item.
 */
export interface IFeedsFetch {
    id: string;
    uid: string;
    title: string;
    content: string;
    photo: string;
    public: boolean;
    created: string;
    updated: string;
}

/**
 * A generic interface for a user registration.
 */
export interface IUserRegister {
    username: string;
    email: string;
    emailVisibility?: boolean;
    password: string;
    passwordConfirm: string;
    name?: string;
    avatarURL: string;
}

/**
 * A generic interface for user signin with password.
 */
export interface IUserAuthWihPassword {
    identity: string;
    password: string;
}

export interface IUserAuthWithPasswordCallback extends User {
    token: string;
    record: {
        id: string;
        collectionId: string;
        collectionName: string;
        username: string;
        verified: boolean;
        emailVisibility: boolean;
        email: string;
        created: string;
        updated: string;
        name: string;
        avatarURL: string;
    };
}

/**
 * A generic interface for server data.
 */
export interface IPBErrData {
    errcode: string;
    message: string;
}

