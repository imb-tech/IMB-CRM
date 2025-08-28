import { Button } from "@/components/ui/button"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { Plus } from "lucide-react"

const AddTaskButton = ({ onClick }: { onClick: () => void }) => {
    const search: any = useSearch({ from: "/_main/project/$id" })
    const navigate = useNavigate()

    const closeModal = () => {
        navigate({
            search: {
                ...search,
                task: undefined,
            },
        })
        onClick?.()
    }

    return (
        <Button
            size="sm"
            variant="ghost"
            onClick={closeModal}
            className="w-full dark:hover:bg-[#131506] dark:hover:text-white flex justify-start 2xl:text-sm text-xs"
        >
            <Plus size={16} />
            {"Yangi qo'shish"}
        </Button>
    )
}

export default AddTaskButton
