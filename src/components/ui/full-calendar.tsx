import { useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select2"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Home } from "lucide-react"
import generateTimeSlots from "@/lib/generate-time-slots"

type Props = {
    work: WorkTime[]
    rooms: RoomList[]
    work_start_date: string
    work_end_date: string
}
 
export default function FullCalendar({
    rooms,
    work,
    work_start_date,
    work_end_date,
}: Props) {
    const [timeInterval, setTimeInterval] = useState("30")
    const [timeSlots, setTimeSlots] = useState<string[]>([])
    const [skipCells, setSkipCells] = useState<Record<string, boolean>>({})

    useEffect(() => {
        const newTimeSlots = generateTimeSlots(
            work_start_date,
            work_end_date,
            Number.parseInt(timeInterval),
        )
        setTimeSlots(newTimeSlots)

        setSkipCells({})
    }, [timeInterval])

    const calculateColSpan = (startTime: string, endTime: string): number => {
        const startIndex = timeSlots.findIndex((slot) => slot === startTime)
        if (startIndex === -1) return 1

        let endIndex = timeSlots.findIndex((slot) => slot >= endTime)
        if (endIndex === -1) endIndex = timeSlots.length

        return Math.max(1, endIndex - startIndex)
    }

    const getBookingForSlot = (
        roomId: string,
        timeSlot: string,
    ): WorkTime | undefined => {
        return work.find(
            (booking) =>
                booking.roomId === roomId &&
                timeSlot >= booking.startTime &&
                timeSlot < booking.endTime,
        )
    }

    const prepareTableData = () => {
        const newSkipCells: Record<string, boolean> = {}

        rooms.forEach((room) => {
            let lastBookingId: string | null = null

            timeSlots.forEach((slot) => {
                const booking = getBookingForSlot(room.id, slot)
                const cellKey = `${room.id}-${slot}`

                if (booking) {
                    if (lastBookingId === booking.id) {
                        newSkipCells[cellKey] = true
                    } else {
                        lastBookingId = booking.id
                    }
                } else {
                    lastBookingId = null
                }
            })
        })

        setSkipCells(newSkipCells)
    }

    useEffect(() => {
        if (timeSlots.length > 0) {
            prepareTableData()
        }
    }, [timeSlots])

    const handleIntervalChange = (value: string) => {
        setTimeInterval(value)
    }

    return (
        <Card>
            <CardContent className="space-y-4 rounded-md">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between  gap-4">
                    <h1 className="font-medium text-xl">Dars jadvali (calendar qolib ketgan)</h1>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                            Vaqt interval
                        </span>
                        <Select
                            value={timeInterval}
                            onValueChange={handleIntervalChange}
                        >
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Interval" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="15">15 daqiqa</SelectItem>
                                <SelectItem value="30">30 daqiqa</SelectItem>
                                <SelectItem value="60">60 daqiqa</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="overflow-x-auto w-full">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="rounded-tl-md">
                                    <div className="whitespace-nowrap flex items-center gap-2  ">
                                        <Home className="h-4 w-4 text-muted-foreground" />
                                        <span>Xonalar / Soatlar</span>
                                    </div>
                                </TableHead>
                                {timeSlots.map((slot, index) => (
                                    <TableHead
                                        key={index}
                                        className="text-center min-w-[80px] border-l last:rounded-tr-md"
                                    >
                                        {slot}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {rooms.map((room) => (
                                <TableRow
                                    key={room.id}
                                    className="border-b-none"
                                >
                                    <TableCell className="font-medium border-b ">
                                        {room.name}
                                    </TableCell>
                                    {timeSlots.map((timeSlot) => {
                                        const cellKey = `${room.id}-${timeSlot}`

                                        if (skipCells[cellKey]) {
                                            return null
                                        }

                                        const booking = getBookingForSlot(
                                            room.id,
                                            timeSlot,
                                        )

                                        if (!booking) {
                                            return (
                                                <TableCell
                                                    key={cellKey}
                                                    className="text-center p-1 border-l border-b"
                                                >
                                                    <span className="text-muted-foreground/50 text-xs">
                                                        Bo'sh
                                                    </span>
                                                </TableCell>
                                            )
                                        }

                                        const colSpan = calculateColSpan(
                                            timeSlot,
                                            booking.endTime,
                                        )

                                        return (
                                            <TableCell
                                                key={cellKey}
                                                className="text-center p-1 border"
                                                colSpan={colSpan}
                                            >
                                                <div
                                                    className={`text-xs min-h-[50px] rounded p-1  flex flex-col items-center justify-center ${booking.color}`}
                                                >
                                                    <div className="flex items-center whitespace-nowrap">
                                                        <span className="font-medium">
                                                            {
                                                                booking.course_name
                                                            }
                                                        </span>
                                                        <span className="ml-1">
                                                            ({booking.startTime}
                                                            -{booking.endTime})
                                                        </span>
                                                    </div>
                                                    <span>
                                                        {booking.teacher_name}
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
