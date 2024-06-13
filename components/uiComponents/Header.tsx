export const Header = (props: any) => {
    return (
        <header className="flex flex-row w-full text-themeColor bg-transparent p-5 justify-between items-center">
            <h1 className='font-bold text-2xl'>{props.title || "BBS"}</h1>
            <div>
                {props.children}
            </div>
        </header>
    );
}