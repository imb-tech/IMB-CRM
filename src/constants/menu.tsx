import { linkOptions } from "@tanstack/react-router"
import {
    CalendarRange,
    ChartNoAxesCombined,
    ClipboardList,
    GraduationCap,
    House,
    Layers,
    NotebookText,
    Settings,
    Users2,
} from "lucide-react"
import { ReactNode, useMemo } from "react"

export interface MenuItem {
    label: string
    icon?: ReactNode
    path: string
}

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
        to: "/leads",
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
        items: [
            linkOptions({
                title: "Hodimlar",
                to: "/employees/hr",
                enabled: true,
                items: [],
            }),
            linkOptions({
                title: "Maoshlar",
                to: "/employees/salary",
                enabled: true,
                items: [],
            }),
        ],
    }),
    linkOptions({
        title: "O'quvchilar",
        icon: <GraduationCap width={20} />,
        to: "/students",
        enabled: true,
        items: [],
    }),
    linkOptions({
        title: "Davomatlar",
        icon: <CalendarRange width={20} />,
        to: "/attendance",
        enabled: true,
        items: [
            linkOptions({
                title: "Guruhlar davomati",
                to: "/attendance/students",
                enabled: true,
                items: [],
            }),
            linkOptions({
                title: "Xodimlar davomati",
                to: "/attendance/employees",
                enabled: true,
                items: [],
            }),
        ],
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
        icon: <Settings width={20} />,
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
                title: "Ta'til kunlari",
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

export const groupDetailNav = (groupId: string) => {
    return useMemo(
        () => [
            linkOptions({
                title: "Davomat",
                to: `/groups/$id/attendance`,
                params: {
                    id: groupId,
                },
            }),
            linkOptions({
                title: "O'quvchilar",
                to: `/groups/$id/students`,
                params: {
                    id: groupId,
                },
            }),
            linkOptions({
                title: "Baho",
                to: `/groups/$id/score`,
                params: {
                    id: groupId,
                },
            }),
            linkOptions({
                title: "Eslatma",
                to: `/groups/$id/notes`,
                params: {
                    id: groupId,
                },
            }),
            linkOptions({
                title: "Imtixon",
                to: `/groups/$id/exams`,
                params: {
                    id: groupId,
                },
            }),
            linkOptions({
                title: "Chegirma",
                to: `/groups/$id/sale`,
                params: {
                    id: groupId,
                },
            }),
        ],
        [],
    )
}

export const studentDetailNav = (studentId: string) => {
    return useMemo(
        () => [
            linkOptions({
                title: "Guruhlar",
                to: "/students/$id/groups",
                params: {
                    id: studentId,
                },
            }),
            linkOptions({
                title: "To'lovlar",
                to: "/students/$id/payments",
                params: {
                    id: studentId,
                },
            }),
            linkOptions({
                title: "Eslatmalar",
                to: "/students/$id/notes",
                params: {
                    id: studentId,
                },
            }),
            linkOptions({
                title: "Tarix",
                to: "/students/$id/history",
                params: {
                    id: studentId,
                },
            }),
            linkOptions({
                title: "Ma'sullar",
                to: "/students/$id/parents",
                params: {
                    id: studentId,
                },
            }),
        ],
        [],
    )
}
