import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import generateTimeSlots from "@/lib/generate-time-slots"
import { dailyData } from "../attendance/employees"
import Modal from "@/components/custom/modal"
import { Input } from "@/components/ui/input"
import { useModal } from "@/hooks/useModal"
import { useGet } from "@/hooks/useGet"
import { formatDate } from "date-fns"
import { usePost } from "@/hooks/usePost"
import { useForm } from "react-hook-form"
import FormTimeInput from "@/components/form/time-input"
import { cn } from "@/lib/utils"

type EWorkDuration = {
    id: number
    user: number
    check_in: string
    check_out: string
}

type EWorked = {
    id: number
    full_name: string
    phone: string
    role: string
    work_durations: EWorkDuration[]
    check_in: boolean
}

type AttendFields = {
    user: number
    time: string
}

export default function AnimatedCalendar() {
    const [timeSlots, setTimeSlots] = useState<string[]>([])
    const [interval, setInterval] = useState<number>(30) // default 30 min
    const { openModal, closeModal } = useModal()

    const { data: users, refetch } = useGet<EWorked[]>('employees/worked-times')

    useEffect(() => {
        const newTimeSlots = generateTimeSlots(
            dailyData.work_start_date,
            dailyData.work_end_date,
            interval,
        )
        setTimeSlots(newTimeSlots)
    }, [interval])

    const toMinutes = (hm: string) => {
        const [h, m] = hm.split(":").map(Number)
        return h * 60 + m
    }

    const startMinutes = toMinutes(dailyData.work_start_date)
    const endMinutes = toMinutes(dailyData.work_end_date)
    const totalMinutes = endMinutes - startMinutes

    const slotWidth = 80
    const totalWidth = (totalMinutes / interval) * slotWidth
    const rowHeight = 70

    const { mutate, isPending } = usePost()

    const form = useForm<AttendFields>()

    function handleAttend(vals: AttendFields) {
        mutate('employees/attend', vals, {
            onSuccess() {
                form.reset()
                closeModal()
                refetch()
            },
        })
    }

    function toggleAttend(usr: number) {
        const tm = formatDate(new Date(), 'HH:mm')
        form.setValue('user', usr)
        form.setValue("time", tm)
        openModal()
    }


    return (
        <Card>
            <CardContent className="space-y-2 rounded-md p-3">
                <div className="flex">
                    {/* Chap tomonda xodimlar */}
                    <aside className="min-w-[200px] max-w-[200px]">
                        <div className="w-full">
                            <div className="!h-[37px]">
                                <p className="text-muted-foreground text-xl">Xodimlar</p>
                            </div>
                            {users?.map((employe) => (
                                <div key={employe.id}>
                                    <div className="border-b sticky left-0 z-20 border-secondary min-h-[70px]">
                                        <div className="flex flex-col py-2">
                                            <span className="whitespace-nowrap mb-[2px]">
                                                {employe.full_name}
                                            </span>
                                            <span className="whitespace-nowrap text-muted-foreground capitalize">
                                                {employe.role}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>

                    <div className="overflow-hidden">
                        <AnimatePresence mode="wait" custom={"forward"}>
                            <motion.div
                                key="day"
                                custom={"forward"}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.15, ease: "easeInOut" }}
                                className="w-full h-full"
                            >
                                <section className="w-full overflow-x-auto">
                                    <div className="flex items-center" style={{ width: totalWidth }}>
                                        {timeSlots.map((slot, index) => (
                                            <div
                                                key={index}
                                                className="text-start flex items-center min-w-[80px] border-r pl-2 pb-2 pt-1"
                                                style={{ width: `${slotWidth}px` }}
                                            >
                                                <span>{slot}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="w-full">
                                        {users?.map((room) => {
                                            const lsns = room.work_durations

                                            return (
                                                <div
                                                    key={room.id}
                                                    className="relative border-b border-secondary w-full"
                                                    style={{
                                                        height: rowHeight,
                                                        width: totalWidth,
                                                    }}
                                                >
                                                    {/* Vertical grid lines */}
                                                    {timeSlots.map((t, idx) => (
                                                        <div
                                                            key={t}
                                                            className="absolute top-0 bottom-0 border-l border-gray-300/30 pointer-events-none z-0"
                                                            style={{
                                                                left: `${idx * slotWidth - 1}px`,
                                                                width: `${slotWidth}px`,
                                                            }}
                                                        />
                                                    ))}

                                                    {/* bookings */}
                                                    {lsns.map((booking, i) => {
                                                        const startTime = booking.check_in?.slice(0, 5)
                                                        const endTime = (booking.check_out ?? '20:00')?.slice(0, 5)
                                                        const start = toMinutes(startTime) - startMinutes
                                                        const end = toMinutes(endTime) - startMinutes

                                                        const left = (start / totalMinutes) * totalWidth
                                                        const width =
                                                            ((end - start) / totalMinutes) * totalWidth

                                                        return (
                                                            <div
                                                                key={booking.id}
                                                                className="absolute text-xs p-1 z-10 flex items-center"
                                                                style={{
                                                                    left: `${left}px`,
                                                                    width: `${width}px`,
                                                                    height: `${rowHeight}px`,
                                                                }}
                                                            >
                                                                <div className="w-full bg-background">
                                                                    <div
                                                                        className={cn("text-xs min-h-[30px] p-1 flex items-center justify-center font-extralight bg-primary/20 w-full rounded", !booking.check_out && "bg-orange-400/10")}
                                                                    >
                                                                        <div className="flex items-start justify-between text-[14px] whitespace-nowrap w-full px-2 gap-1">
                                                                            <span>
                                                                                {startTime}
                                                                            </span>
                                                                            {booking.check_out && <span>
                                                                                {endTime}
                                                                            </span>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </section>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* O‘ng tomonda tugmalar */}
                    <aside className="min-w-[80px] max-w-[80px] bg-transparent border-l">
                        <div className="w-full flex flex-col items-center">
                            <div className="!h-[37px]"></div>
                            {users?.map((employe) => (
                                <div key={employe.id} className="bg-card">
                                    <div className="sticky left-0 z-20 border-secondary">
                                        <div className="min-h-[70px] flex items-center justify-start">
                                            <Button size="sm" className={cn(!employe.check_in ? "bg-red-500/20 text-red-500 hover:bg-red-500/30" : "", "w-full")} onClick={() => toggleAttend(employe.id)}>
                                                {employe.check_in ? "Kirish" : "Chiqish"}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>
                </div>
            </CardContent>

            <Modal size="max-w-md" title="Ketuvni tasdiqlash">
                <form className="pt-3" onSubmit={form.handleSubmit(handleAttend)}>
                    <FormTimeInput methods={form} name="time" className="text-center" />
                    <Button className="w-full mt-4" loading={isPending}>Tasdiqlash</Button>
                </form>
            </Modal>
        </Card>
    )
}
