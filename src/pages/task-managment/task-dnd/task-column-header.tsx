import { useModal } from "@/hooks/useModal"
import { useState } from "react"
import { PROJECTS_TASKS, STATUSES } from "@/constants/api-endpoints"
import { useForm } from "react-hook-form"
import { usePatch } from "@/hooks/usePatch"
import FormInput from "@/components/form/input"
import { useQueryClient } from "@tanstack/react-query"
import { useParams, useSearch } from "@tanstack/react-router"
import { Badge } from "@/components/ui/badge"
import { Trash } from "lucide-react"
import { useStore } from "@/hooks/use-store"

interface FormValue {
    name: string
}

type Props = {
    column: Column
}

function TaskColumnHeader({ column }: Props) {
    const [state, setState] = useState<"input" | "text">("text")
    const { openModal: openModalDelete } = useModal("project-delete")
    const queryClient = useQueryClient()
    const params = useParams({ from: "/_main/project/$id" })
    const search = useSearch({ from: "/_main/project/$id" })
    const form = useForm<FormValue>()
    const { setStore } = useStore<number | undefined>("task-create")

    const handleDeleteItem = (id: number) => {
        openModalDelete()
        setStore(id)
    }

    const { mutate: mutateCreate } = usePatch({
        onSuccess: () => {
            const cacheKey = [
                `${PROJECTS_TASKS}/${params?.id}`,
                ...Object.values(search),
            ]
            const cacheData = queryClient.getQueryData<Column[]>(cacheKey)
            const newName = form.getValues("name")

            const updatedData = cacheData?.map((item) =>
                item.id === column.id ? { ...item, name: newName } : item,
            )
            setState("text")
            form.reset()
            queryClient.setQueryData(cacheKey, updatedData)
        },
    })

    const handleBlur = () => {
        const value = form.getValues("name")
        if (value && value !== column.name) {
            onSubmit({ name: value })
        } else {
            setState("text")
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleBlur()
        }
    }

    const onSubmit = (value: FormValue) => {
        mutateCreate(`${STATUSES}/${column?.id}`, value)
    }

    return (
        <div className="mb-2 w-full flex justify-between items-center gap-2">
            {state === "input" && column.has_delete ? (
                <form className="w-full" onSubmit={(e) => e.preventDefault()}>
                    <FormInput
                        className="h-8 placeholder:text-[13px] 2xl:placeholder:text-sm"
                        wrapperClassName={"h-8"}
                        methods={form}
                        name="name"
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                </form>
            ) : (
                <h1
                    className="p-1 cursor-pointer line-clamp-1 break-all w-full 2xl:text-sm text-[14px] "
                    onClick={() => {
                        setState("input")
                        form.setValue("name", column.name)
                    }}
                >
                    {column.name === "Todo"
                        ? "Bajarilishi kerak"
                        : column.name === "Finished"
                        ? "Yakunlanganlar"
                        : column.name}
                    {column.count > 0 ? (
                        <Badge className="ml-1 text-xs">{column.count}</Badge>
                    ) : (
                        ""
                    )}
                </h1>
            )}
            {column.has_delete && column.has_delete && (
                <button
                    onClick={() => {
                        handleDeleteItem(Number(column.id))
                    }}
                    className="p-1.5 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-500"
                >
                    <Trash size={14} />
                </button>
            )}
        </div>
    )
}

export default TaskColumnHeader
