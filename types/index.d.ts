/**
 * A generic state management interface for React components.
 * @member {T} state - The current state value.
 * @member {(newState: T) => void} setState - A function to update the state.
 */
export interface ReactGetSetState<T> {
    state: T;
    setState: (newState: T) => void;
}

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

