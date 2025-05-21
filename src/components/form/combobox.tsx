import { Controller, Control } from "react-hook-form"
import FieldLabel from "./form-label"
import FieldError from "./form-error"
import { Combobox as ShadcnCombobox } from "@/components/ui/combobox"
import { getNestedValue } from "./input"

type ComboboxProps<T extends Record<string, any>> = {
    name: string
    label?: string
    placeholder?: string
    options: T[] | undefined
    disabled?: boolean
    required?: boolean
    control: Control<any>
    hideError?: boolean
    returnVal?: string
    onAdd?: () => void
    labelKey?: keyof T
    valueKey?: keyof T
    skeletonCount?: number
    isLoading?: boolean
    onSearchChange?: (val: string) => void
}

export function FormCombobox<T extends Record<string, any>>({
    name,
    label,
    options,
    disabled,
    placeholder,
    required,
    control,
    hideError = true,
    returnVal = "id",
    valueKey,
    labelKey,
    onAdd,
    isLoading,
    skeletonCount,
    onSearchChange,
}: ComboboxProps<T>) {
    const error = getNestedValue(control._formState.errors, name)
    return (
        <fieldset className="flex flex-col w-full">
            {label && (
                <FieldLabel
                    htmlFor={name}
                    required={!!required}
                    isError={!!error}
                >
                    {label}
                </FieldLabel>
            )}
            <Controller
                name={name}
                control={control}
                rules={
                    required
                        ? { required: `${label || name}ni kiriting` }
                        : {}
                }
                render={({ field }) => (
                    <ShadcnCombobox
                        options={options}
                        value={field.value || ""}
                        setValue={field.onChange}
                        label={placeholder || label || "Tanlang"}
                        disabled={control._formState.disabled || disabled}
                        isError={!!error}
                        returnVal={returnVal}
                        onAdd={onAdd}
                        valueKey={valueKey}
                        labelKey={labelKey}
                        isLoading={isLoading}
                        skeletonCount={skeletonCount}
                        onSearchChange={onSearchChange}
                    />
                )}
            />
            {!hideError && error && (
                <FieldError>
                    {control._formState.errors[name]?.message as string}
                </FieldError>
            )}
        </fieldset>
    )
}
