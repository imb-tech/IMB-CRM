import {
    File,
    House,
    LayoutGrid,
    Settings,
    Truck,
    UserRound,
} from "lucide-react"
import { ReactNode } from "react"

export interface MenuItem {
    label: string
    icon?: ReactNode
    path: string
}

export const items: MenuItem[] = [
    {
        label: "Buyurtmalar",
        icon: <LayoutGrid width={20} />,
        path: "/",
    },
    {
        label: "Mijozlar",
        icon: <UserRound width={20} />,
        path: "/customers",
    },
    {
        label: "Logistlar",
        icon: <Truck width={20} />,
        path: "/logistics",
    },
    {
        label: "Ombor",
        icon: <House width={20} />,
        path: "/warehouse",
    },
    {
        label: "Sozlamalar",
        icon: <Settings width={20} />,
        path: "/settings",
    },
]
