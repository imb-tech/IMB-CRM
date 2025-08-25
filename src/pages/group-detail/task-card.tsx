import { cn, findWeekday, formatDate } from "@/lib/utils"
import { useSearch } from "@tanstack/react-router"
import { Pencil, Plus, Trash } from "lucide-react"
import { useModal } from "@/hooks/useModal"
import { Button } from "@/components/ui/button"
import { useStore } from "@/hooks/use-store"
import useQueryParams from "@/hooks/use-query-params"

type Props = {
    item: GroupModule
}

export const moduleTypeLabel: Record<GroupModuleType, string> = {
    task: "Vazifa",
    topic: "Mavzu",
    exam: "Imtixon",
}

export const moduleDesc: Record<GroupModuleType, string> = {
    task: "Muddat",
    topic: "Sana",
    exam: "Sana",
}

export default function TaskCard({ item }: Props) {
    const { openModal } = useModal("day")
    const { setStore } = useStore("day")
    const { setStore: setItem } = useStore("item")
    const { openModal: openDelete } = useModal("delete")
    const { updateParams } = useQueryParams()

    const { id } = useSearch({ strict: false })

    return (
        <div className={cn("flex gap-2 text-xs font-light items-start")}>
            <div
                className={cn(
                    "flex flex-col items-center gap-1 py-2 px-3 justify-center rounded-md bg-secondary/70 !min-w-24",
                    !item.first ? "opacity-0" : "",
                )}
            >
                <p className="text-3xl">{item.date.slice(8, 10)}</p>
                <p>{findWeekday(item.date)}</p>
                <button
                    className="bg-primary/10 px-1 rounded-sm mt-1 opacity-0"
                    onClick={openModal}
                >
                    <Plus className="text-primary" size={7} />
                </button>
            </div>
            <div className="flex-1 flex flex-col gap-2">
                {!item.is_empty ?
                    <div
                        className={cn(
                            "rounded-md bg-secondary/70 flex py-3 pl-3 border cursor-pointer flex-1 transition-all duration-150 hover:scale-[101%]",
                            item.id == Number(id) ?
                                "border-green-500/60"
                            :   "border-transparent",
                        )}
                        onClick={() =>
                            item.id ?
                                updateParams({ id: item.id.toString() })
                            :   null
                        }
                    >
                        <span
                            className={cn(
                                "flex h-[70px] w-[3px] bg-green-500 rounded-sm",
                            )}
                        ></span>
                        <div className="flex flex-col px-3 gap-1 text-sm flex-1">
                            <div className="flex items-center text-sm">
                                <p className="text-muted-foreground min-w-[80px]">
                                    {moduleTypeLabel[item.type]}:
                                </p>
                                <p className="flex-1">{item.title}</p>
                                <p>11:00 - 12:20</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-muted-foreground w-[70px]">
                                    O'qituvchi:
                                </p>
                                <p>
                                    {item.controller_data?.full_name?.toUpperCase()}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-muted-foreground w-[70px]">
                                    {moduleDesc[item.type]}:
                                </p>
                                <p className="flex-1">
                                    {formatDate(item.deadline ?? item.date)}
                                </p>
                                <div className="flex items-center gap-2">
                                    <Pencil
                                        size={16}
                                        className="text-primary"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            e.preventDefault()
                                            setStore(item.type)
                                            setItem(item)
                                            openModal()
                                        }}
                                    />
                                    <Trash
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            e.preventDefault()
                                            openDelete()
                                            setItem(item)
                                        }}
                                        size={16}
                                        className="text-rose-500"
                                    />
                                </div>
                            </div>
                            {false && (
                                <div className="flex items-center gap-2">
                                    <p className="text-muted-foreground min-w-[70px]">
                                        Baholash:
                                    </p>
                                    <div className="text-green-500 flex items-center gap-2 w-full">
                                        <p>9/11</p>
                                        <div className="flex-1 bg-background rounded-md">
                                            <span className="w-[75%] block h-[5px] bg-green-500 rounded-md"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                :   ""}
                {item.last && (
                    <Button
                        className={cn(
                            "w-full mb-2",
                            item.is_empty ? "h-[87px]" : "",
                        )}
                        size="sm"
                        variant="default"
                        onClick={() => {
                            if (!item.last) {
                                setItem(item)
                            } else {
                                setItem({ date: item.date })
                            }
                            openModal()
                        }}
                    >
                        <Plus />
                    </Button>
                )}
            </div>
        </div>
    )
}
