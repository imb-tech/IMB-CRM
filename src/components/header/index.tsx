import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Link, useLocation, useNavigate } from "@tanstack/react-router"
import { LogOut, User } from "lucide-react"
import { ThemeColorToggle } from "./color-toggle"
import { SidebarTrigger } from "../ui/sidebar"
import { ReactNode, useState } from "react"
import useMe from "@/hooks/useMe"
import Select from "../ui/select"
import { cn, getActiveBranch, setActiveBranch } from "@/lib/utils"
import HeaderLinks from "./header-links"
import FullScreenToggle from "../shared/full-screen"
import LeadDealSelector from "@/pages/leads/lead-deal-selector"
import { makeAvatar } from "@/lib/make-avatar"

type Props = {
    title?: string
    rigthChildren?: ReactNode
    leftChildren?: ReactNode
    navOnHeader?: boolean
}
const Header = ({ rigthChildren, leftChildren, navOnHeader }: Props) => {
    const navigate = useNavigate()
    const { data } = useMe()
    const activeBranch = getActiveBranch()
    const [branch, setBranch] = useState(activeBranch)
    const { pathname } = useLocation()

    const handleLogOut = () => {
        navigate({ to: "/login" })
        localStorage.removeItem("token")
        localStorage.removeItem("refresh")
    }

    function changeBranch(v: string) {
        setBranch(Number(v))
        setActiveBranch(v)
        window.location.reload()
    }

    return (
        <header className="py-3 pr-3 pl-2 gap-4 border-b bg-background   flex items-center justify-between  max-w-full box-border">
            <div className="flex gap-6 items-center  max-w-full  custom-scrollbar">
                <div className="flex gap-3 items-center sm:min-w-[180px]">
                    <SidebarTrigger className="text-gray-500 dark:text-white" />
                    <span className="text-2xl text-primary font-bold sm:block hidden">
                        IMB EDU
                    </span>
                </div>
                <div
                    className={cn(
                        "w-full hidden md:block",
                        !navOnHeader ? "md:hidden" : "",
                    )}
                >
                    <HeaderLinks navOnHeader={navOnHeader} />
                </div>
                {leftChildren ? leftChildren : null}
            </div>
            <hgroup className="flex items-center gap-4">
                {rigthChildren ? rigthChildren : null}
                {pathname.includes("/leads/") && <LeadDealSelector />}
                {pathname !== "/reports" && pathname !== "/finance" && (
                    <Select
                        value={branch}
                        setValue={(v) => changeBranch(v.toString())}
                        className="w-full"
                        labelKey="name"
                        valueKey="id"
                        options={data?.branches ?? []}
                        label="Barcha filiallar"
                    />
                )}
                <ThemeColorToggle />
                <FullScreenToggle />

                <DropdownMenu>
                    <div className="relative h-10">
                        <DropdownMenuTrigger className="!outline-none">
                            <Avatar className="relative overflow-hidden">
                                {/* {
                                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/80">
                                        <Spinner size="sm" />
                                    </div>
                                } */}
                                <AvatarImage
                                    src={undefined}
                                    alt="user img"
                                    className="object-cover"
                                />
                                <AvatarFallback>{makeAvatar(data?.full_name)}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem
                            className="cursor-pointer flex items-center gap-2"
                            asChild
                        >
                            <Link to="/">
                                <User width={16} /> {data?.full_name}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer flex items-center gap-2 !text-red-500"
                            onClick={handleLogOut}
                        >
                            <LogOut width={16} /> Chiqish
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </hgroup>
        </header>
    )
}

export default Header
