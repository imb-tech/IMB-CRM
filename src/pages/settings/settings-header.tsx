import ParamSwtich from "@/components/as-params/switch"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function SettingsHeader({
    dataCount,
    handleAdd,
}: {
    dataCount?: number
    handleAdd: () => void
}) {
    return (
        <div className="flex items-center gap-3 ">
            <div className="flex items-center gap-3 flex-1">
                <h1 className="text-xl">Filiallar</h1>
                <Badge variant={"outline"} className="text-sm">
                    {dataCount}
                </Badge>
            </div>
            <span className={buttonVariants({ variant: "secondary" })}>
                <ParamSwtich paramName="is_active" reverse label="Arxiv" />
            </span>
            <Button onClick={handleAdd}>
                <Plus className="h-4 w-4" />
                Qo'shish
            </Button>
        </div>
    )
}
