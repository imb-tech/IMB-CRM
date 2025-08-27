import { useFormContext } from "react-hook-form"
import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { Mouse } from "lucide-react"
import InputText from "@/components/custom/input-text"

export function FormBuilderStyling() {
    const form = useFormContext<FormConfig>()

    const watchedValues = form.watch()

    return (
        <div className="space-y-2 mt-4 bg-background p-4 rounded-lg">
            <div className="flex  items-center gap-3 justify-between">
                <div className="flex  items-center gap-3">
                    <span className="bg-orange-500/10 rounded-lg p-2 text-orange-500">
                        <Mouse size={20} />
                    </span>
                    <p>
                        {watchedValues.extra_data.submit_text} {"tugmasi"}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span>{"Asosiy rang"}</span>
                    <FormInput
                        id="primaryColor"
                        type="color"
                        methods={form}
                        name="extra_data.primary_color"
                        className="w-6 h-6 !px-[1px] !py-0 border-0 shadow-sm appearance-none rounded cursor-pointer"
                        wrapperClassName={"h-6 w-6 "}
                    />
                </div>
            </div>
            <Button
                type="button"
                className="w-full h-11 justify-center text-white font-semibold shadow-lg hover:shadow-xl "
                style={{
                    background: `linear-gradient(135deg, ${watchedValues.extra_data.primary_color}, ${watchedValues.extra_data.primary_color}dd)`,
                }}
            >
                <InputText
                    methods={form}
                    name="extra_data.submit_text"
                    label={watchedValues.extra_data.submit_text}
                    className={"text-center"}
                    classNameLabel={"justify-center"}
                />
            </Button>
            <div className="pt-2">
                <FormInput
                    label={"Muvaffaqiyat xabari"}
                    methods={form}
                    name="successMessage"
                />
            </div>
        </div>
    )
}
