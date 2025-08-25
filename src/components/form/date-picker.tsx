import { DatePicker } from "@/components/ui/datepicker"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { CalendarProps } from "../ui/calendar"
import FieldError from "./form-error"
import FieldLabel from "./form-label"
import { getNestedValue } from "./input"
import { ClassNameValue } from "tailwind-merge"

export function FormDatePicker<TForm extends FieldValues>({
    name,
    label,
    disabled,
    control,
    required = false,
    calendarProps,
    hideError = false,
    placeholder,
    fullWidth,
    className,
}: thisProps<TForm>) {
    const error = getNestedValue(control._formState.errors, name)
    return (
        <fieldset className="flex flex-col w-full">
            {label && (
                <FieldLabel
                    isError={!!error}
                    htmlFor={name}
                    required={required}
                    className="text-xs"
                >
                    {label}
                </FieldLabel>
            )}
            <Controller
                name={name}
                control={control}
                rules={
                    required ? { required: `${label || name}ni kiriting` } : {}
                }
                render={({ field, fieldState }) => (
                    <>
                        <DatePicker
                            calendarProps={{
                                ...calendarProps,
                                defaultMonth:
                                    field.value ?
                                        new Date(field.value)
                                    :   undefined,
                            }}
                            date={
                                field.value ? new Date(field.value) : undefined
                            }
                            setDate={field.onChange}
                            placeholder={placeholder || label}
                            disabled={field.disabled || disabled}
                            fullWidth={fullWidth}
                            className={className}
                            isError={!!fieldState.error}
                        />
                        {!hideError && fieldState.error && (
                            <FieldError className="text-xs">
                                {fieldState.error.message as string}
                            </FieldError>
                        )}
                    </>
                )}
            />
        </fieldset>
    )
}

interface thisProps<TForm extends FieldValues> {
    name: Path<TForm>
    label?: string
    disabled?: boolean
    control: Control<TForm>
    required?: boolean
    calendarProps?: CalendarProps | undefined
    hideError?: boolean
    placeholder?: string
    fullWidth?: boolean
    className?: ClassNameValue
}
