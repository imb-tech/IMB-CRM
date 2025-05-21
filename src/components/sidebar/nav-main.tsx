import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { MenuItem } from "@/hooks/usePaths"
import { useLocation, useNavigate } from "@tanstack/react-router"

export function NavMain({ items }: { items: MenuItem[] }) {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2 ">
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.label}>
                            <SidebarMenuButton
                                onClick={() => navigate({ to: item.path })}
                                tooltip={item.label}
                                isActive={pathname === item.path}
                                className={"cursor-pointer "}
                            >
                                {item.icon}
                                <span >{item.label}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
