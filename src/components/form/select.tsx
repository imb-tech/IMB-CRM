import { Controller, Control, FieldValues, Path } from "react-hook-form"
import FieldLabel from "./form-label"
import FieldError from "./form-error"
import Select from "../ui/select"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

type thisProps<TForm extends FieldValues, T extends Record<string, any>> = {
    name: Path<TForm>
    label?: string
    options: T[]
    disabled?: boolean
    required?: boolean
    setValue?: (val: string) => void
    control: Control<TForm>
    hideError?: boolean
    labelKey?: keyof T
    valueKey?: keyof T
    renderOption?: (item: T) => ReactNode
    placeholder?: string
    className?: string
    wrapperClassName?: string
}

export function FormSelect<
    TForm extends FieldValues,
    T extends Record<string, any>,
>({
    name,
    label,
    options,
    disabled,
    required,
    control,
    setValue,
    valueKey,
    labelKey,
    hideError = false,
    renderOption,
    placeholder,
    className,
    wrapperClassName,
}: thisProps<TForm, T>) {
    return (
        <fieldset className={cn("flex flex-col w-full", wrapperClassName)}>
            <Controller
                name={name}
                control={control}
                rules={
                    required ? { required: `${label || name}ni kiriting` } : {}
                }
                render={({ field, fieldState }) => (
                    <>
                        {label && (
                            <FieldLabel
                                htmlFor={name}
                                required={!!required}
                                isError={!!fieldState.error}
                                className="text-xs"
                            >
                                {label}
                            </FieldLabel>
                        )}

                        <Select
                            options={options}
                            label={label || "Tanlang"}
                            placeholder={placeholder}
                            value={field.value}
                            className={cn(
                                fieldState.error && "border-red-600 focus:right-0",
                                className,
                            )}
                            setValue={(val) =>
                                val === "other"
                                    ? setValue?.(val)
                                    : field.onChange(val)
                            }
                            disabled={disabled}
                            labelKey={labelKey}
                            valueKey={valueKey}
                            renderOption={renderOption}
                        />

                        {!hideError && fieldState.error?.message && (
                            <FieldError>{fieldState.error.message}</FieldError>
                        )}
                    </>
                )}
            />
        </fieldset>
    )
}
