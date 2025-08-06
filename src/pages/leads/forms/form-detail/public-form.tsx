import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select2"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import FormInput from "@/components/form/input"
import PhoneField from "@/components/form/phone-field"
import FormRadioGroup from "@/components/form/radio-group"
import FormTextarea from "@/components/form/textarea"
import { usePost } from "@/hooks/usePost"
import { toast } from "sonner"

export function PublicForm() {
    const [submitStatus, setSubmitStatus] = useState<
        "idle" | "success" | "error" | "loading"
    >("idle")

    const form = useFormContext<FormConfig>()
    const { mutate, isPending } = usePost()

    const { fields } = useFieldArray({
        control: form.control,
        name: "fields",
    })

    const watchedValues = form.watch()

    const handleSubmit = async (vals: FormConfig) => {
        for (const element of vals.fields) {
            if (element.required && !element.value) {
                return toast.error(element.label + " kiritish majburiy")
            }
        }
        const cfg = {
            form: vals.id,
            name: vals.fields?.find(
                (f) =>
                    f.extra_data.is_fixed && f.extra_data.fixed_name === "name",
            )?.value,
            phone: vals.fields?.find(
                (f) =>
                    f.extra_data.is_fixed &&
                    f.extra_data.fixed_name === "phone",
            )?.value,
            submissions: vals.fields?.map((f) => ({
                form_field: f.id,
                answer: f.value,
            })),
        }
        mutate("leads/forms/submit", cfg, {
            onSuccess() {
                form.reset()
                setSubmitStatus("success")
            },
        })
    }

    const renderField = (field: LeadFormField, index: number) => {
        switch (field.type) {
            case "input":
                return (
                    <div key={field.id} className="text-black">
                        <FormInput
                            methods={form}
                            label={field.label}
                            required={field.required}
                            name={`fields.${index}.value`}
                            style={{
                                borderRadius:
                                    watchedValues.extra_data.borderRadius,
                            }}
                            className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-400/20 transition-all duration-300 !bg-white"
                        />
                    </div>
                )

            case "textarea":
                return (
                    <div key={field.id} className="space-y-1 text-black">
                        <FormTextarea
                            methods={form}
                            required={field.required}
                            placeholder={field.placeholder}
                            label={field.label}
                            name={`fields.${index}.value`}
                            className="border-none focus:border-none focus:border-indigo-400 focus:ring-indigo-400/20 transition-all duration-300 resize-none !bg-white placeholder:text-muted-foreground"
                            style={{
                                borderRadius:
                                    watchedValues.extra_data.borderRadius,
                            }}
                        />
                    </div>
                )

            case "select":
                return (
                    <div key={field.id} className="space-y-1">
                        <Label
                            htmlFor={field.id}
                            className="flex items-center gap-2 text-sm font-medium text-slate-700"
                        >
                            {field.label}
                            {field.required && (
                                <span className="text-red-500">*</span>
                            )}
                        </Label>
                        <Select
                            required={field.required}
                            value={field.value?.toString()}
                            onValueChange={(v) =>
                                form.setValue(`fields.${index}.value`, v)
                            }
                        >
                            <SelectTrigger
                                className="border-none focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300 !bg-white !text-black active:text-black data-[state=open]:text-black"
                                style={{
                                    borderRadius:
                                        watchedValues.extra_data.borderRadius,
                                }}
                            >
                                <SelectValue
                                    placeholder="Tanlang..."
                                    className="text-black hover:!text-black data-[state=checked]:!text-black"
                                />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-none">
                                {field?.extra_data?.options?.map(
                                    (option: string, index: number) => (
                                        <SelectItem
                                            key={index}
                                            value={option}
                                            className="text-black hover:!text-black data-[state=checked]:!text-black"
                                        >
                                            {option}
                                        </SelectItem>
                                    ),
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                )

            case "radio":
                return (
                    <div
                        key={field.id}
                        className="space-y-4 bg-white p-3 text-black"
                        style={{
                            borderRadius: watchedValues.extra_data.borderRadius,
                        }}
                    >
                        <FormRadioGroup
                            label={field.label}
                            className="pt-4"
                            itemClassName="text-black/80"
                            methods={form}
                            name={`fields.${index}.value`}
                            options={
                                field?.extra_data?.options?.map((v) => ({
                                    id: v,
                                    name: v,
                                })) ?? []
                            }
                            required={field.required}
                        />
                    </div>
                )

            case "checkbox":
                return (
                    <div
                        key={field.id}
                        className="bg-white p-3"
                        style={{
                            borderRadius: watchedValues.extra_data.borderRadius,
                        }}
                    >
                        <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            {field.label}
                            {field.required && (
                                <span className="text-red-500">*</span>
                            )}
                        </Label>
                        <Controller
                            control={form.control}
                            name={`fields.${index}.value`}
                            render={({ field: { onChange, value } }) => (
                                <div className="flex flex-col pl-2 pt-3 gap-2">
                                    {field.extra_data.options?.map(
                                        (option: string, idx: number) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-2"
                                            >
                                                <Checkbox
                                                    id={`${field.id}-${idx}`}
                                                    checked={(
                                                        value as string[]
                                                    )?.includes(option)}
                                                    onCheckedChange={(
                                                        checked,
                                                    ) => {
                                                        if (checked) {
                                                            onChange([
                                                                ...((value as string[]) ??
                                                                    []),
                                                                option,
                                                            ])
                                                        } else {
                                                            onChange(
                                                                (
                                                                    (value as string[]) ??
                                                                    []
                                                                ).filter(
                                                                    (v) =>
                                                                        v !==
                                                                        option,
                                                                ),
                                                            )
                                                        }
                                                    }}
                                                />
                                                <Label
                                                    htmlFor={`${field.id}-${idx}`}
                                                    className="text-sm text-slate-700 cursor-pointer"
                                                >
                                                    {option}
                                                </Label>
                                            </div>
                                        ),
                                    )}
                                </div>
                            )}
                        />
                    </div>
                )

            case "phone":
                return (
                    <div key={field.id} className="text-black">
                        <PhoneField
                            methods={form}
                            name={`fields.${index}.value`}
                            label={field.label}
                            required={field.required}
                            inputProps={{
                                id: field.id,
                                required: field.required,
                            }}
                            className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-400/20 transition-all duration-300 !bg-white "
                            inputClassName="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20 transition-all duration-300 !bg-white !px-3 w-full !h-10 !text-black"
                            countrySelectorStyleProps={{
                                className: "!hidden",
                            }}
                            defaultCountry="uz"
                            style={{
                                borderRadius:
                                    watchedValues.extra_data.borderRadius,
                            }}
                            inputStyle={{
                                borderRadius:
                                    watchedValues.extra_data.borderRadius,
                            }}
                        />
                    </div>
                )

            default:
                return null
        }
    }

    if (submitStatus === "success") {
        return (
            <div className="w-full h-screen bg-blue-400/10 flex items-center justify-center overflow-y-auto no-scrollbar">
                <div
                    className={cn(
                        "space-y-6 min-w-sm mx-auto sm:min-w-md md:min-w-lg",
                    )}
                >
                    <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden sm:min-w-[500px] py-4">
                        <CardContent className="pt-8 pb-8">
                            <div className="text-center space-y-6">
                                <div className="relative">
                                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                                        <CheckCircle className="w-10 h-10 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-green-800 mb-2">
                                        Muvaffaqiyatli yuborildi!
                                    </h3>
                                    <p className="text-green-700 leading-relaxed">
                                        {watchedValues.successMessage}
                                    </p>
                                </div>
                                <Button
                                    onClick={() => {
                                        setSubmitStatus("idle")
                                    }}
                                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                    style={{
                                        borderRadius:
                                            watchedValues.extra_data
                                                .borderRadius,
                                    }}
                                >
                                    Yangi form to'ldirish
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-screen bg-blue-400/10 py-10 overflow-y-auto no-scrollbar">
            <div
                className={cn(
                    "space-y-6 max-w-sm mx-auto sm:max-w-md md:max-w-lg",
                )}
            >
                <Card className="border-0 shadow-md bg-card-foreground backdrop-blur-sm overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/50">
                        <CardTitle className="text-2xl font-bold text-slate-800">
                            {watchedValues.name}
                        </CardTitle>
                        {watchedValues.desc && (
                            <p className="text-slate-600 leading-relaxed">
                                {watchedValues.desc}
                            </p>
                        )}
                    </CardHeader>
                    <CardContent className="p-8">
                        <form
                            className="space-y-6"
                            onSubmit={form.handleSubmit(handleSubmit)}
                        >
                            {fields.map(renderField)}

                            {submitStatus === "error" && (
                                <Alert
                                    variant="destructive"
                                    className="border-0 bg-gradient-to-r from-red-50 to-rose-50"
                                >
                                    <AlertCircle className="h-5 w-5" />
                                    <AlertDescription className="text-red-800 font-medium">
                                        {"watchedValues.errorMessage"}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <Button
                                loading={isPending}
                                type="submit"
                                className="w-full h-12 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                                style={{
                                    background: `linear-gradient(135deg, ${watchedValues.extra_data.primary_color}, ${watchedValues.extra_data.primary_color}dd)`,
                                    borderRadius:
                                        watchedValues.extra_data.borderRadius,
                                }}
                            >
                                {watchedValues.extra_data.submit_text}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
