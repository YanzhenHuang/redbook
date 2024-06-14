import { ReactNode } from "react";

const basicStyle = "flex flex-row w-full text-themeColor bg-transparent p-5 justify-between items-center";

export const Header = (props: { title: string, children?: ReactNode | ReactNode[], extraStyle?: string }) => {
    return (
        <header className={`${basicStyle} ${props.extraStyle || ""}`}>
            <h1 className='font-bold text-2xl'>{props.title || "BBS"}</h1>
            <div>
                {props.children}
            </div>
        </header>
    );
}