"use client"
import { DeleteFeed } from "@/lib/feeds";
import { ReactNode } from "react";

export const baseBtnStyles = "block pl-5 pr-5 pt-2 pb-2 hover:cursor-pointer hover:scale-[1.02] transition-all";

/**
 * @deprecated
 */
const btnStyles = "pt-2 pb-2 pl-5 pr-5 rounded-md hover:scale-[1.02] hover:opacity-80 transition-all";

const getBtnVariation = (bgColor: string, textColor: string) => {
    return `text-${textColor} bg-${bgColor}`;
}

export interface BaseButtonProps {
    children: ReactNode | ReactNode[];
    onClickDo: (e: React.MouseEvent<HTMLButtonElement>) => any | Promise<any>;
    onExceptionDo?: (err: any) => any;
}

export interface ButtonProps extends BaseButtonProps {
    bgColor: string;
    textColor: string;
}

export const Button = (props: ButtonProps) => {
    let styles = getBtnVariation(props.bgColor, props.textColor) + " " + btnStyles;

    // Unify sync & async functions.
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const result = props.onClickDo(e);
        if (props.onClickDo instanceof Promise) {
            return;
        }

        try {
            await result;
        }
        catch (err: any) {
            props.onExceptionDo && props.onExceptionDo(err);
        }
    }

    return (
        <button className={styles} onClick={(e) => { handleClick }}>{props.children}</button>
    );
};

export const PrimaryButton = (props: BaseButtonProps) => {
    return (
        <Button bgColor={"themeColor"} textColor={"white"} onClickDo={props.onClickDo}>{props.children}</Button>
    );
};

export const DeleteFeedButton = (props: { id: string }) => {
    return (
        <button
            className={`w-60 bg-alertCritical text-white font-bold hover:scale-[1.02] hover:cursor-pointer transition-all pl-3 pr-3 pt-2 pb-2 rounded-full`}
            onClick={async () => {
                let res = await DeleteFeed(props.id);
                if (res == true) {
                    alert('Delete Succeded!');
                    window.location.href = "/feeds/1";
                } else {
                    alert('Delete Failed!');
                }
            }}>
            Delete
        </button>
    );
};