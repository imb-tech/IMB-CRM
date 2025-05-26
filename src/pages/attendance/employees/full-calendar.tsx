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
import { formatPhoneNumber } from "@/lib/format-phone-number"
import ParamDateRange from "@/components/as-params/date-picker-range"

type Props = {
    data: TCalendarAttendance
}

const statusText: { [key: string]: { text: string; color: string } } = {
    present: {
        text: "Kelgan",
        color: "🟢",
    },
    late: {
        text: "Kechikkan",
        color: "🟡",
    },
    absent: {
        text: "Kelmagan",
        color: "🔴",
    },
     excused: {
    text: "Sababli",
    color: "🔵",
  }
}

export default function FullCalendarEmployees({ data }: Props) {
    return (
        <Card>
            <CardContent className="space-y-4 rounded-md">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between  gap-4">
                    <div className=" flex items-center gap-4">
                        <h1 className="font-medium text-xl">
                            Xodimlar davomati
                        </h1>
                    </div>
                    <ParamDateRange />
                </div>

                <div className="overflow-x-auto w-full">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="rounded-tl-md sticky left-0 z-20 bg-secondary">
                                    <div className="whitespace-nowrap flex items-center gap-2  ">
                                        <Home className="h-4 w-4 text-muted-foreground" />
                                        <span>Xodimlar / Sana</span>
                                    </div>
                                </TableHead>
                                {data.dates.map((item, index) => (
                                    <TableHead
                                        key={index}
                                        className="text-center min-w-[80px] border-l last:rounded-tr-md"
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
                                    <TableCell className="border-b sticky left-0 z-20 bg-secondary">
                                        <div className="flex flex-col">
                                            <span className="whitespace-nowrap">
                                                {employe.first_name}
                                            </span>
                                            <span className="whitespace-nowrap">
                                                {formatPhoneNumber(
                                                    employe.phone,
                                                )}
                                            </span>
                                        </div>
                                    </TableCell>

                                    {employe.attendances.map((atend) => (
                                        <TableCell
                                            key={`${atend}`}
                                            className="text-center p-1 border"
                                        >
                                            <div className="text-xs min-h-[50px] rounded p-1 flex flex-col items-center justify-center">
                                                <span className="whitespace-nowrap">
                                                    {
                                                        statusText[atend.status]
                                                            .color
                                                    }{" "}
                                                    {
                                                        statusText[atend.status]
                                                            .text
                                                    }
                                                </span>
                                            </div>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
