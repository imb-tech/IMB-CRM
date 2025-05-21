import * as React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    useSidebar,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { items } from "@/hooks/usePaths"
import { cn } from "@/lib/utils"
import { useNavigate } from "@tanstack/react-router"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const navigate = useNavigate()
    const { open } = useSidebar()
    return (
        <Sidebar collapsible="icon" {...props} className="bg-card">
            <SidebarContent>
                <SidebarMenu
                    className={cn("py-3 px-2", !open ? "" : "border-b")}
                >
                    <SidebarMenuButton
                        size={"lg"}
                        onClick={() => navigate({ to: "/" })}
                        className={cn(
                            " flex text-primary   font-extrabold gap-0 ",
                            !open
                                ? "justify-center text-center text-[45px]"
                                : "justify-start text-3xl",
                        )}
                    >
                        Y<span>amin Group</span>
                    </SidebarMenuButton>
                </SidebarMenu>
                <NavMain items={items} />
            </SidebarContent>
        </Sidebar>
    )
}
