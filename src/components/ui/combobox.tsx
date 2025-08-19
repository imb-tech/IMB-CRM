import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CheckIcon, ChevronDown, Plus, X } from "lucide-react"
import { ClassNameValue } from "tailwind-merge"
import { useRef, useState } from "react"
import { Skeleton } from "./skeleton"
import { DEBOUNCETIME } from "@/constants/default"

export type ComboboxProps<T extends Record<string, any>> = {
    options: T[] | undefined
    value: string | number | null
    setValue: (val: any) => void
    onAdd?: () => void
    label: string
    disabled?: boolean
    isLoading?: boolean
    isError?: boolean
    returnVal?: string
    className?: ClassNameValue
    labelKey?: keyof T
    valueKey?: keyof T
    skeletonCount?: number
    onSearchChange?: (val: string) => void
}

export function Combobox<T extends Record<string, any>>({
    options,
    value,
    setValue,
    label,
    disabled,
    onAdd,
    isError,
    labelKey = "label",
    valueKey = "value",
    className,
    isLoading,
    skeletonCount = 5,
    onSearchChange,
}: ComboboxProps<T>) {
    const [open, setOpen] = useState(false)

    const handleSelect = (option: T) => {
        const returnValue = option[valueKey]
        setValue(returnValue)
        setOpen(false)
    }

    const rf = useRef<NodeJS.Timeout>()

    const handleClickAdd = () => {
        onAdd ? onAdd?.() : undefined
    }

    function onValueChange(v: string) {
        if (onSearchChange) {
            if (rf.current) {
                clearTimeout(rf.current)
            }
            rf.current = setTimeout(() => {
                onSearchChange(v)
            }, DEBOUNCETIME)
        }
    }

    const sortedOptions = options?.sort((a, b) => {
        const isASelected = a[valueKey] == value
        const isBSelected = b[valueKey] == value
        return isASelected === isBSelected ? 0 : isASelected ? -1 : 1
    })

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"secondary"}
                    role="combobox"
                    className={cn(
                        "w-full justify-between   px-2 hover:bg-background font-normal text-gray-400 hover:text-gray-400",
                        value && "font-medium text-foreground",
                        isError && "border border-destructive",
                        className,
                    )}
                    disabled={disabled}
                >
                    <div className="flex items-center gap-2 ">
                        <ChevronDown className=" h-4 w-4  text-primary opacity-50 " />
                        {value
                            ? options
                                  ?.find((d) => d[valueKey] == value)
                                  ?.[labelKey]?.toString() || value
                            : label}
                    </div>
                    {onAdd && <span
                        onClick={(e) => {
                            e.stopPropagation()
                            handleClickAdd()
                        }}
                        className="dark:bg-card bg-slate-200 hover:bg-slate-300 hover:scale-105 p-1 rounded-full"
                    >
                        <Plus className=" h-4 w-4 shrink-0  text-primary" />
                    </span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command shouldFilter={onSearchChange ? false : true}>
                    <CommandInput
                        onValueChange={onValueChange}
                        placeholder={label}
                    />
                    {!!value && (
                        <span className="absolute cursor-pointer text-red-600 top-1.5 right-1 p-1">
                            <X
                                className="text-red-600"
                                width={16}
                                onClick={() => setValue(null)}
                            />
                        </span>
                    )}
                    <CommandList>
                        <CommandEmpty>Mavjud emas</CommandEmpty>
                        <CommandGroup>
                            {sortedOptions?.map((d, i) => (
                                <CommandItem
                                    key={i}
                                    onSelect={() => handleSelect(d)}
                                >
                                    {d[labelKey]}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value == d[valueKey]
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                </CommandItem>
                            ))}

                            {isLoading ? (
                                <div className="space-y-1">
                                    {Array.from({ length: skeletonCount }).map(
                                        (_, index) => (
                                            <CommandItem
                                                key={index}
                                                className="p-0"
                                            >
                                                <Skeleton className="w-full h-7" />
                                            </CommandItem>
                                        ),
                                    )}
                                </div>
                            ) : null}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
