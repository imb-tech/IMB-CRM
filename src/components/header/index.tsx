// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "../ui/dropdown-menu"
import { Link, useNavigate } from "@tanstack/react-router"
// import { LogOut, User } from "lucide-react"
// import { ThemeColorToggle } from "./color-toggle"
import { SidebarTrigger } from "../ui/sidebar"
import { ReactNode } from "react"

type Props = {
    title?: string
    rigthChildren?: ReactNode
    leftChildren?: ReactNode
}
const Header = ({ title, leftChildren, rigthChildren }: Props) => {
    const navigate = useNavigate()

    // const handleLogOut = () => {
    //     navigate({ to: "/auth" })
    //     localStorage.removeItem("token")
    //     localStorage.clear()
    //     localStorage.removeItem("refresh")
    // }

    return (
        <header className="px-4 md:px-6 py-4 gap-4 border-l dark:border-b  flex items-center justify-between bg-card max-w-full box-border">
            <div className="flex gap-2 items-center min-w-14 max-w-full overflow-x-auto custom-scrollbar">
                <SidebarTrigger className="text-gray-500 dark:text-white" />
                {title ? <p className="text-gray-500 dark:text-white">{title}</p> : null}
                {leftChildren ? leftChildren : null}
            </div>
            <hgroup className="flex items-center gap-4">
                {rigthChildren ? rigthChildren : null}
                {/* <ThemeColorToggle />
                <DropdownMenu>
                    <div className="relative h-10">
                        <DropdownMenuTrigger className="!outline-none">
                            <Avatar className="relative overflow-hidden">
                                {
                                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/80">
                                        <Spinner size="sm" />
                                    </div>
                                }
                                <AvatarImage
                                    src={undefined}
                                    alt="user img"
                                    className="object-cover"
                                />
                                <AvatarFallback>AO</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem
                            className="cursor-pointer flex items-center gap-2"
                            asChild
                        >
                            <Link to="/">
                                <User width={16} /> Abdisamatov Ozodbek
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer flex items-center gap-2 !text-red-500"
                            onClick={handleLogOut}
                        >
                            <LogOut width={16} /> Akkauntdan chiqish
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu> */}
            </hgroup>
        </header>
    )
}

export default Header
