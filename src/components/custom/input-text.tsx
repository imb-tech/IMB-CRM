import React, { useState } from "react"
import FormInput from "../form/input"
import { FieldValues, Path, UseFormReturn } from "react-hook-form"
import { Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import { ClassNameValue } from "tailwind-merge"

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label: string | undefined
    className?: ClassNameValue
    classNameLabel?: ClassNameValue
}

function InputText<IForm extends FieldValues>({
    methods,
    name,
    label,
    classNameLabel,
    className,
}: IProps<IForm> & React.InputHTMLAttributes<HTMLInputElement>) {
    const [state, setState] = useState<"input" | "text">("text")

    const handleBlur = () => {
        const value = methods.getValues(name)
        if (!value && label !== undefined) {
            methods.setValue(name, label as any)
        }
        setState("text")
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            e.currentTarget.blur()
        }
    }

    return state === "input" ? (
        <FormInput
            className={cn(
                "h-[28px] placeholder:text-[14px] !p-0 !pl-1  focus:border-none focus-visible:ring-0 !bg-transparent 2xl:placeholder:text-sm",
                className,
            )}
            wrapperClassName={"h-[29px]"}
            methods={methods}
            name={name}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
        />
    ) : (
        <div
            className={cn(
                "p-1 cursor-pointer flex items-center gap-1.5 w-full 2xl:text-sm text-[14px] ",
                classNameLabel,
            )}
            onClick={() => {
                setState("input")
                if (label !== undefined) {
                    methods.setValue(name, label as any)
                }
            }}
        >
            <span> {label}</span> <Pencil size={12} />
        </div>
    )
}

export default InputText
