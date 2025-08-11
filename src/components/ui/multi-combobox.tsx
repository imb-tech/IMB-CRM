import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"
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
import { useRef, useState } from "react"
import { ClassNameValue } from "tailwind-merge"
import { Skeleton } from "./skeleton"
import { DEBOUNCETIME } from "@/constants/default"

type ComboboxProps<T extends Record<string, any>> = {
    options: T[] | undefined
    values: (string | number | null)[]
    setValues: (val: any) => void
    onAdd?: () => void
    label: string
    isLoading?: boolean
    isError?: boolean
    className?: ClassNameValue
    labelKey?: keyof T
    skeletonCount?: number
    valueKey?: keyof T
    onSearchChange?: (val: string) => void
    addButtonProps?: ButtonProps
    allSelected?: boolean
    isSearch?: boolean
}

export function MultiCombobox<T extends Record<string, any>>({
    options,
    values,
    setValues,
    label,
    onAdd,
    isError,
    labelKey = "label",
    valueKey = "value",
    className,
    isLoading,
    skeletonCount = 5,
    onSearchChange,
    addButtonProps,
    allSelected = false,
    isSearch = true,
}: ComboboxProps<T>) {
    const [open, setOpen] = useState(false)

    const handleSelect = (option: T) => {
        const newValue = option[valueKey]
        const updatedValues =
            values?.find((v) => v === newValue) ?
                values?.filter((v) => v !== newValue)
            :   (values || []).concat(newValue)
        setValues(updatedValues)
    }
    const rf = useRef<NodeJS.Timeout>()

    const handleClickAdd = () => {
        onAdd ? onAdd?.() : undefined
    }

    const selectedSet = new Set(values)
    const sortedOptions = options?.slice().sort((a, b) => {
        const aSelected = selectedSet.has(a[valueKey])
        const bSelected = selectedSet.has(b[valueKey])
        return (
            aSelected === bSelected ? 0
            : aSelected ? -1
            : 1
        )
    })

    const handleSelectAll = () => {
        const updatedValues = options?.map((item) => item[valueKey])
        setValues(updatedValues)
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

    return (
        <Popover modal open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-full relative justify-between !bg-secondary overflow-hidden px-2 hover:bg-card font-normal text-gray-400 hover:text-gray-400 items-center",
                        values && "font-medium text-foreground",
                        isError && "!border-destructive border",
                        className,
                    )}
                    {...addButtonProps}
                >
                    <div className="flex items-center gap-2">
                        <ChevronDown className=" h-4 w-4  text-primary opacity-50 " />
                        <span className="line-clamp-1 break-all whitespace-pre">
                            {values?.length && values?.length < 3 ?
                                options
                                    ?.filter((d) =>
                                        values?.includes(d[valueKey]),
                                    )
                                    .map((d) => d[labelKey])
                                    .join(", ")
                            : values?.length ?
                                values?.length + " ta tanlandi"
                            :   label}
                        </span>
                    </div>
                    {!!values?.length && (
                        <span
                            className={cn(
                                "absolute cursor-pointer text-destructive top-1/2 -translate-y-1/2 right-1 p-1",
                                onAdd && "right-8",
                            )}
                        >
                            <X
                                className="text-red-500"
                                width={16}
                                onClick={() => setValues([])}
                            />
                        </span>
                    )}
                    {onAdd && (
                        <span
                            onClick={(e) => {
                                e.stopPropagation()
                                handleClickAdd()
                            }}
                            className="dark:bg-primary/10 bg-slate-200 hover:bg-slate-300 hover:scale-105 p-1 rounded-full"
                        >
                            <Plus className=" h-4 w-4 shrink-0  text-primary" />
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command shouldFilter={onSearchChange ? false : true}>
                    {isSearch && (
                        <CommandInput
                            onValueChange={onValueChange}
                            placeholder={label}
                            className="h-10"
                        />
                    )}
                    <CommandList>
                        <CommandEmpty>Mavjud emas</CommandEmpty>
                        <CommandGroup className="!overflow-y-scroll">
                            {sortedOptions?.map((d, i: number) => (
                                <CommandItem
                                    key={i}
                                    onSelect={() => handleSelect(d)}
                                >
                                    {d[labelKey]}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            values?.includes(d[valueKey]) ?
                                                "opacity-100"
                                            :   "opacity-0",
                                        )}
                                    />
                                </CommandItem>
                            ))}

                            {allSelected && (
                                <>
                                    <CommandItem className="py-5">
                                        {" "}
                                    </CommandItem>
                                    <div
                                        className="absolute bg-card hover:bg-secondary bottom-0 cursor-pointer py-1.5 text-center rounded-b-md right-0 left-0  z-30 border"
                                        onClick={handleSelectAll}
                                    >
                                        Barchasini tanlash
                                    </div>
                                </>
                            )}

                            {isLoading ?
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
                            :   null}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
