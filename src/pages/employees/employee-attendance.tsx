import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import generateTimeSlots from "@/lib/generate-time-slots"
import { Calendar, ChevronLeft } from "lucide-react"
import { dailyData, data } from "../attendance/employees"
import Modal from "@/components/custom/modal"
import { Input } from "@/components/ui/input"
import { useModal } from "@/hooks/useModal"

export default function AnimatedCalendar() {
    const [timeSlots, setTimeSlots] = useState<string[]>([])
    const [skipCells, setSkipCells] = useState<Record<string, boolean>>({})
    const { openModal } = useModal()

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
                                    <p className="text-muted-foreground text-xl">
                                        Hodimlar
                                    </p>
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
                        <AnimatePresence mode="wait" custom={"forward"}>
                            <motion.div
                                key="day"
                                custom={"forward"}
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
                                                {timeSlots.map((timeSlot) => {
                                                    const cellKey = `${room.id}-${timeSlot}`

                                                    if (skipCells[cellKey]) {
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
                                                                key={cellKey}
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
                                                            key={cellKey}
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
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <aside className="min-w-[80px] max-w-[80px] bg-transparent border-l">
                        {
                            <div className="w-full flex flex-col items-center">
                                <div className="!h-[37px]"></div>
                                {data.result.map((employe) => (
                                    <div key={employe.id} className="bg-card">
                                        <div className="sticky left-0 z-20 border-secondary">
                                            <div className="min-h-[70px] flex items-center">
                                                {employe.id % 3 == 0 ?
                                                    <Button
                                                        variant="destructive"
                                                        onClick={openModal}
                                                    >
                                                        Ketdi
                                                    </Button>
                                                :   <Button variant="secondary">
                                                        Keldi
                                                    </Button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </aside>
                </div>
            </CardContent>

            <Modal size="max-w-md" title="Ketuvni tasdiqlash">
                <form className="pt-3">
                    <Input
                        defaultValue={"15:45"}
                        className="text-center"
                        fullWidth
                    />
                    <Button className="w-full mt-4">Tasdiqlash</Button>
                </form>
            </Modal>
        </Card>
    )
}
