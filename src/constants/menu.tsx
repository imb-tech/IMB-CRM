import { linkOptions } from "@tanstack/react-router"
import {
    ArchiveRestore,
    Award,
    CalendarRange,
    ChartNoAxesCombined,
    ClipboardList,
    DollarSign,
    GraduationCap,
    House,
    Layers,
    MessageCircleMore,
    NotebookText,
    NotepadText,
    Percent,
    Settings,
    Users,
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
                title: "O'quvchilar",
                to: `/groups/$id/students`,
                params: {
                    id: groupId,
                },
            }),
            linkOptions({
                title: "Davomat",
                to: `/groups/$id/attendance`,
                params: {
                    id: groupId,
                },
            }),
            linkOptions({
                title: "Baholar",
                to: `/groups/$id/score`,
                params: {
                    id: groupId,
                },
            }),
            linkOptions({
                title: "Vazifalar",
                to: `/groups/$id/tasks`,
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
            linkOptions({
                title: "Eslatma",
                to: `/groups/$id/notes`,
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
                icon: <Layers width={16} />,
                params: {
                    id: studentId,
                },
            }),
            linkOptions({
                title: "To'lovlar",
                to: "/students/$id/payments",
                icon: <DollarSign width={16} />,
                params: {
                    id: studentId,
                },
            }),
            linkOptions({
                title: "O'zlashtirish",
                to: "/students/$id/appropriation",
                icon: <Award width={16} />,
                params: {
                    id: studentId,
                },
            }),
            linkOptions({
                title: "Chegirma",
                to: "/students/$id/discount",
                icon: <Percent width={16} />,
                params: {
                    id: studentId,
                },
            }),
            linkOptions({
                title: "Ota-Ona",
                to: "/students/$id/parents",
                icon: <Users width={16} />,
                params: {
                    id: studentId,
                },
            }),
            linkOptions({
                title: "Eslatmalar",
                to: "/students/$id/notes",
                icon: <NotepadText width={16} />,
                params: {
                    id: studentId,
                },
            }),
            linkOptions({
                title: "SMS Xabarlar",
                to: "/students/$id/send-message",
                icon: <MessageCircleMore width={16} />,
                params: {
                    id: studentId,
                },
            }),
            linkOptions({
                title: "Tarix",
                to: "/students/$id/history",
                icon: <ArchiveRestore width={16} />,
                params: {
                    id: studentId,
                },
            }),
        ],
        [],
    )
}
