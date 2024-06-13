"use client"

import { ReactNode } from "react";

export const Main = (props: { children: ReactNode | ReactNode[], title?: string }) => {
    return (
        <main className="flex min-h-screen flex-col items-center">
            <title>
                {props.title || "Untitled"}
            </title>
            {props.children}
        </main>
    );
}

/**
 * IF conditional rendering frame.
 * Only render if the condition is satisfied.
 * @param {*} props 
 * @prop {bool} condition   Rendering condition
 * @returns 
 */
export const IF = (props: { condition: boolean, children: ReactNode | ReactNode[] }) => {
    return (
        props.condition && (
            props.children
        )
    );
}

/**
 * IFELSE conditional rendering frame.
 * Render the first child element if condition is satisfied, otherwise render the second.
 * @example
 * <IFELSE condition={val}>
 *      <div>...</div>   <!--   rendered when val is true   -->
 *      <div>...</div>   <!--   rendered when val is false  -->
 * </IFELSE>
 * @param {*} props
 * @prop {bool} val   Rendering condition.
 * @returns 
 */
export const IFELSE = (props: { condition: boolean, children: ReactNode[] }) => {
    return (
        props.condition ? (
            props.children[0]
        ) : (
            props.children[1]
        )
    );
}