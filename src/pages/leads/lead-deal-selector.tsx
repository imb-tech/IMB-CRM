import { Button } from "@/components/ui/button"
import { ChevronDown, Pencil, Plus, Trash, CircleCheck } from "lucide-react"
import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { useGet } from "@/hooks/useGet"
import {
    useLocation,
    useNavigate,
    useParams,
    useSearch,
} from "@tanstack/react-router"
import Modal from "@/components/custom/modal"
import { useModal } from "@/hooks/useModal"
import DeleteModal from "@/components/custom/delete-modal"
import CreateDepartment from "./create-department"

export const pipelineUrl = "leads/pipeline/crud"

export default function LeadDealSelector() {
    const { pathname } = useLocation()
    const search = useSearch({ strict: false })
    const [open, setOpen] = useState<boolean>(false)
    const [item, setItem] = useState<Pipeline | null>(null)

    const [hoveredId, setHoveredId] = useState<number | null>(null)

    const handleMouseEnter = (id: number) => setHoveredId(id)
    const handleMouseLeave = () => setHoveredId(null)

    const { openModal } = useModal("create-pip")
    const { openModal: openDelete } = useModal("delete")

    const { id } = useParams({ strict: false })
    const navigate = useNavigate()

    const { data } = useGet<Pipeline[]>(pipelineUrl, {
        params: { is_active: true },
    })

    const activePip = useMemo(
        () => data?.find((el) => Number(el.id) === Number(search.pipeline)),
        [data, id, search],
    )

    const handleOpen = () => setOpen((prev) => !prev)

    return (
        <div className="flex items-center gap-3 relative ">
            <Button
                className="min-w-32 justify-between"
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
                    {!!data?.length ? (
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
                                            to: id
                                                ? "/leads/varonka/$id"
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
                                        "w-full cursor-pointer rounded-md hover:bg-primary/10 hover:text-primary py-2 px-3 font-light flex items-center justify-between  text-[16px]",
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
                                                            setItem(itm)
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
                    className="flex items-center text-sm px-3 bg-secondary hover:bg-primary/10 hover:text-primary py-2 rounded-md cursor-pointer m-2"
                    onClick={() => {
                        setItem(null)
                        handleOpen()
                        openModal()
                    }}
                >
                    <p className="flex-1">{"Yangi yaratish"}</p>
                    <Plus />
                </div>
            </div>

            <Modal
                modalKey="create-pip"
                title={`${
                    item?.id ? "Bo'limni tahrirlash" : "Yangi bo'lim qo'shish"
                }`}
            >
                <CreateDepartment item={item} />
            </Modal>

            <DeleteModal id={item?.id} path={pipelineUrl} name={item?.name} />
        </div>
    )
}
