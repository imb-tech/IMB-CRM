import * as React from "react"
import { ChevronDown } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import ParamDateRange from "@/components/as-params/date-picker-range"
import { ParamCombobox } from "@/components/as-params/combobox"
import { cn } from "@/lib/utils"

export default function StudentsAttendanceMain() {
    const [openRows, setOpenRows] = React.useState<AttendanceStudent | null>()

    return (
        <div className="w-full">
            <Card>
                <CardContent className="space-y-4 rounded-md">
                    <h1 className="font-medium text-xl">
                        O'quvchilar davomati
                    </h1>

                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 ">
                        <div className="w-full">
                            <ParamDateRange className="w-full" />
                        </div>
                        <ParamCombobox
                            isSearch={false}
                            label="Davomat holati"
                            className="w-full"
                            options={[
                                {
                                    label: "Barchasi",
                                    value: "all",
                                },
                                {
                                    label: "Faol",
                                    value: "active",
                                },
                            ]}
                            paramName="status"
                        />
                        <ParamCombobox
                            isSearch={false}
                            label="O'qituvchi"
                            className="w-full"
                            options={[
                                {
                                    label: "Barchasi",
                                    value: "all",
                                },
                                {
                                    label: "Faol",
                                    value: "active",
                                },
                            ]}
                            paramName="status"
                        />
                        <ParamCombobox
                            isSearch={false}
                            label="Holat"
                            className="w-full"
                            options={[
                                {
                                    label: "Barchasi",
                                    value: "all",
                                },
                                {
                                    label: "Faol",
                                    value: "active",
                                },
                            ]}
                            paramName="status"
                        />
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50">
                                <TableHead className="w-16">ID</TableHead>
                                <TableHead>Guruh nomi</TableHead>
                                <TableHead>{"O'qituvchi"}</TableHead>
                                <TableHead>Guruh davomiyigi</TableHead>
                                <TableHead>{"Kelmagan o'quvchilar"}</TableHead>
                                <TableHead className="w-12"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((course, index) => (
                                <React.Fragment key={course.id}>
                                    <TableRow
                                        className={cn(
                                            "hover:bg-gray-200 cursor-pointer dark:hover:bg-secondary border-none ",
                                            index % 2 !== 0 &&
                                                "bg-secondary/70",
                                        )}
                                        onClick={() => {
                                            if (openRows?.id === course.id) {
                                                setOpenRows(null)
                                            } else {
                                                setOpenRows(course)
                                            }
                                        }}
                                    >
                                        <TableCell className="font-medium border-r border-r-secondary">
                                            {course.id}
                                        </TableCell>
                                        <TableCell className="border-r border-r-secondary">
                                            {course.groupName}
                                        </TableCell>
                                        <TableCell className="border-r border-r-secondary">
                                            {course.teacher}
                                        </TableCell>
                                        <TableCell className="border-r border-r-secondary">
                                            {course.duration}
                                        </TableCell>
                                        <TableCell className="border-r border-r-secondary">
                                            <Badge
                                                variant="destructive"
                                                className="bg-red-200 text-red-600 "
                                            >
                                                {course.attendance}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <ChevronDown
                                                className={cn(
                                                    "h-4 w-4 transition-all",

                                                    course.id === openRows?.id ?
                                                        " rotate-180"
                                                    :   "rotate-0",
                                                )}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    {course.id === openRows?.id && (
                                        <TableRow className="transition-all">
                                            <TableCell
                                                colSpan={6}
                                                className="p-0"
                                            >
                                                <div className="bg-gray-50 p-4">
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow className="bg-gray-100">
                                                                <TableHead className="w-16">
                                                                    #
                                                                </TableHead>
                                                                <TableHead>
                                                                    Ism
                                                                </TableHead>
                                                                <TableHead>
                                                                    Izoh
                                                                </TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {course.students.map(
                                                                (
                                                                    student,
                                                                    idx,
                                                                ) => (
                                                                    <TableRow
                                                                        key={
                                                                            student.id
                                                                        }
                                                                        className={cn(
                                                                            "hover:bg-gray-200  dark:hover:bg-secondary border-none ",
                                                                            idx %
                                                                                2 !==
                                                                                0 &&
                                                                                "bg-secondary/70",
                                                                        )}
                                                                    >
                                                                        <TableCell className="font-medium">
                                                                            {
                                                                                student.id
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {
                                                                                student.name
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell className="text-gray-500">
                                                                            {
                                                                                student.status
                                                                            }
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ),
                                                            )}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

const data: AttendanceStudent[] = [
    {
        id: 1,
        groupName: "BackEnd 101",
        teacher: "Alisher Shamuratov",
        duration: "2024-09-01 / 2025-05-01",
        attendance: "10/50",
        students: [
            { id: 1, name: "Jasurbek", status: "Izoh yo'q" },
            { id: 2, name: "Asror", status: "Izoh yo'q" },
            { id: 3, name: "Avazbek", status: "Izoh yo'q" },
            { id: 4, name: "Kamoliddin", status: "Izoh yo'q" },
            { id: 5, name: "Sardor", status: "Izoh yo'q" },
        ],
    },
    {
        id: 2,
        groupName: "BackEnd 102",
        teacher: "Shohjahon Hamidov",
        duration: "2024-10-01 / 2025-06-01",
        attendance: "12/50",
        students: [
            { id: 1, name: "Muhammadali", status: "Izoh yo'q" },
            { id: 2, name: "Bekzod", status: "Izoh yo'q" },
            { id: 3, name: "Dilshod", status: "Izoh yo'q" },
            { id: 4, name: "Javohir", status: "Izoh yo'q" },
            { id: 5, name: "Ali", status: "Izoh yo'q" },
        ],
    },
    {
        id: 3,
        groupName: "BackEnd 103",
        teacher: "Alisher Shamuratov",
        duration: "2024-11-01 / 2025-07-01",
        attendance: "5/50",
        students: [
            { id: 1, name: "Vali", status: "Izoh yo'q" },
            { id: 2, name: "Sirojiddin", status: "Izoh yo'q" },
            { id: 3, name: "Jasurbek", status: "Izoh yo'q" },
            { id: 4, name: "Asror", status: "Izoh yo'q" },
            { id: 5, name: "Avazbek", status: "Izoh yo'q" },
        ],
    },
    {
        id: 4,
        groupName: "BackEnd 104",
        teacher: "Shohjahon Hamidov",
        duration: "2024-12-01 / 2025-08-01",
        attendance: "20/50",
        students: [
            { id: 1, name: "Kamoliddin", status: "Izoh yo'q" },
            { id: 2, name: "Sardor", status: "Izoh yo'q" },
            { id: 3, name: "Muhammadali", status: "Izoh yo'q" },
            { id: 4, name: "Bekzod", status: "Izoh yo'q" },
            { id: 5, name: "Dilshod", status: "Izoh yo'q" },
        ],
    },
    {
        id: 5,
        groupName: "BackEnd 105",
        teacher: "Alisher Shamuratov",
        duration: "2024-09-01 / 2025-05-01",
        attendance: "7/50",
        students: [
            { id: 1, name: "Javohir", status: "Izoh yo'q" },
            { id: 2, name: "Ali", status: "Izoh yo'q" },
            { id: 3, name: "Vali", status: "Izoh yo'q" },
            { id: 4, name: "Sirojiddin", status: "Izoh yo'q" },
            { id: 5, name: "Jasurbek", status: "Izoh yo'q" },
        ],
    },
    {
        id: 6,
        groupName: "BackEnd 106",
        teacher: "Shohjahon Hamidov",
        duration: "2024-10-01 / 2025-06-01",
        attendance: "13/50",
        students: [
            { id: 1, name: "Asror", status: "Izoh yo'q" },
            { id: 2, name: "Avazbek", status: "Izoh yo'q" },
            { id: 3, name: "Kamoliddin", status: "Izoh yo'q" },
            { id: 4, name: "Sardor", status: "Izoh yo'q" },
            { id: 5, name: "Muhammadali", status: "Izoh yo'q" },
        ],
    },
    {
        id: 7,
        groupName: "BackEnd 107",
        teacher: "Alisher Shamuratov",
        duration: "2024-11-01 / 2025-07-01",
        attendance: "18/50",
        students: [
            { id: 1, name: "Bekzod", status: "Izoh yo'q" },
            { id: 2, name: "Dilshod", status: "Izoh yo'q" },
            { id: 3, name: "Javohir", status: "Izoh yo'q" },
            { id: 4, name: "Ali", status: "Izoh yo'q" },
            { id: 5, name: "Vali", status: "Izoh yo'q" },
        ],
    },
    {
        id: 8,
        groupName: "BackEnd 108",
        teacher: "Shohjahon Hamidov",
        duration: "2024-12-01 / 2025-08-01",
        attendance: "9/50",
        students: [
            { id: 1, name: "Sirojiddin", status: "Izoh yo'q" },
            { id: 2, name: "Jasurbek", status: "Izoh yo'q" },
            { id: 3, name: "Asror", status: "Izoh yo'q" },
            { id: 4, name: "Avazbek", status: "Izoh yo'q" },
            { id: 5, name: "Kamoliddin", status: "Izoh yo'q" },
        ],
    },
    {
        id: 9,
        groupName: "BackEnd 109",
        teacher: "Alisher Shamuratov",
        duration: "2024-09-01 / 2025-05-01",
        attendance: "15/50",
        students: [
            { id: 1, name: "Sardor", status: "Izoh yo'q" },
            { id: 2, name: "Muhammadali", status: "Izoh yo'q" },
            { id: 3, name: "Bekzod", status: "Izoh yo'q" },
            { id: 4, name: "Dilshod", status: "Izoh yo'q" },
            { id: 5, name: "Javohir", status: "Izoh yo'q" },
        ],
    },
    {
        id: 10,
        groupName: "BackEnd 110",
        teacher: "Shohjahon Hamidov",
        duration: "2024-10-01 / 2025-06-01",
        attendance: "22/50",
        students: [
            { id: 1, name: "Ali", status: "Izoh yo'q" },
            { id: 2, name: "Vali", status: "Izoh yo'q" },
            { id: 3, name: "Sirojiddin", status: "Izoh yo'q" },
            { id: 4, name: "Jasurbek", status: "Izoh yo'q" },
            { id: 5, name: "Asror", status: "Izoh yo'q" },
        ],
    },
]
