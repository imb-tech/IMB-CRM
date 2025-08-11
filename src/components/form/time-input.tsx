import { cn } from "@/lib/utils"
import {
    FieldValues,
    Path,
    PathValue,
    RegisterOptions,
    UseFormReturn,
} from "react-hook-form"
import { ClassNameValue } from "tailwind-merge"
import { Input } from "../ui/input"
import FieldError from "./form-error"
import FieldLabel from "./form-label"
import { Clock } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { useMemo } from "react"

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label?: string
    required?: boolean
    registerOptions?: RegisterOptions<IForm>
    wrapperClassName?: ClassNameValue
    hideError?: boolean
    prefixIcon?: React.ReactNode
    uppercase?: boolean // Added new prop
}

export function getNestedValue(obj: any, path: string): any {
    return path.split(".").reduce((acc, key) => acc?.[key], obj)
}

export function FormTimeInput<IForm extends FieldValues>({
    methods,
    name,
    label,
    required = false,
    registerOptions,
    wrapperClassName,
    className,
    type = "text",
    hideError = false,
    uppercase = false,
    ...props
}: IProps<IForm> & React.InputHTMLAttributes<HTMLInputElement>) {
    const {
        register,
        formState: { errors },
    } = methods
    type Value = PathValue<IForm, Path<IForm> & (string | undefined)>

    const error = getNestedValue(errors, name)

    const reg = register(name, {
        required: required ? `${label}ni kiriting` : false,
        ...(uppercase && {
            setValueAs: (value: string) => value?.toUpperCase(),
        }),
        ...registerOptions,
    })

    const value = methods.watch(name)?.slice?.(0, 5)
    const hourVal = useMemo(() => value?.split(":")?.[0] ?? "23", [value])
    const minutesVal = useMemo(() => value?.split(":")?.[1] ?? "00", [value])

    function handleTimeChange(type: "hour" | "minute", value: string) {
        if (type === "hour") {
            methods.setValue(name, `${value}:${minutesVal}` as Value)
        } else if (type === "minute") {
            methods.setValue(name, `${hourVal}:${value}` as Value)
        }
    }

    return (
        <fieldset
            className={cn(
                "flex flex-col w-full justify-between",
                wrapperClassName,
            )}
        >
            {label && (
                <FieldLabel
                    htmlFor={name}
                    required={required}
                    isError={error}
                    className="text-xs text-muted-foreground"
                >
                    {label}
                </FieldLabel>
            )}
            <DropdownMenu>
                <Input
                    type="time"
                    placeholder={props.placeholder || label}
                    {...reg}
                    {...props}
                    id={name}
                    fullWidth
                    prefixIcon={
                        <DropdownMenuTrigger asChild>
                            <Clock size={14} />
                        </DropdownMenuTrigger>
                    }
                    className={cn(
                        error && label ?
                            "border-destructive focus:border-border !ring-destructive"
                        :   "",
                        uppercase && "uppercase placeholder:capitalize", // Add uppercase class for visual feedback
                        className,
                        "no-time-icon pr-1 pl-6",
                    )}
                />

                <DropdownMenuContent className="mt-2" side="bottom">
                    <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                        <ScrollArea className="w-64 sm:w-auto">
                            <div className="flex sm:flex-col p-2">
                                {Array.from({ length: 24 }, (_, i) =>
                                    i.toString().padStart(2, "0"),
                                )
                                    .reverse()
                                    .map((hour) => (
                                        <Button
                                            key={hour}
                                            size="icon"
                                            variant={
                                                hourVal === hour ? "default" : (
                                                    "ghost"
                                                )
                                            }
                                            className="sm:w-full shrink-0 aspect-square"
                                            onClick={() =>
                                                handleTimeChange(
                                                    "hour",
                                                    hour.toString(),
                                                )
                                            }
                                        >
                                            {hour}
                                        </Button>
                                    ))}
                            </div>
                            <ScrollBar
                                orientation="horizontal"
                                className="sm:hidden"
                            />
                        </ScrollArea>
                        <ScrollArea className="w-64 sm:w-auto">
                            <div className="flex sm:flex-col p-2">
                                {Array.from(
                                    {
                                        length:
                                            props.step ?
                                                60 / (Number(props.step) / 60)
                                            :   12,
                                    },
                                    (_, i) =>
                                        (
                                            i *
                                            (props.step ?
                                                Number(props.step) / 60
                                            :   5)
                                        )
                                            .toString()
                                            .padStart(2, "0"),
                                ).map((minute) => (
                                    <Button
                                        key={minute}
                                        size="icon"
                                        variant={
                                            minutesVal === minute ? "default"
                                            :   "ghost"
                                        }
                                        className="sm:w-full shrink-0 aspect-square"
                                        onClick={() =>
                                            handleTimeChange(
                                                "minute",
                                                minute.toString(),
                                            )
                                        }
                                    >
                                        {minute}
                                    </Button>
                                ))}
                            </div>
                            <ScrollBar
                                orientation="horizontal"
                                className="sm:hidden"
                            />
                        </ScrollArea>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
            {!hideError && error?.message && (
                <FieldError>{error?.message as string}</FieldError>
            )}
        </fieldset>
    )
}

export default FormTimeInput
