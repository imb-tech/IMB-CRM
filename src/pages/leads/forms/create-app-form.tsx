import { useState } from "react"
import { FormBuilder } from "./form-builder"
import { FormPreview } from "./form-preview"
import { DeviceSelector } from "./device-selector"
import { Button } from "@/components/ui/button"
import { usePost } from "@/hooks/usePost"
import { toast } from "sonner"
import { FormProvider, useForm } from "react-hook-form"
import { usePatch } from "@/hooks/usePatch"
import { useNavigate } from "@tanstack/react-router"
import { ArrowLeft, Trash } from "lucide-react"
import DeleteModal from "@/components/custom/delete-modal"
import { useModal } from "@/hooks/useModal"

export const defaultFormConfig: FormConfig = {
    name: "Yangi Form",
    desc: "Form tavsifi",
    fields: [
        {
            id: "fsdkflhsdfjh",
            label: "Ism",
            placeholder: "Ismingiz",
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
        borderRadius: "12px",
        submit_text: "Yuborish",
    },
}

export default function CreateAppForm({
    defaultValues,
}: {
    defaultValues?: FormConfig
}) {
    const navigate = useNavigate()
    const { openModal } = useModal("delete")

    function onSuccess() {
        toast.success("Forma saqlandi")
        navigate({ to: "/leads/forms" })
    }

    const { mutate, isPending } = usePost({ onSuccess })
    const { mutate: patch, isPending: isPatching } = usePatch({ onSuccess })

    const [previewDevice, setPreviewDevice] = useState<
        "mobile" | "tablet" | "desktop"
    >("desktop")

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
                <div className="pb-4">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-3 flex-1">
                            <Button
                                onClick={() => navigate({ to: "/leads/forms" })}
                                size="icon"
                            >
                                <ArrowLeft size={18} />
                            </Button>
                            <h1 className="text-2xl font-bold bg-gradient-to-r">
                                {defaultValues?.name ?
                                    "Formani tahrirlash"
                                :   "Form yaratish"}
                            </h1>
                        </div>
                        <DeviceSelector
                            device={previewDevice}
                            onDeviceChange={setPreviewDevice}
                        />
                        <Button
                            loading={isPending || isPatching}
                            className="bg-primary/80 hover:bg-primary text-white"
                        >
                            {"Saqlash"}
                        </Button>
                        <Button
                            size="icon"
                            className="text-red-500 bg-red-500/10 hover:bg-red-500/20"
                            type="button"
                            onClick={openModal}
                        >
                            <Trash />
                        </Button>
                    </div>
                </div>

                <div>
                    <div className="flex gap-4 h-[calc(100vh-140px)]">
                        <div className="p-6 bg-card rounded-md overflow-y-auto w-[500px]">
                            <FormBuilder />
                        </div>

                        <div className="p-6 bg-card rounded-md overflow-y-auto flex-1">
                            <FormPreview device={previewDevice} />
                        </div>
                    </div>
                </div>
            </form>

            <DeleteModal
                id={defaultValues?.id}
                onSuccessAction={() => navigate({ to: "/leads/forms" })}
                path="leads/forms"
                refetchKey="leads/forms/list"
            />
        </FormProvider>
    )
}
