import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Home } from "lucide-react"
import { useMemo } from "react"
import { cn, months, optionYears } from "@/lib/utils"
import { ParamCombobox } from "@/components/as-params/combobox"
import { formatDate } from "date-fns"

type Props = {
    data: TCalendarAttendance
}

const statusText: { [key: string]: { text: string; bgColor: string } } = {
    present: {
        text: "6s 25m",
        bgColor: "bg-green-500/20 dark:bg-green-400/30",
    },
    absent: {
        text: "Kelmagan",
        bgColor: "bg-red-500/20 dark:bg-red-400/30",
    },
}

export default function FullCalendarEmployees({ data }: Props) {
    const attendanceMap = useMemo(() => {
        const map: Record<number, Record<string, string>> = {}
        data.result.forEach((emp) => {
            map[emp.id] = {}
            emp.attendances.forEach((att) => {
                map[emp.id][att.date] = att.status
            })
        })
        return map
    }, [data])

    const currentDate = formatDate(new Date(), "MM")
    const currentMonth = useMemo(
        () => months.find((k) => k.key == currentDate),
        [currentDate],
    )

    
    return (
        <Card>
            <CardContent className="space-y-2 rounded-md p-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between  gap-4">
                    <div className=" flex items-center gap-4">
                        <h1 className="font-medium text-xl">
                            Xodimlar davomati
                        </h1>
                    </div>
                    <div className="flex gap-1">
                        <ParamCombobox
                            isSearch={false}
                            label="Oy"
                            className="w-full dark:!bg-background"
                            options={months.map((d) => ({
                                label: d.name,
                                value: d.key,
                            }))}
                            defaultOpt={{
                                label: currentMonth?.name,
                                value: currentMonth?.key,
                            }}
                            dontAllowClear
                            paramName="month"
                        />
                        <ParamCombobox
                            isSearch={false}
                            label="Yil"
                            className="w-full dark:!bg-background"
                            options={optionYears("label", "value")}
                            defaultOpt={optionYears("label", "value")[0]}
                            dontAllowClear
                            paramName="year"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto w-full">
                    <Table>
                        <TableHeader className="border-none">
                            <TableRow className="border-none">
                                <TableHead className="rounded-tl-md sticky left-0 z-20 bg-secondary">
                                    <div className="whitespace-nowrap flex items-center gap-2  ">
                                        <Home className="h-4 w-4 text-muted-foreground" />
                                        <span>Xodim / Sana</span>
                                    </div>
                                </TableHead>
                                {data.dates.map((item, index) => (
                                    <TableHead
                                        key={index}
                                        className="text-center min-w-[80px] border-last:rounded-tr-md"
                                    >
                                        {item.date.slice(-2)}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {data.result.map((employe) => (
                                <TableRow
                                    key={employe.id}
                                    className="border-b-none"
                                >
                                    <TableCell className="border-b sticky left-0 z-20 border-r border-secondary bg-background">
                                        <div className="flex flex-col py-2">
                                            <span className="whitespace-nowrap mb-[2px]">
                                                {employe.first_name}
                                            </span>
                                            <span className="whitespace-nowrap text-muted-foreground">
                                                {"Software Engineer"}
                                            </span>
                                        </div>
                                    </TableCell>

                                    {data.dates.map((dateItem, i) => {
                                        const status =
                                            attendanceMap[employe.id]?.[
                                                dateItem.date
                                            ] || "absent"
                                        return (
                                            <TableCell
                                                key={`${employe.id}-${dateItem.date}`}
                                                className="text-center px-2"
                                            >
                                                <div
                                                    className={cn(
                                                        "text-xs min-h-[30px] rounded p-1 flex flex-col items-center justify-center",
                                                        statusText[status]
                                                            ?.bgColor,
                                                    )}
                                                >
                                                    <span
                                                        className={
                                                            "whitespace-nowrap"
                                                        }
                                                    >
                                                        {
                                                            statusText[status]
                                                                ?.text
                                                        }
                                                    </span>
                                                </div>
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
