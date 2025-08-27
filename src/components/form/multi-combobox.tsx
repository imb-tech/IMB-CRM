import { Controller, Control, FieldValues, Path } from "react-hook-form"
import FieldLabel from "./form-label"
import FieldError from "./form-error"
import { MultiCombobox as ShadcnCombobox } from "@/components/ui/multi-combobox"
import { ButtonProps } from "../ui/button"

type ComboboxProps<TForm extends FieldValues, T extends FieldValues> = {
    name: Path<TForm>
    label?: string
    placeholder?: string
    options: T[] | undefined
    required?: boolean
    control: Control<TForm>
    hideError?: boolean
    onAdd?: () => void
    labelKey?: keyof T
    valueKey?: keyof T
    skeletonCount?: number
    isLoading?: boolean
    onSearchChange?: (val: string) => void
    addButtonProps?: ButtonProps
    allSelected?: boolean
    isSearch?: boolean
}

export function FormMultiCombobox<
    TForm extends FieldValues,
    T extends FieldValues,
>({
    name,
    label,
    options,
    placeholder,
    required,
    control,
    hideError = true,
    valueKey,
    labelKey,
    onAdd,
    isLoading,
    skeletonCount,
    onSearchChange,
    addButtonProps,
    allSelected = false,
    isSearch = true,
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
                                className="text-xs "
                            >
                                {label}
                            </FieldLabel>
                        )}

                        <ShadcnCombobox
                            options={options}
                            values={field.value}
                            setValues={field.onChange}
                            label={placeholder || label || "Tanlang"}
                            isError={!!fieldState.error}
                            onAdd={onAdd}
                            valueKey={valueKey}
                            labelKey={labelKey}
                            isLoading={isLoading}
                            skeletonCount={skeletonCount}
                            onSearchChange={onSearchChange}
                            allSelected={allSelected}
                            isSearch={isSearch}
                            addButtonProps={{
                                disabled: control._formState.disabled,
                                ...addButtonProps,
                            }}
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
