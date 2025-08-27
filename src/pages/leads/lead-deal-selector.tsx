import { Button } from "@/components/ui/button"
import {
    ChevronDown,
    Pencil,
    Plus,
    Trash,
    Image,
    CircleCheck,
} from "lucide-react"
import { useMemo, useState } from "react"
import { cn, getRandomImage, imagePaths } from "@/lib/utils"
import { useGet } from "@/hooks/useGet"
import {
    useLocation,
    useNavigate,
    useParams,
    useSearch,
} from "@tanstack/react-router"
import Modal from "@/components/custom/modal"
import { useModal } from "@/hooks/useModal"
import FormInput from "@/components/form/input"
import { useForm } from "react-hook-form"
import { usePost } from "@/hooks/usePost"
import DeleteModal from "@/components/custom/delete-modal"
import { usePatch } from "@/hooks/usePatch"
import FormImagePicker from "@/components/form/img-picker"
import { useQueryClient } from "@tanstack/react-query"

export const pipelineUrl = "leads/pipeline/crud"

export default function LeadDealSelector() {
    const params = useParams({ strict: false })
    const queryClinet = useQueryClient()
    const { pathname } = useLocation()
    const search = useSearch({ strict: false })
    const [open, setOpen] = useState<boolean>(false)
    const [item, setItem] = useState<Pipeline | null>(null)

    const [hoveredId, setHoveredId] = useState<number | null>(null)

    const handleMouseEnter = (id: number) => setHoveredId(id)
    const handleMouseLeave = () => setHoveredId(null)

    const { openModal, closeModal } = useModal("create-pip")
    const { openModal: openDelete } = useModal("delete")

    const { id } = useParams({ strict: false })
    const navigate = useNavigate()

    const { data, refetch } = useGet<Pipeline[]>(pipelineUrl, {
        params: { is_active: true },
    })

    function onSuccess(resp: Pipeline) {
        closeModal()
        setOpen(false)
        refetch()
        queryClinet.refetchQueries({
            queryKey: [`${pipelineUrl}/${params?.id}`],
        })
        navigate({
            search: search,
            to: "/leads/$id",
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

    const activePip = useMemo(
        () => data?.find((el) => Number(el.id) === Number(search.pipeline)),
        [data, id, search],
    )

    const handleOpen = () => setOpen((prev) => !prev)

    const form = useForm<Pipeline>()

    async function handleSubmit(vals: Pipeline) {
        const formData = new FormData()
        formData.append("name", vals.name)
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
        <div className="flex items-center gap-3 relative ">
            <Button
                className="min-w-32 "
                variant={"secondary"}
                onClick={handleOpen}
            >
                <span className="pl-1">{activePip?.name as string}</span>
                <ChevronDown size={18} />
            </Button>

            <div
                className={cn(
                    "fixed top-0 right-0 bottom-0 z-10 opacity-0 transition-opacity duration-200",
                    open ? "right-0 opacity-100" : "",
                )}
                onClick={handleOpen}
            ></div>

            <div
                className={cn(
                    "absolute bg-card w-0 right-0 py-[14px] p-0 top-11 opacity-0 z-20 rounded-xl shadow-sm shadow-primary/40 transition-opacity duration-200 overflow-hidden px-0 flex flex-col",
                    open ? "w-72 opacity-100 min-h-[300px]" : "",
                )}
            >
                <div className="flex flex-col mb-3  flex-1 gap-1 p-2">
                    {Number(data?.length) > 1 ? (
                        data?.map((itm) => {
                            const isActive =
                                Number(itm?.id) ===
                                (Number(id) || search?.pipeline)
                            const isHovered = hoveredId === Number(itm.id)
                            return (
                                <div
                                    key={itm.id}
                                    onClick={() => {
                                        navigate({
                                            to: params.id
                                                ? "/leads/$id"
                                                : pathname,
                                            params: { id: itm.id },
                                            search: {
                                                pipeline: Number(itm.id),
                                            },
                                        })
                                        handleOpen()
                                    }}
                                    onMouseEnter={() =>
                                        handleMouseEnter(Number(itm.id))
                                    }
                                    onMouseLeave={handleMouseLeave}
                                    className={cn(
                                        "w-full rounded-md hover:bg-primary/10 py-2 px-3 font-light flex items-center justify-between  text-[16px]",
                                        isActive &&
                                            "bg-primary/10 text-primary",
                                    )}
                                >
                                    <span className="pl-1">{itm.name}</span>

                                    <div className="flex items-center gap-2">
                                        {isHovered ? (
                                            <>
                                                <Trash
                                                    size={18}
                                                    className="transition-all duration-200 cursor-pointer text-rose-500"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        if (itm.id) {
                                                            setItem(itm)
                                                            openDelete()
                                                        }
                                                    }}
                                                />
                                                <Pencil
                                                    size={18}
                                                    className="transition-all duration-200 cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        if (itm.id) {
                                                            form.setValue(
                                                                "id",
                                                                itm.id,
                                                            )
                                                            form.setValue(
                                                                "name",
                                                                itm.name,
                                                            )
                                                            setItem(itm)
                                                            form.setValue(
                                                                "background",
                                                                itm?.background,
                                                            )
                                                            openModal()
                                                        }
                                                    }}
                                                />
                                            </>
                                        ) : (
                                            isActive && (
                                                <CircleCheck
                                                    size={18}
                                                    className="transition-all duration-200 cursor-pointer text-primary"
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <p className="text-muted-foreground text-center py-3">
                            {"Boshqa bo'limlar yo'q"}
                        </p>
                    )}
                </div>

                <div
                    className="flex items-center text-sm px-3 bg-secondary py-1 rounded-md cursor-pointer m-2"
                    onClick={() => {
                        form.setValue("id", "")
                        form.setValue("name", "")
                        form.setValue("background", "")
                        handleOpen()
                        openModal()
                    }}
                >
                    <p className="flex-1">{"Yangi yaratish"}</p>
                    <Button size={"sm"} variant="secondary" className="px-2">
                        <Plus />
                    </Button>
                </div>
            </div>

            <Modal
                modalKey="create-pip"
                title={`${
                    form.watch("id")
                        ? "Bo'limni tahrirlash"
                        : "Yangi bo'lim qo'shish"
                }`}
            >
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

                        <Button
                            className="w-full"
                            loading={isPending || isPatching}
                        >
                            {"Saqlash"}
                        </Button>
                    </form>
                </div>
            </Modal>

            <DeleteModal id={item?.id} path={pipelineUrl} name={item?.name} />
        </div>
    )
}

export async function urlToFile(url: string, fileName: string): Promise<File> {
    const res = await fetch(url)
    const blob = await res.blob()
    const contentType = blob.type || "image/jpeg"
    return new File([blob], fileName, { type: contentType })
}
