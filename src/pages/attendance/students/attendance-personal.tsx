import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { useStore } from "@/hooks/use-store"
import { useModal } from "@/hooks/useModal"
import { cn } from "@/lib/utils"
import {
    getStatusColor,
    getStatusIcon,
} from "@/pages/group-detail/attendance-select"
import { ColumnDef } from "@tanstack/react-table"
import { PanelRightClose } from "lucide-react"
import { useMemo } from "react"

type PersonalAttendance = {
    id: number
    date: string
    status: "present" | "absent" | "late"
    reason: string
    employee: string
}

export function SheetDemo() {
    const { isOpen, closeModal } = useModal()
    const { store } = useStore<{ name: string }>("personal")
    const data: PersonalAttendance[] = [
        {
            id: 1,
            date: "12.08",
            status: "absent",
            reason: "Tishi og'rib qopti",
            employee: "Shohjahon Xamidov",
        },
        {
            id: 2,
            date: "12.08",
            status: "present",
            reason: "",
            employee: "Dilshod Karimov",
        },
        {
            id: 3,
            date: "12.08",
            status: "late",
            reason: "Yo‘l tirbandligi",
            employee: "Gulbahor Qodirova",
        },
        {
            id: 4,
            date: "12.08",
            status: "present",
            reason: "",
            employee: "Otabek Yo‘ldoshev",
        },
        {
            id: 5,
            date: "12.08",
            status: "absent",
            reason: "Oilaviy sabablarga ko‘ra",
            employee: "Zarina Murodova",
        },
        {
            id: 6,
            date: "12.08",
            status: "present",
            reason: "",
            employee: "Akmal Rasulov",
        },
        {
            id: 7,
            date: "12.08",
            status: "late",
            reason: "Avtobus kechikdi",
            employee: "Malika Tursunova",
        },
        {
            id: 8,
            date: "12.08",
            status: "present",
            reason: "",
            employee: "Bekzod Usmonov",
        },
        {
            id: 9,
            date: "12.08",
            status: "absent",
            reason: "Kasal bo‘lib qoldi",
            employee: "Diyorbek Raxmatov",
        },
        {
            id: 10,
            date: "12.08",
            status: "present",
            reason: "",
            employee: "Saida Karimova",
        },
    ]

    return (
        <div>
            <div
                className={cn(
                    "w-[60%] h-screen overflow-y-auto no-scrollbar fixed !z-[9999] top-0 -right-[100%] bg-card p-10 pt-4 shadow-lg transition-all duration-500",
                    isOpen ? "right-0" : "",
                )}
            >
                <Button
                    variant="secondary"
                    className="mb-4"
                    onClick={closeModal}
                >
                    <PanelRightClose />
                </Button>
                <h1>
                    {store?.name} ning 10.07.2025 - 10.08.2025 oraliqdagi
                    davomat statistikasi
                </h1>

                <DataTable
                    columns={columns()}
                    viewAll
                    data={data}
                    className="w-full"
                    wrapperClassName="mt-3"
                    minRows={14}
                    numeration
                />
            </div>
        </div>
    )
}

const columns = () => {
    return useMemo<ColumnDef<PersonalAttendance>[]>(
        () => [
            {
                header: "Sana",
                accessorKey: "date",
            },
            {
                header: "Holat",
                accessorKey: "status",
                cell({ row }) {
                    return (
                        <p
                            className={cn(
                                getStatusColor(row.original.status, "text"),
                                "p-2 rounded-lg flex items-center gap-2",
                            )}
                        >
                            {getStatusIcon(row.original.status, 14)}
                            <span>
                                {
                                    {
                                        present: "Keldi",
                                        late: "Kechikdi",
                                        absent: "Kelmadi",
                                    }[row.original.status]
                                }
                            </span>
                        </p>
                    )
                },
            },
            {
                header: "Sabab",
                accessorKey: "reason",
            },
            {
                header: "Hodim",
                accessorKey: "employee",
            },
        ],
        [],
    )
}
