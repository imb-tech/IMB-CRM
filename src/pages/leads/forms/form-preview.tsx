import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select2"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { PhoneInput } from "react-international-phone"
import { useFormContext } from "react-hook-form"

export function FormPreview() {
    const [submitStatus, setSubmitStatus] = useState<
        "idle" | "success" | "error" | "loading"
    >("idle")

    const form = useFormContext<FormConfig>()

    const watchedValues = form.watch()

    const handleSubmit = async () => {
        setSubmitStatus("loading")

        await new Promise((resolve) => setTimeout(resolve, 1000))

        setSubmitStatus("success")
    }

    const renderField = (field: LeadFormField) => {
        switch (field.type) {
            case "input":
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
                        <Input
                            id={field.id}
                            placeholder={`${field.placeholder}`}
                            className="border-slate-200 focus:border-indigo-400 text-slate-700 focus:ring-indigo-400/20 transition-all duration-300 !bg-white"
                            fullWidth
                        />
                    </div>
                )

            case "textarea":
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
                        <Textarea
                            id={field.id}
                            placeholder={`${field.placeholder}`}
                            rows={4}
                            className="border-none focus:border-none focus:border-indigo-400 text-slate-700 focus:ring-indigo-400/20 transition-all duration-300 resize-none !bg-white"
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
                        <Select>
                            <SelectTrigger className="border-none focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300 !bg-white !text-black active:text-black data-[state=open]:text-black">
                                <SelectValue
                                    placeholder="Tanlang..."
                                    className="text-black hover:!text-black data-[state=checked]:!text-black"
                                />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-none">
                                {field?.extra_data.options?.map(
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
                    <div key={field.id} className="space-y-4 bg-white p-3">
                        <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            {field.label}
                            {field.required && (
                                <span className="text-red-500">*</span>
                            )}
                        </Label>
                        <RadioGroup>
                            {field?.extra_data.options?.map(
                                (option: string, index: number) => (
                                    <div
                                        key={index}
                                        className="flex items-center pl-2 gap-2 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                                    >
                                        <RadioGroupItem
                                            value={option}
                                            id={`${field.id}-${index}`}
                                        />
                                        <Label
                                            htmlFor={`${field.id}-${index}`}
                                            className="text-sm text-slate-700 cursor-pointer"
                                        >
                                            {option}
                                        </Label>
                                    </div>
                                ),
                            )}
                        </RadioGroup>
                    </div>
                )

            case "checkbox":
                return (
                    <div key={field.id} className="bg-white p-3">
                        <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            {field.label}
                            {field.required && (
                                <span className="text-red-500">*</span>
                            )}
                        </Label>
                        <div className="flex flex-col pl-2 pt-3 gap-2">
                            {field?.extra_data.options?.map(
                                (option: string, index: number) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                                    >
                                        <Checkbox id={`${field.id}-${index}`} />
                                        <Label
                                            htmlFor={`${field.id}-${index}`}
                                            className="text-sm text-slate-700 cursor-pointer"
                                        >
                                            {option}
                                        </Label>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                )

            case "phone":
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
                        <PhoneInput
                            inputProps={{
                                id: field.id,
                            }}
                            className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-400/20 transition-all duration-300 !bg-white"
                            inputClassName="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20 transition-all duration-300 !bg-white !px-3 w-full !h-10"
                            countrySelectorStyleProps={{
                                className: "!hidden",
                            }}
                            value={field.placeholder}
                            inputStyle={{
                                borderRadius: "8px",
                            }}
                            defaultCountry="uz"
                            style={{
                                borderRadius: "8px",
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
            <div className={cn("space-y-6")}>
                <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden">
                    <CardContent className="pt-8 pb-8">
                        <div className="text-center space-y-6">
                            <div className="relative">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                                    <CheckCircle className="w-10 h-10 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-green-800 mb-2">
                                    {watchedValues.successMessage}
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
                            >
                                {watchedValues.successMessage2}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className={cn("space-y-6")}>
            <Card className="border-0 shadow-xl bg-card-foreground backdrop-blur-sm overflow-hidden">
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
                <CardContent className="lg:p-8 p-4">
                    <div className="space-y-6">
                        {watchedValues.fields.map(renderField)}

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
                            type="button"
                            className="w-full h-11 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                            onClick={handleSubmit}
                            style={{
                                background: `linear-gradient(135deg, ${watchedValues.extra_data.primary_color}, ${watchedValues.extra_data.primary_color}dd)`,
                            }}
                        >
                            {submitStatus === "loading" ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                                    {"Yuklanmoqda..."}
                                </>
                            ) : (
                                watchedValues.extra_data.submit_text
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
