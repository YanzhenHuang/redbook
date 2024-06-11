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
interface IUserRegister {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
    avatarURL: string;
}