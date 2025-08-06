import { Label } from "@/components/ui/label"
import { useFormContext } from "react-hook-form"
import FormInput from "@/components/form/input"
import { FormSelect } from "@/components/form/select"

export function FormBuilderStyling() {
    const form = useFormContext<FormConfig>()

    return (
        <div className="h-full overflow-y-auto space-y-6 mt-0 px-1 no-scrollbar">
            <div className="space-y-6">
                <div className="space-y-1">
                    <Label
                        htmlFor="primaryColor"
                        className="text-sm font-medium text-muted-foreground"
                    >
                        Asosiy rang
                    </Label>
                    <div className="flex gap-3">
                        <FormInput
                            id="primaryColor"
                            type="color"
                            methods={form}
                            name="extra_data.primary_color"
                            className="w-full p-1 border-0 shadow-sm rounded-lg"
                        />
                    </div>
                </div>
                <FormSelect
                    label="Radiuslar"
                    options={[
                        { value: "4px", label: "Kichik (4px)" },
                        { value: "8px", label: "O'rta (8px)" },
                        { value: "12px", label: "Katta (12px)" },
                        { value: "16px", label: "Juda katta (16px)" },
                    ]}
                    control={form.control}
                    name="extra_data.borderRadius"
                />
            </div>

            <div className="space-y-6">
                <FormInput
                    label="Yuborish tugmasi matni"
                    methods={form}
                    name="extra_data.submit_text"
                />
                <FormInput
                    label="Muvaffaqiyat xabari"
                    methods={form}
                    name="successMessage"
                />
            </div>
        </div>
    )
}
