import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { dailyData, data } from "."
import FullCalendarEmployees from "./full-calendar"
import DailyCalendarEmployees from "./daily-attendance"

type View = "month" | "day"

export default function App() {
    const [view, setView] = useState<View>("month")
    const [direction, setDirection] = useState<"forward" | "backward">(
        "forward",
    )

    const handleToggle = (v: View) => {
        if (v === "month") {
            setDirection("forward")
            setView("day")
        } else {
            setDirection("backward")
            setView("month")
        }
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

    return (
        <div className="p-4 h-screen w-full overflow-hidden relative bg-background">
            <button
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded z-10 relative"
                onClick={() => handleToggle("month")}
            >
                Toggle View
            </button>

            <div className="w-full h-full relative overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                    {view === "month" ?
                        <motion.div
                            key="month"
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="absolute top-0 left-0 right-0 w-full h-full"
                        >
                            <FullCalendarEmployees data={data} />
                        </motion.div>
                    :   <motion.div
                            key="day"
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="absolute top-0 left-0 right-0 w-full h-full"
                        >
                            <DailyCalendarEmployees
                                rooms={dailyData.room_list}
                                work={dailyData.work_time}
                                work_start_date={dailyData.work_start_date}
                                work_end_date={dailyData.work_end_date}
                            />
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}
