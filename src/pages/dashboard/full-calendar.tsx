import { useCallback, useEffect, useState } from "react"
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
import ParamDatePicker from "../../components/as-params/date-picker"
import useHistoryNavigate from "@/hooks/use-history-navigate"
import { useGet } from "@/hooks/useGet"
import { ROOM } from "@/constants/api-endpoints"

type Props = {
    work: WorkTime[]
    rooms: RoomList[]
    work_start_date: string
    work_end_date: string
}

type DashRoom = {
    id: number,
    start_time: string
    end_time: string
    group: {
        id: number
        name: string
        teacher: string
    },
    room_id: number
}

export default function FullCalendar({
    work_start_date,
    work_end_date,
}: Props) {
    const [timeInterval, setTimeInterval] = useState("30")
    const [timeSlots, setTimeSlots] = useState<string[]>([])
    const [skipCells, setSkipCells] = useState<Record<string, boolean>>({})

    const { data } = useGet<DashRoom[]>('platform/statistics/dashboard/group-shifts')
    const { data: room_list } = useGet<ListResp<Room>>(ROOM)

    const { push } = useHistoryNavigate()

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

    const getBookingForSlot = useCallback((
        roomId: number,
        timeSlot: string,
    ): DashRoom | undefined => {
        return data?.find(
            (booking) =>
                booking.room_id === roomId &&
                timeSlot === booking.start_time?.slice(0, 5) &&
                timeSlot < booking.end_time?.slice(0, 5),
        )
        // return data?.groups[0]
    }, [data])

    const prepareTableData = useCallback(() => {
        const newSkipCells: Record<string, boolean> = {}

        room_list?.results?.forEach((room) => {
            let lastBookingId: number | null = null

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
    }, [room_list])

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
                    <div className=" flex items-center gap-4">
                        <h1 className="font-medium text-xl">Dars jadvali</h1>
                        <ParamDatePicker />
                    </div>
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
                                <TableHead className="rounded-tl-md sticky left-0 z-20 bg-secondary">
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
                            {data && room_list?.results?.map((room) => (
                                <TableRow
                                    key={room.id}
                                    className="border-b-none"
                                >
                                    <TableCell className="font-medium sticky left-0 z-20 bg-secondary">
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
                                                    className="text-center p-1 "
                                                >
                                                    <span className="text-muted-foreground/50 text-xs">
                                                        Bo'sh
                                                    </span>
                                                </TableCell>
                                            )
                                        }

                                        const colSpan = calculateColSpan(
                                            timeSlot,
                                            booking.end_time,
                                        )

                                        return (
                                            <TableCell
                                                key={cellKey}
                                                className="text-center p-1"
                                                colSpan={colSpan}
                                            >
                                                <div
                                                    className={`text-xs min-h-[50px] rounded p-1  flex flex-col items-center justify-center font-extralight bg-primary/10`}
                                                    onClick={() =>
                                                        push(
                                                            `/groups/${booking.group.id}/students`,
                                                        )
                                                    }
                                                >
                                                    <div className="flex items-center whitespace-nowrap">
                                                        <span className="font-medium">
                                                            {
                                                                booking.group.name
                                                            }
                                                        </span>
                                                        <span className="ml-1">
                                                            ({booking.start_time?.slice(0, 5)}
                                                            -{booking.end_time?.slice(0, 5)})
                                                        </span>
                                                    </div>
                                                    <span>
                                                        {booking.group.teacher}
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
