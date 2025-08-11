import ParamSwtich from "@/components/as-params/switch"
import { findChildPaths } from "@/components/header/header-links"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { menuItems } from "@/constants/menu"
import { Plus } from "lucide-react"
import { useMemo } from "react"

export default function SettingsHeader({
    dataCount,
    handleAdd,
}: {
    dataCount?: number
    handleAdd: () => void
}) {
    const links = findChildPaths(menuItems, location.pathname)
    const activeLink = useMemo(
        () => links.find((itm) => itm.to == location.pathname),
        [location.pathname],
    )

    return (
        <div className="flex items-center gap-3 ">
            <div className="flex items-center gap-3 flex-1">
                <h1 className="text-xl">{activeLink?.title}</h1>
                <Badge variant={"outline"} className="text-sm">
                    {dataCount}
                </Badge>
            </div>
            <span className={buttonVariants({ variant: "secondary" })}>
                <ParamSwtich paramName="is_active" reverse label="Arxiv" />
            </span>
            <Button onClick={handleAdd}>
                <Plus className="h-4 w-4" />
                Yaratish
            </Button>
        </div>
    )
}
