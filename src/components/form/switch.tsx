import { Controller, Control, FieldValues, Path } from "react-hook-form"
import FieldLabel from "./form-label"
import FieldError from "./form-error"
import { cn } from "@/lib/utils"
import { ClassNameValue } from "tailwind-merge"
import { ReactNode } from "@tanstack/react-router"
import { Switch } from "../ui/switch"

export function FormSwitch<TForm extends FieldValues>({
    name,
    label,
    disabled,
    control,
    required,
    hideError = true,
    wrapperClass,
    className,
}: thisProps<TForm>) {
    return (
        <div>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <div
                        className={cn(
                            "flex items-center gap-2 cursor-pointer",
                            wrapperClass,
                        )}
                    >
                        <Switch
                            checked={!!field.value}
                            onCheckedChange={field.onChange}
                            disabled={disabled || field.disabled}
                            className={cn("-mt-1", className)}
                            id={name}
                        />
                        <FieldLabel
                            htmlFor={name}
                            required={!!required}
                            isError={!!control._formState.errors?.[name]}
                        >
                            {label}
                        </FieldLabel>
                    </div>
                )}
            />
            {!hideError && control._formState.errors?.[name] && (
                <FieldError>
                    {control._formState.errors[name]?.message as string}
                </FieldError>
            )}
        </div>
    )
}

interface thisProps<TForm extends FieldValues> {
    name: Path<TForm>
    label?: string | ReactNode
    disabled?: boolean
    control: Control<TForm>
    required?: boolean
    hideError?: boolean
    wrapperClass?: ClassNameValue
    className?: ClassNameValue
}
