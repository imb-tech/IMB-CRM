import ParamSwtich from "@/components/as-params/switch"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { menuItems } from "@/constants/menu"
import { findChildPaths } from "@/constants/util.menu"
import { Plus } from "lucide-react"
import { useMemo } from "react"

export default function SettingsHeader({
    dataCount,
    handleAdd,
    pageTitle,
}: {
    dataCount?: number
    handleAdd: () => void
    pageTitle?: string
}) {
    const links = findChildPaths(menuItems, location.pathname)
    const activeLink = useMemo(
        () => links.find((itm) => itm.to == location.pathname),
        [location.pathname],
    )

    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 flex-1">
                <h1 className="text-xl">{pageTitle ?? activeLink?.title}</h1>
                <Badge className="text-sm">{dataCount}</Badge>
            </div>
            <label
                className={buttonVariants({
                    variant: "ghost",
                })}
                htmlFor="is_active"
            >
                <ParamSwtich paramName="is_active" reverse label="Arxiv" />
            </label>
            <Button onClick={handleAdd}>
                <Plus className="h-4 w-4" />
                Yaratish
            </Button>
        </div>
    )
}
