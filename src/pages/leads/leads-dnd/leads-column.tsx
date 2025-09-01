import { Draggable, Droppable } from "react-beautiful-dnd"
import LeadsList from "./leads-list"
import TableActions from "@/components/custom/table-actions"
import { useModal } from "@/hooks/useModal"
import { useMemo } from "react"
import { useGet } from "@/hooks/useGet"
import { useParams } from "@tanstack/react-router"
import { UserPlus } from "lucide-react"
import { useStore } from "@/hooks/use-store"
import { Badge } from "@/components/ui/badge"
import { formatMoney } from "@/lib/format-money"
import { cn } from "@/lib/utils"

type Props = {
    index: number
    item?: LeadStatus
}

const LeadsColumn = ({ index, item }: Props) => {
    const { openModal } = useModal()
    const { openModal: openDelete } = useModal("delete-status")
    const { openModal: openEdit } = useModal("create-status")
    const { id } = useParams({ strict: false })
    const { setStore } = useStore("status-data")
    const { setStore: setLeadData } = useStore("lead-data")

    const { data: users } = useGet<Lead[]>("leads/crud", {
        params: { pipeline: id },
    })

    const data = useMemo(
        () => users?.filter((usr) => usr.status == item?.id),
        [users],
    )

    function handleDelete() {
        setStore(item)
        openDelete()
    }

    function handleEdit() {
        setStore(item)
        openEdit()
    }


    return (
        <Draggable draggableId={`col-${item?.id}`} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="rounded-md"
                >
                    <div
                        {...provided.dragHandleProps}
                        className="px-3 dark:bg-card bg-white rounded-md"
                    >
                        <div className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg">{item?.name ?? ""} </h3>
                                <Badge>{formatMoney(item?.total_count)}</Badge>
                            </div>

                            <div className="flex items-center">
                                <div
                                    className="rounded-sm p-1.5 mr-2 bg-primary/10 flex items-en justify-center hover:border-primary cursor-pointer transition-all duration-200"
                                    onClick={() => {
                                        openModal()
                                        setLeadData({
                                            status: item?.id,
                                        })
                                    }}
                                >
                                    <UserPlus
                                        className="text-primary"
                                        size={16}
                                    />
                                </div>
                                {item?.editable && (
                                    <TableActions
                                        onDelete={handleDelete}
                                        onEdit={handleEdit}
                                    />
                                )}
                            </div>
                        </div>
                        <Droppable droppableId={`col-${item?.id}`} type="card">
                            {(dropProvided) => (
                                <div
                                    ref={dropProvided.innerRef}
                                    {...dropProvided.droppableProps}
                                    // className="dark:bg-[#0c0d03] bg-zinc-200 rounded-lg min-w-80 max-w-80"
                                    className={cn(
                                        "rounded-lg min-w-80 max-w-80 pb-2",
                                        !data?.length && "pb-10"
                                    )}
                                >
                                    <div className="no-scrollbar-x max-h-[68vh] 2xl:max-h-[80vh] overflow-y-auto">
                                        <LeadsList users={data} />
                                        {dropProvided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default LeadsColumn
