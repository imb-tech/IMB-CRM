import { Button } from "@/components/ui/button"
import { Image } from "lucide-react"
import { cn, getRandomImage, imagePaths } from "@/lib/utils"
import FormInput from "@/components/form/input"
import { usePost } from "@/hooks/usePost"
import { usePatch } from "@/hooks/usePatch"
import FormImagePicker from "@/components/form/img-picker"
import { useQueryClient } from "@tanstack/react-query"
import { useModal } from "@/hooks/useModal"
import { useNavigate, useParams, useSearch } from "@tanstack/react-router"
import { pipelineUrl } from "./lead-deal-selector"
import { useForm } from "react-hook-form"
import useMe from "@/hooks/useMe"

type Props = {
    item?: Pipeline | null
}

const CreateDepartment = ({ item }: Props) => {
    const { active_branch } = useMe()
    const queryClinet = useQueryClient()

    const search = useSearch({ strict: false })

    const { closeModal } = useModal("create-pip")
    const { closeModal: closeModalPipeline } = useModal("create-pip-pipeline")

    const { id } = useParams({ strict: false })
    const navigate = useNavigate()
    const form = useForm<Pipeline>({
        defaultValues: item || undefined,
    })

    function onSuccess(resp: Pipeline) {
        closeModal()
        closeModalPipeline()
        queryClinet.refetchQueries({
            queryKey: [`${pipelineUrl}/${id}`],
        })
        queryClinet.refetchQueries({
            queryKey: [pipelineUrl],
        })
        navigate({
            search: search,
            to: "/leads/varonka/$id",
            params: {
                id: resp.id,
            },
        })
    }

    const { mutate, isPending } = usePost(
        { onSuccess },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    )
    const { mutate: patch, isPending: isPatching } = usePatch(
        { onSuccess },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    )

    async function handleSubmit(vals: Pipeline) {
        const formData = new FormData()
        formData.append("name", vals.name)
        formData.append("branch", String(active_branch))
        let backgroundValue = vals.background

        if (!backgroundValue) {
            backgroundValue = getRandomImage()
        }

        const isUpdate = Boolean(item?.id)

        if (isUpdate) {
            const prevBackground = item?.background
            if (backgroundValue !== prevBackground) {
                if (typeof backgroundValue === "string") {
                    const file = await urlToFile(
                        backgroundValue,
                        "background.jpg",
                    )
                    formData.append("background", file)
                } else {
                    formData.append("background", backgroundValue)
                }
            }
            patch(`${pipelineUrl}/${vals.id}`, formData)
        } else {
            if (typeof backgroundValue === "string") {
                const file = await urlToFile(backgroundValue, "background.jpg")
                formData.append("background", file)
            } else {
                formData.append("background", backgroundValue)
            }
            mutate(pipelineUrl, formData)
        }
    }

    return (
        <div className="w-full overflow-hidden px-1">
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-2"
            >
                <FormInput
                    methods={form}
                    name="name"
                    required
                    label={"Nomi"}
                    placeholder={"Misol: Yangi mahsulot sotuvi uchun"}
                />
                <div className="w-full overflow-x-auto no-scrollbar-x">
                    <div className="flex gap-2 w-max">
                        {imagePaths?.map((item, index) => (
                            <div
                                onClick={() =>
                                    form.setValue("background", item)
                                }
                                className={cn(
                                    "w-20 h-20 border rounded shrink-0 cursor-pointer hover:shadow-lg",
                                    form.watch("background") === item &&
                                        "border-primary",
                                )}
                                key={index}
                            >
                                <img
                                    src={item}
                                    className="w-full h-full object-cover rounded"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <FormImagePicker
                    methods={form}
                    name="background"
                    label={
                        <div className="flex items-center gap-2 justify-center">
                            <Image size={20} />
                            <span>{"Orqa fon rasmi"}</span>
                        </div>
                    }
                />

                <Button className="w-full" loading={isPending || isPatching}>
                    {"Saqlash"}
                </Button>
            </form>
        </div>
    )
}

export default CreateDepartment

export async function urlToFile(url: string, fileName: string): Promise<File> {
    const res = await fetch(url)
    const blob = await res.blob()
    const contentType = blob.type || "image/jpeg"
    return new File([blob], fileName, { type: contentType })
}
