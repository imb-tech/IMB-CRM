import {
    CalendarRange,
    ChartNoAxesCombined,
    ClipboardList,
    Cog,
    GraduationCap,
    House,
    Layers,
    NotebookText,
    Users2,
} from "lucide-react"
import { ReactNode } from "react"

export interface MenuItem {
    label: string
    icon?: ReactNode
    path: string
}

export const items: MenuItem[] = [
    {
        label: "Bosh sahifa",
        icon: <House width={20} />,
        path: "/",
    },
    {
        label: "Lidlar",
        icon: <ClipboardList width={20} />,
        path: "/lids",
    },
    {
        label: "Guruhlar",
        icon: <Layers width={20} />,
        path: "/groups",
    },
    {
        label: "Hodimlar",
        icon: <Users2 width={20} />,
        path: "/employees",
    },
    {
        label: "O'quvchilar",
        icon: <GraduationCap width={20} />,
        path: "/students",
    },
    {
        label: "Davomat",
        icon: <CalendarRange width={20} />,
        path: "/attendance",
    },
    {
        label: "Moliya",
        icon: <ChartNoAxesCombined width={20} />,
        path: "/finance",
    },
    {
        label: "Hisobotlar",
        icon: <NotebookText width={20} />,
        path: "/reports",
    },
    {
        label: "Sozlamalar",
        icon: <Cog width={20} />,
        path: "/settings",
    },
]
