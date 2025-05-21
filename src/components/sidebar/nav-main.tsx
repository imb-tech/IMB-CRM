import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { menuItems } from "@/constants/menu"
import { Link } from "@tanstack/react-router"

export function NavMain() {
    return (
        <SidebarGroup className="pt-16">
            <SidebarGroupContent className="flex flex-col gap-2 ">
                <SidebarMenu>
                    {menuItems.map(
                        ({ enabled, title, ...item }) =>
                            enabled && (
                                <Link
                                    {...item}
                                    key={title}
                                    activeProps={{
                                        className:
                                            "[&_button]:bg-primary hover:[&_button]:bg-primary hover:[&_button]:text-primary-foreground text-primary-foreground",
                                    }}
                                    className="rounded-lg"
                                >
                                    <SidebarMenuItem>
                                        <SidebarMenuButton  tooltip={title}>
                                            {item.icon}
                                            <span>{title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </Link>
                            ),
                    )}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
