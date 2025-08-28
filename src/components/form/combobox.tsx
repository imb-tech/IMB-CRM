import { Controller, Control, FieldValues, Path } from "react-hook-form"
import FieldLabel from "./form-label"
import FieldError from "./form-error"
import { Combobox as ShadcnCombobox } from "@/components/ui/combobox"
import { ReactNode } from "react"

type ComboboxProps<TForm extends FieldValues, T extends Record<string, any>> = {
    name: Path<TForm>
    label?: string
    placeholder?: string
    options: T[] | undefined
    disabled?: boolean
    required?: boolean
    control: Control<TForm>
    hideError?: boolean
    onAdd?: () => void
    labelKey?: keyof T
    valueKey?: keyof T
    skeletonCount?: number
    isLoading?: boolean
    onSearchChange?: (val: string) => void
    renderOption?: (item: T) => ReactNode
}

export function FormCombobox<
    TForm extends FieldValues,
    T extends Record<string, any>,
>({
    name,
    label,
    options,
    disabled,
    placeholder,
    required,
    control,
    hideError = false,
    valueKey,
    labelKey,
    onAdd,
    isLoading,
    skeletonCount,
    onSearchChange,
    renderOption
}: ComboboxProps<TForm, T>) {
    return (
        <fieldset className="flex flex-col w-full">
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
                            >
                                {label}
                            </FieldLabel>
                        )}

                        <ShadcnCombobox
                            options={options}
                            value={field.value || null}
                            setValue={field.onChange}
                            label={placeholder || label || "Tanlang"}
                            disabled={control._formState.disabled || disabled}
                            isError={!!fieldState.error}
                            onAdd={onAdd}
                            valueKey={valueKey}
                            labelKey={labelKey}
                            isLoading={isLoading}
                            skeletonCount={skeletonCount}
                            onSearchChange={onSearchChange}
                            renderOption={renderOption}
                        />

                        {!hideError && fieldState.error?.message && (
                            <FieldError>
                                {fieldState.error.message}
                            </FieldError>
                        )}
                    </>
                )}
            />
        </fieldset>
    )
}
