import * as React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    useSidebar,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { cn } from "@/lib/utils"
import { useNavigate } from "@tanstack/react-router"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const navigate = useNavigate()
    const { open } = useSidebar()
    return (
        <Sidebar collapsible="icon" {...props} >
            <SidebarContent>
                <SidebarMenu
                    className={cn("p-2", !open ? "" : "border-b")}
                >
                    <SidebarMenuButton
                        size={"lg"}
                        onClick={() => navigate({ to: "/" })}
                        className={cn(
                            " flex text-primary   font-extrabold gap-0 ",
                            !open
                                ? "justify-center text-center text-[30px]"
                                : "justify-start text-3xl",
                        )}
                    >
                        IM<span>B CRM</span>
                    </SidebarMenuButton>
                </SidebarMenu>
                <NavMain />
            </SidebarContent>
        </Sidebar>
    )
}
