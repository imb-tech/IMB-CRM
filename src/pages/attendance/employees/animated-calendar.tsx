import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useMemo, useState } from "react"
import { cn, months } from "@/lib/utils"
import { formatDate } from "date-fns"
import { dailyData, data } from "."
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import generateTimeSlots from "@/lib/generate-time-slots"
import { Calendar, ChevronLeft } from "lucide-react"

const statusText: { [key: string]: { text: string; bgColor: string } } = {
    present: {
        text: "6s 25m",
        bgColor: "bg-green-500/20",
    },
    absent: {
        text: "Kelmagan",
        bgColor: "bg-red-500/20",
    },
}
type View = "month" | "day"

export default function AnimatedCalendar() {
    const [view, setView] = useState<View>("month")
    const [direction, setDirection] = useState<"forward" | "backward">(
        "forward",
    )
    const [timeSlots, setTimeSlots] = useState<string[]>([])
    const [skipCells, setSkipCells] = useState<Record<string, boolean>>({})

    const handleToggle = (v: View) => {
        if (v === "day") {
            setDirection("forward")
        } else {
            setDirection("backward")
        }
        setView(v)
    }

    const variants = {
        enter: (dir: "forward" | "backward") => ({
            opacity: 0,
            scale: dir === "forward" ? 0.8 : 1.2,
        }),
        center: { opacity: 1, scale: 1 },
        exit: (dir: "forward" | "backward") => ({
            opacity: 0,
            scale: dir === "forward" ? 1.2 : 0.8,
        }),
    }

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

    const calculateColSpan = (startTime: string, endTime: string): number => {
        const startIndex = timeSlots.findIndex((slot) => slot === startTime)
        if (startIndex === -1) return 1

        let endIndex = timeSlots.findIndex((slot) => slot >= endTime)
        if (endIndex === -1) endIndex = timeSlots.length

        return Math.max(1, endIndex - startIndex)
    }

    const getBookingForSlot = (
        roomId: number,
        timeSlot: string,
    ): WorkTime | undefined => {
        return dailyData.work_time.find(
            (booking) =>
                booking.roomId === roomId &&
                timeSlot >= booking.startTime &&
                timeSlot < booking.endTime,
        )
    }

    useEffect(() => {
        const newTimeSlots = generateTimeSlots(
            dailyData.work_start_date,
            dailyData.work_end_date,
            Number.parseInt("30"),
        )
        setTimeSlots(newTimeSlots)

        setSkipCells({})
    }, [])

    const prepareTableData = () => {
        const newSkipCells: Record<string, boolean> = {}

        dailyData.room_list.forEach((room) => {
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

    return (
        <Card>
            <CardContent className="space-y-2 rounded-md p-3">
                <div className="flex">
                    <aside className="min-w-[200px] max-w-[200px]">
                        {
                            <div className="w-full">
                                <div className="!h-[37px]">
                                    {view == "day" && (
                                        <Button
                                            onClick={() =>
                                                handleToggle("month")
                                            }
                                            className="items-center"
                                        >
                                            <ChevronLeft size={16} />
                                            <Calendar size={16} />
                                            Avgust
                                        </Button>
                                    )}
                                </div>
                                {data.result.map((employe) => (
                                    <div key={employe.id}>
                                        <div className="border-b sticky left-0 z-20 border-secondary min-h-[70px]">
                                            <div className="flex flex-col py-2">
                                                <span className="whitespace-nowrap mb-[2px]">
                                                    {employe.first_name}
                                                </span>
                                                <span className="whitespace-nowrap text-muted-foreground">
                                                    {"Software Engineer"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </aside>
                    <div className="overflow-hidden">
                        <AnimatePresence mode="wait" custom={direction}>
                            {view === "month" ?
                                <motion.div
                                    key="month"
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        duration: 0.15,
                                        ease: "easeInOut",
                                    }}
                                    className="w-full h-full"
                                >
                                    <section className="w-full max-w-[full] overflow-x-auto">
                                        <div className="flex items-center">
                                            {data.dates.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="text-start flex items-center min-w-[80px] last:rounded-tr-md border-r pl-2 pb-2 pt-1"
                                                    onClick={() =>
                                                        handleToggle("day")
                                                    }
                                                >
                                                    {item.date.slice(-2)}
                                                </div>
                                            ))}
                                        </div>
                                        {data.result.map((employe) => (
                                            <div key={employe.id}>
                                                <div
                                                    className={cn(
                                                        "flex max-w-full min-h-[70px] items-center border-t border-secondary",
                                                    )}
                                                >
                                                    {data.dates.map(
                                                        (dateItem, i) => {
                                                            const status =
                                                                attendanceMap[
                                                                    i
                                                                ]?.[
                                                                    dateItem
                                                                        .date
                                                                ] || "absent"
                                                            return (
                                                                <div
                                                                    key={`${employe.id}-${dateItem.date}`}
                                                                    className="text-center min-w-[80px] px-1 "
                                                                >
                                                                    <div
                                                                        className={cn(
                                                                            "text-xs min-h-[30px] w-full rounded p-1 flex flex-col items-center justify-center",
                                                                            statusText[
                                                                                status
                                                                            ]
                                                                                ?.bgColor,
                                                                        )}
                                                                    >
                                                                        <span
                                                                            className={
                                                                                "whitespace-nowrap"
                                                                            }
                                                                        >
                                                                            {
                                                                                statusText[
                                                                                    status
                                                                                ]
                                                                                    ?.text
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        },
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </section>
                                </motion.div>
                            :   <motion.div
                                    key="day"
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        duration: 0.15,
                                        ease: "easeInOut",
                                    }}
                                    className="w-full h-full"
                                >
                                    <section className="w-full max-w-[full] overflow-x-auto">
                                        <div className="flex items-center">
                                            {timeSlots.map((slot, index) => (
                                                <div
                                                    key={index}
                                                    className="text-start flex items-center min-w-[80px] last:rounded-tr-md border-r pl-2 pb-2 pt-1"
                                                >
                                                    <span>{slot}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="w-full">
                                            {dailyData.room_list.map((room) => (
                                                <div
                                                    key={room.id}
                                                    className=" flex border-secondary/40"
                                                >
                                                    {timeSlots.map(
                                                        (timeSlot) => {
                                                            const cellKey = `${room.id}-${timeSlot}`

                                                            if (
                                                                skipCells[
                                                                    cellKey
                                                                ]
                                                            ) {
                                                                return null
                                                            }

                                                            const booking =
                                                                getBookingForSlot(
                                                                    room.id,
                                                                    timeSlot,
                                                                )

                                                            if (!booking) {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            cellKey
                                                                        }
                                                                        className="text-center p-1 border border-secondary/50 min-w-[80px]"
                                                                    ></div>
                                                                )
                                                            }

                                                            const colSpan =
                                                                calculateColSpan(
                                                                    timeSlot,
                                                                    booking.endTime,
                                                                )

                                                            return (
                                                                <div
                                                                    key={
                                                                        cellKey
                                                                    }
                                                                    className={cn(
                                                                        "text-center p-0 border border-secondary/50 min-h-[70px] flex items-center px-[2px]",
                                                                    )}
                                                                    style={{
                                                                        minWidth: `${String(80 * colSpan)}px`,
                                                                    }}
                                                                >
                                                                    <div
                                                                        className={`text-xs min-h-[30px] p-1  flex items-center justify-center font-extralight bg-primary/20 w-full rounded`}
                                                                    >
                                                                        <div className="flex items-start flex-col text-[14px] whitespace-nowrap">
                                                                            <span className="ml-1">
                                                                                {
                                                                                    "2s 35m"
                                                                                }
                                                                                {
                                                                                    // booking.startTime
                                                                                }
                                                                            </span>
                                                                            <span className="ml-1 hidden">
                                                                                /
                                                                            </span>
                                                                            <span className="ml-1 hidden">
                                                                                {
                                                                                    booking.endTime
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        },
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
