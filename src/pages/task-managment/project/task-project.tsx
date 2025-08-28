import React, { useEffect, useState } from "react"
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    useSortable,
    rectSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { OPTION_EMPLOYEES, TASKLY_PROJECT } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import ProjectCard from "./project-card"
import { Card, CardContent } from "@/components/ui/card"
import { CirclePlus, Download, ListChecks, SquareCheckBig } from "lucide-react"
import Modal from "@/components/custom/modal"
import ProjectCreate from "./create"
import { useModal } from "@/hooks/useModal"
import DeleteModal from "@/components/custom/delete-modal"
import { ParamMultiCombobox } from "@/components/as-params/multi-combobox"
import { useSearch } from "@tanstack/react-router"
import { usePost } from "@/hooks/usePost"
import { Button } from "@/components/ui/button"
import { downloadExcel } from "@/lib/download-excel"

function SortableItem({
    id,
    children,
}: {
    id: number | string
    children: React.ReactNode
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id })

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 9999 : "auto",
        position: isDragging ? "relative" : undefined,
        boxShadow: isDragging ? "0 8px 16px rgba(0,0,0,0.2)" : undefined,
    }

    return (
        <div
            className="h-full"
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            {children}
        </div>
    )
}

export default function TaskBoard() {
    const search = useSearch({ from: "/_main/project/" })
    const [searchCustomer, setCustomerSearch] = useState("")
    const [current, setCurrent] = useState<FormValues | null>(null)
    const { openModal: openModalProject } = useModal("project-create")
    const { openModal: openModalDelete } = useModal("project-delete")
    const { mutate: mutateMoveCard } = usePost()

    const [projects, setProjects] = useState<FormValues[]>([])
    const [isDragging, setIsDragging] = useState(false)

    const { data: dataCustomer, isLoading: isLoadingCustomer } = useGet<
        OptionEmployees[]
    >(OPTION_EMPLOYEES, {
        params: { search: searchCustomer, task_users: true },
    })

    const { data: dataStatus } = useGet<{ todo: number; finished: number }>(
        `taskly/tasks-stats`,
        { params: search },
    )

    const {
        data: dataProjects,
        isSuccess: isSuccessProject,
        isLoading: isLoadingProject,
    } = useGet<FormValues[]>(TASKLY_PROJECT, { params: search })

    useEffect(() => {
        if (isSuccessProject && dataProjects) {
            setProjects(dataProjects)
        }
    }, [isSuccessProject, dataProjects])

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        }),
    )

    const handleDragEnd = (event: any) => {
        setIsDragging(false)
        const { active, over } = event
        if (!over || active.id === over.id) return

        const oldIndex = projects.findIndex(
            (i) => String(i.id) === String(active.id),
        )
        const newIndex = projects.findIndex(
            (i) => String(i.id) === String(over.id),
        )
        if (oldIndex === -1 || newIndex === -1) return

        const reordered = arrayMove(projects, oldIndex, newIndex)
        setProjects(reordered)

        const objects = reordered.map((item, index) => ({
            project: item.id,
            order: index + 1,
        }))
        mutateMoveCard("taskly/move-project", { objects })
    }

    const handleAdd = () => {
        setCurrent(null)
        openModalProject()
    }
    const handleItem = (item: FormValues) => {
        if (!isDragging) {
            setCurrent(item)
            openModalProject()
        }
    }
    const handleDelete = (item: FormValues) => {
        setCurrent(item)
        openModalDelete()
    }

    const { isLoading, refetch } = useGet("taskly/export/project-tasks", {
        enabled: false,
        config: {
            responseType: "blob",
        },
    })

    const handleExcelItem = async () => {
        const response = await refetch()
        if (response.isSuccess) {
            downloadExcel({ data: response.data, name: "Vazifalar" })
        }
    }

    return (
        <div className="w-full space-y-6">
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
                <ParamMultiCombobox
                    labelKey="full_name"
                    valueKey="id"
                    options={dataCustomer || []}
                    paramName={"user_id"}
                    label={"Xodim"}
                    onSearchChange={(val) => setCustomerSearch(val)}
                    isLoading={isLoadingCustomer}
                />
                <div className="flex items-center gap-3 ">
                    <Card className="bg-secondary/90">
                        <CardContent className=" flex items-center gap-2 py-2 min-w-[200px] text-blue-400">
                            <ListChecks size={18} />{" "}
                            <span>
                                {"Topshiriqlar"}: {dataStatus?.todo || 0}
                            </span>
                        </CardContent>
                    </Card>
                    <Card className="bg-secondary/90">
                        <CardContent className=" flex items-center gap-2 py-2 min-w-[200px] text-primary">
                            <SquareCheckBig size={18} />{" "}
                            <span>
                                {"Yakunlanganlar"}: {dataStatus?.finished || 0}
                            </span>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex justify-end w-full ">
                    <Button
                        disabled={isLoading}
                        loading={isLoading}
                        onClick={(e) => {
                            e.stopPropagation()
                            handleExcelItem()
                        }}
                    >
                        {!isLoading && <Download size={18} />}
                        {"Yuklab olish"}
                    </Button>
                </div>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                autoScroll={false}
            >
                <SortableContext
                    items={projects.map((i) => i.id)}
                    strategy={rectSortingStrategy}
                >
                    <div className="grid sm:grid-cols-3 gap-3 ">
                        {projects.map((item, index) => (
                            <SortableItem key={item.id} id={item.id}>
                                <ProjectCard
                                    key={index}
                                    index={index}
                                    item={item}
                                    handleItem={handleItem}
                                    handleDelete={handleDelete}
                                />
                            </SortableItem>
                        ))}
                        {isLoadingProject &&
                            Array.from({ length: 2 }).map((_, index) => (
                                <Card
                                    key={index}
                                    onClick={handleAdd}
                                    className="cursor-pointer shadow-lg min-h-[244px] animate-pulse rounded-md bg-muted"
                                >
                                    <CardContent className="flex text-2xl items-center justify-center gap-2 h-full"></CardContent>
                                </Card>
                            ))}
                        <Card
                            onClick={handleAdd}
                            className="cursor-pointer shadow-lg min-h-[244px]"
                        >
                            <CardContent className="flex text-2xl items-center justify-center gap-2 h-full">
                                <CirclePlus size={30} />
                                <h1>{"Loyiha qo'shish"}</h1>
                            </CardContent>
                        </Card>
                    </div>
                </SortableContext>
            </DndContext>

            <Modal
                title={current?.id ? "Loyihani tahrirlash" : "Loyiha qo'shish"}
                modalKey="project-create"
            >
                <div className="w-full overflow-hidden px-1">
                    <ProjectCreate item={current || undefined} />
                </div>
            </Modal>
            <DeleteModal
                modalKey="project-delete"
                id={current?.id}
                path={TASKLY_PROJECT}
            />
        </div>
    )
}
