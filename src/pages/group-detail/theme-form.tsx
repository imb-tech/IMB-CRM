import { FileInput } from "@/components/form/file-input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import FormTextarea from "@/components/form/textarea"
import { usePost } from "@/hooks/usePost"
import { useParams } from "@tanstack/react-router"
import { useStore } from "@/hooks/use-store"
import { useGet } from "@/hooks/useGet"
import { GROUP } from "@/constants/api-endpoints"

export default function ThemeForm({ onSuccess }: { onSuccess: () => void }) {
    const { id: group } = useParams({ from: "/_main/groups/$id/_main/tasks/" })
    const { store } = useStore<GroupModule>("item")
    const { data } = useGet<Group>(GROUP + "/" + group)

    const form = useForm<GroupModule>({
        defaultValues: {
            type: "topic",
            ...store,
        },
    })

    const { mutate, isPending } = usePost(
        { onSuccess },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    )

    function handleSubmit(vals: GroupModule) {
        const conf = {
            ...vals,
            file_datas: vals.uploaded_files,
            uploaded_files: undefined,
            group,
            date: store?.date,
            controller: data?.teacher,
        }
        mutate("platform/groups/modules", conf)
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="mb-3 flex flex-col gap-4 min-h-[320px]">
                <FormTextarea
                    methods={form}
                    name="title"
                    label="Mavzu"
                    placeholder="Misol: CRM loyixalari tuzilmasi"
                    required
                />

                <FormTextarea
                    methods={form}
                    name="description"
                    label="Qo'shimcha izoh"
                    placeholder="Ixtiyoriy"
                />

                <FileInput
                    control={form.control}
                    name="uploaded_files"
                    maxFiles={5}
                    label="Qo'shimcha fayllar"
                    className="bg-secondary"
                    acceptedTypes={[".pdf"]}
                />
            </div>

            <Button className="ml-auto block" loading={isPending}>
                Yaratish
            </Button>
        </form>
    )
}
