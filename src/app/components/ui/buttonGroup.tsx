'use client'
import { cn } from "@/lib/utils";
import { Children, cloneElement, ReactElement } from "react";
interface buttonProps{
    classname?: string
    children: ReactElement<buttonProps>[]

}
export function ButtonGroup({classname, children}: buttonProps) {
    const totalButton = Children.count(children)
    return (
        <div className={cn("flex w-full", classname)}>
            {children.map((child, index) => {
                const isFirstItem = index === 0
                const isLastItem = index === totalButton - 1
                return cloneElement(child, {
                    classname: cn(
                        {
                            "rounded-l-none": !isFirstItem,
                            "rounded-r-none": !isLastItem,
                            "border-l-0": !isFirstItem
                        }, child.props.classname
                    )
                })
            })}
        </div>
    )
}