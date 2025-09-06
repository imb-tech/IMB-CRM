import { cn } from "@/lib/utils"
import { useRef, useState } from "react"
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form"
import { Input } from "../ui/input"

type Props<T extends Record<string, any>> = {
    options?: T[]
    onSearchChange?: (v: string) => void
    handleSelect?: (v: string) => void
    labelKey?: keyof T
    valueKey?: keyof T
    phoneKey?: keyof T
    selectedValues: number[]
}

export default function StudentSelector<T extends Record<string, any>>({
    options,
    onSearchChange,
    handleSelect,
    labelKey = "full_name",
    valueKey = "id",
    phoneKey = "phone",
    selectedValues,
}: Props<T>) {
    const rf = useRef<NodeJS.Timeout>()
    const [open, setOpen] = useState(false)

    function onValueChange(v: string) {
        if (onSearchChange) {
            if (rf.current) {
                clearTimeout(rf.current)
            }
            rf.current = setTimeout(() => {
                onSearchChange(v)
            }, 300)
        }
    }

    return (
        <div className="w-full relative">
            <Input
                autoComplete="off"
                placeholder="O'quvchini qidiring"
                onFocus={() => setOpen(true)}
                fullWidth
                onBlurCapture={() =>
                    setTimeout(() => {
                        setOpen(false)
                    }, 200)
                }
                onChange={(v) => onValueChange(v.target.value)}
            />
            {open && (
                <div className="bg-secondary p-2 mt-1 rounded-md select-none flex flex-col gap-1 absolute w-full z-20 shadow-md max-h-[300px] overflow-y-auto">
                    <p className="text-muted-foreground text-xs">Natija</p>
                    <div className="flex flex-col gap-1">
                        {options?.map((opt) => (
                            <button
                                type="button"
                                onClick={() => {
                                    handleSelect?.(opt[valueKey])
                                }}
                                className={cn(
                                    "text-start bg-card px-3 py-2 rounded-sm text-sm font-light hover:pl-4 transition-all duration-200 flex group",
                                    selectedValues.includes(opt[valueKey]) ?
                                        "text-primary"
                                        : "",
                                )}
                            >
                                <span className="flex min-w-[30%]">
                                    {opt[labelKey]}
                                </span>
                                <span className="flex-1">{opt[phoneKey]}</span>
                                <span className="opacity-0 group-hover:opacity-100 text-primary">
                                    +
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
