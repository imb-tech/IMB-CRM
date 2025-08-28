import useLeadPipeline from "../use-lead-pipeline"
import { useFormContext } from "react-hook-form"
import { FormSelect } from "@/components/form/select"
import FormInput from "@/components/form/input"
import { FormBuilderFields } from "./form-builder-fields"
import { useGet } from "@/hooks/useGet"

export function FormBuilder() {
    const { data } = useLeadPipeline({})
    const { data: sources } = useGet<Source[]>("leads/common/sources", {
        params: { is_active: true },
    })

    const form = useFormContext<FormConfig>()

    return (
        <div className="h-full relative">
            <div className="space-y-6 mb-4 w-full">
                <div className="flex lg:flex-row flex-col items-center gap-4">
                    <FormSelect
                        control={form.control}
                        name="pipeline"
                        valueKey="id"
                        required
                        label={"Bo'lim"}
                        placeholder={"Qaysi bo'limga ulash kerak"}
                        labelKey="name"
                        options={data ?? []}
                    />
                    <FormSelect
                        control={form.control}
                        name="source"
                        valueKey="id"
                        required
                        label={"Manba"}
                        placeholder={"Lidlar kelish manbasi"}
                        labelKey="name"
                        options={sources ?? []}
                    />
                </div>
                <div className="flex lg:flex-row flex-col  items-center gap-4">
                    <FormInput
                        methods={form}
                        name="name"
                        label={"Form nomi"}
                        placeholder={"Foydalanuvchilarga ko'rinadi"}
                        required
                    />
                    <FormInput
                        methods={form}
                        name="desc"
                        label={"Form tavsifi"}
                        placeholder={"Form haqida qo'shimcha ma'lumot"}
                    />
                </div>
            </div>

            <FormBuilderFields />
        </div>
    )
}
