import { DragDropContext, DragStart, Droppable } from "react-beautiful-dnd"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import LeadsColumn from "./leads-column"
import { useMemo } from "react"
import { DropResult } from "react-beautiful-dnd"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { useParams } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import { usePatch } from "@/hooks/usePatch"
import Modal from "@/components/custom/modal"
import CreateStatusFrom from "../leadform/create-status-form"
import DeleteModal from "@/components/custom/delete-modal"
import {  Grid2x2Plus } from "lucide-react"
import { useStore } from "@/hooks/use-store"
import { usePost } from "@/hooks/usePost"
import { generateIndexedData, moveBetweenArrays, moveItem } from "../utils"
import useLeadStatuses from "../use-lead-statuses"
import DeleteLeadModal from "./delete-lead-modal"

const LeadsDnd = () => {
    const { id } = useParams({ strict: false })
    const { store, remove } = useStore<LeadStatus>("status-data")
    const { openModal } = useModal("create-status")
    const { openModal: confirmDelete } = useModal("confirm-delete")

    const { setStore } = useStore<{
        id: number
        type: "delete" | "success"
        name: string
    }>("conf-lead")

    const queryClient = useQueryClient()

    const queryKeyUsers = [
        "leads/crud",
        ...Object.values({ condition: "active", status__pipeline: id }),
    ]

    const queryKeyStatus = [
        "leads/pipeline/status",
        ...Object.values({ is_active: true, pipeline: id }),
    ]

    const { data, isLoading } = useLeadStatuses()

    const { data: users } = useGet<LeadFields[]>("leads/crud", {
        params: { condition: "active", status__pipeline: id },
    })

    const { mutate } = usePatch()
    const { mutate: orderMutation } = usePost()

    const onDragEnd = (result: DropResult) => {
        const originUsers =
            queryClient.getQueryData<LeadFields[]>(queryKeyUsers)

        const droppableId = result.destination?.droppableId

        if (droppableId === "delete-zone" || droppableId === "success-zone") {
            const drpId = Number(result.draggableId?.replace("user-", ""))
            setStore({
                type: droppableId === "delete-zone" ? "delete" : "success",
                id: drpId,
                name:
                    originUsers?.find((usr) => usr.id == drpId)?.name ??
                    "Bu Lid",
            })
            confirmDelete()
            return
        } else if (result.type === "card" && result.destination) {
            const cfg = {
                from: Number(result.source.droppableId?.replace("col-", "")),
                to: Number(droppableId?.replace("col-", "")),
                item: Number(result.draggableId?.replace("user-", "")),
            }

            if (!users) return

            const fromUsers = users.filter((u) => u.status === cfg.from)
            const toUsers = users.filter((u) => u.status === cfg.to)

            let updatedToUsers = toUsers
            let newData: typeof users = []

            if (cfg.from === cfg.to) {
                // Bitta column ichida move qilamiz
                updatedToUsers = moveItem(
                    toUsers,
                    result.source.index,
                    result.destination.index,
                )

                const otherUsers = users.filter((u) => u.status !== cfg.to)
                newData = [...otherUsers, ...updatedToUsers]
            } else {
                // Boshqa column’ga move qilamiz
                const moved = moveBetweenArrays(
                    fromUsers,
                    toUsers,
                    result.source.index,
                    result.destination.index,
                )
                const updatedFromUsers = moved.newSource
                updatedToUsers = moved.newDestination.map((u) =>
                    u.id === cfg.item ? { ...u, status: cfg.to } : u,
                )

                const otherUsers = users.filter(
                    (u) => u.status !== cfg.from && u.status !== cfg.to,
                )

                newData = [
                    ...otherUsers,
                    ...updatedFromUsers,
                    ...updatedToUsers,
                ]
            }

            queryClient.setQueryData(queryKeyUsers, newData)

            mutate(
                `leads/update/${cfg.item}`,
                { status: cfg.to },
                {
                    onSuccess() {
                        orderMutation(
                            "leads/common/lead-order",
                            generateIndexedData(updatedToUsers, "lead"),
                        )
                    },
                    onError() {
                        queryClient.setQueryData(queryKeyUsers, originUsers)
                    },
                },
            )
        } else if (
            result.destination &&
            result.destination?.index !== result.source.index
        ) {
            const oldStatuses = queryClient.getQueryData(queryKeyStatus)
            const cfg = {
                from: result.source.index,
                to: result.destination?.index,
                item: Number(result.draggableId?.replace("col-", "")),
            }
            const orderedStatuses = moveItem(data ?? [], cfg.from, cfg.to)
            queryClient.setQueryData(queryKeyStatus, orderedStatuses)
            orderMutation(
                "leads/common/status-order",
                generateIndexedData(orderedStatuses, "status"),
                {
                    onError() {
                        queryClient.setQueryData(queryKeyStatus, oldStatuses)
                    },
                },
            )
        }
    }

    const creatingOrder = useMemo(() => {
        const ord = [...(data ?? [])]?.sort((a, b) => b.order - a.order)[0]
            ?.order
        return ord ? ord + 1 : 0
    }, [data])



    return (
        <div className="py-3 flex items-start gap-3 w-full h-full relative">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="all-columns"
                    direction="horizontal"
                    type="column"
                >
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="flex gap-2 !items-start"
                        >
                            {data?.map((col, index) => (
                                <LeadsColumn
                                    key={col.id}
                                    index={index}
                                    item={col}
                                />
                            ))}
                            {isLoading &&
                                Array.from({ length: 4 }).map((_, index) => (
                                    <Card key={index}>
                                        <CardContent className="space-y-3 min-w-80">
                                            {Array.from({
                                                length: 4 - 1 - index,
                                            }).map((_, idx) => (
                                                <Skeleton
                                                    key={idx}
                                                    className="h-32 w-full"
                                                />
                                            ))}
                                        </CardContent>
                                    </Card>
                                ))}
                            {provided.placeholder}
                            <button
                                onClick={() => {
                                    remove()
                                    openModal()
                                }}
                            >
                                <div className="border border-dashed border-primary/50 rounded-md p-3 bg-background mb-2 flex items-en justify-center hover:border-primary cursor-pointer transition-all duration-200 min-w-[320px]">
                                    <Grid2x2Plus
                                        className="text-primary"
                                        size={18}
                                    />
                                </div>
                            </button>
                        </div>
                    )}
                </Droppable>

            </DragDropContext>

            <Modal
                modalKey="create-status"
                title={
                    store?.id ?
                        ("Bo'limni tahrirlash")
                    :   ("Yangi bo'lim yaratish")
                }
                onClose={remove}
            >
                <CreateStatusFrom
                    defaultValues={store}
                    creatingOrder={creatingOrder}
                />
            </Modal>

            <DeleteModal
                modalKey="delete-status"
                name={store?.name}
                id={store?.id}
                path="leads/pipeline/status"
            />

            <DeleteLeadModal />
        </div>
    )
}

export default LeadsDnd
