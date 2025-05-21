import { linkOptions } from "@tanstack/react-router"
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

export const menuItems = [
    linkOptions({
        title: "Bosh sahifa",
        icon: <House width={20} />,
        to: "/",
        enabled: true,
        items: [],
    }),
    linkOptions({
        title: "Lidlar",
        icon: <ClipboardList width={20} />,
        to: "/lids",
        enabled: true,
        items: [],
    }),
    linkOptions({
        title: "Guruhlar",
        icon: <Layers width={20} />,
        to: "/groups",
        enabled: true,
        items: [],
    }),
    linkOptions({
        title: "Hodimlar",
        icon: <Users2 width={20} />,
        to: "/employees",
        enabled: true,
        items: [],
    }),
    linkOptions({
        title: "O'quvchilar",
        icon: <GraduationCap width={20} />,
        to: "/students",
        enabled: true,
        items: [],
    }),
    linkOptions({
        title: "Davomat",
        icon: <CalendarRange width={20} />,
        to: "/attendance",
        enabled: true,
        items: [],
    }),
    linkOptions({
        title: "Moliya",
        icon: <ChartNoAxesCombined width={20} />,
        to: "/finance",
        enabled: true,
        items: [],
    }),
    linkOptions({
        title: "Hisobotlar",
        icon: <NotebookText width={20} />,
        to: "/reports",
        enabled: true,
        items: [],
    }),
    linkOptions({
        title: "Sozlamalar",
        icon: <Cog width={20} />,
        to: "/settings",
        enabled: true,
        items: [
            linkOptions({
                title: "Filiallar",
                to: "/settings/branches",
                enabled: true,
                items: [],
            }),
            linkOptions({
                title: "Xonalar",
                to: "/settings/rooms",
                enabled: true,
                items: [],
            }),
            linkOptions({
                title: "Kurslar",
                to: "/settings/courses",
                enabled: true,
                items: [],
            }),
            linkOptions({
                title: "To'lov turlari",
                to: "/settings/payment-type",
                enabled: true,
                items: [],
            }),
            linkOptions({
                title: "Dam olish kunlari",
                to: "/settings/holidays",
                enabled: true,
                items: [],
            }),
            linkOptions({
                title: "Rollar",
                to: "/settings/roles",
                enabled: true,
                items: [],
            }),
        ],
    }),
]
