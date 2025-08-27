import { FormBuilder } from "./form-builder"
import { FormPreview } from "./form-preview"
import { Button } from "@/components/ui/button"
import { usePost } from "@/hooks/usePost"
import { toast } from "sonner"
import { FormProvider, useForm } from "react-hook-form"
import { usePatch } from "@/hooks/usePatch"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"
import FormBuilderAdd from "./form-builder-add"

export const defaultFormConfig: FormConfig = {
    name: "Yangi Form",
    desc: "Form tavsifi",
    fields: [
        {
            id: "fsdkflhsdfjh",
            label: "FIO",
            placeholder: "Abdisamatov Ozodbek Murod o'g'li",
            required: true,
            type: "input",
            extra_data: {
                is_fixed: true,
                fixed_name: "name",
            },
        },
        {
            id: "2io34uyh2e",
            label: "Telefon",
            required: true,
            type: "phone",
            extra_data: {
                is_fixed: true,
                fixed_name: "phone",
            },
        },
    ],
    successMessage: "Form muvaffaqiyatli yuborildi!",
    successMessage2: "Yangi form to'ldirish",
    extra_data: {
        primary_color: "#6366f1",
        submit_text: "Yuborish",
    },
}

export default function CreateAppForm({
    defaultValues,
}: {
    defaultValues?: FormConfig
}) {
    const search = useSearch({ strict: false })
    const navigate = useNavigate()

    function onSuccess() {
        toast.success("Forma saqlandi")
        navigate({ to: "/leads/forms" })
    }

    const { mutate, isPending } = usePost({ onSuccess })
    const { mutate: patch, isPending: isPatching } = usePatch({ onSuccess })

    function handleSubmit(vals: FormConfig) {
        if (!vals.pipeline || !vals.source) {
            toast.error(
                "Bo'lim va manbani tanlaganingizga ishonch hosil qiling",
            )
            return
        }
        const cfg = {
            ...vals,
            fields: undefined,
            form_fields: vals?.fields?.map((field, i) => ({
                ...field,
                id: isNaN(Number(field.id)) ? undefined : field.id,
                placeholder: field.placeholder ? field.placeholder : undefined,
                order: i + 1,
            })),
        }
        if (vals.id) {
            return patch(`leads/forms/${cfg.id}`, cfg)
        }
        mutate("leads/forms/create", cfg)
    }

    const form = useForm<FormConfig>({
        defaultValues: defaultValues ?? {
            ...defaultFormConfig,
            name: defaultFormConfig.name,
            desc: defaultFormConfig.desc,
            fields: defaultFormConfig.fields.map((f) => ({
                ...f,
                placeholder: f?.placeholder ? f.placeholder : undefined,
                label: f.label,
            })),
            extra_data: {
                ...defaultFormConfig.extra_data,
                submit_text: defaultFormConfig.extra_data.submit_text,
            },
            successMessage: defaultFormConfig.successMessage,
            successMessage2: defaultFormConfig.successMessage2,
        },
    })

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="flex items-center gap-3 flex-1 pb-4">
                    <Button
                        onClick={() =>
                            navigate({
                                to: "/leads/forms",
                                search: { pipeline: search?.pipeline },
                            })
                        }
                        size="icon"
                    >
                        <ArrowLeft size={18} />
                    </Button>
                    <h1 className="text-2xl font-bold bg-gradient-to-r">
                        {defaultValues?.name
                            ? "Formani tahrirlash"
                            : "Form yaratish"}
                    </h1>
                </div>

                <div className="flex lg:flex-row flex-col items-start gap-4 w-full">
                    <div className="lg:w-max w-full">
                        <FormBuilderAdd />
                    </div>
                    <div className="grid lg:grid-cols-2 gap-4 w-full">
                        <div className="lg:p-6 p-3  bg-card rounded-md overflow-y-auto ">
                            <FormBuilder />
                        </div>

                        <div className=" lg:p-6 p-3 bg-card flex flex-col justify-between rounded-md overflow-y-auto flex-1">
                            <FormPreview />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <Button loading={isPending || isPatching}>
                        {"Saqlash"}
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}
