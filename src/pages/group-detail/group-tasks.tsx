import { Card, CardContent } from "@/components/ui/card"
import SectionHeader from "@/components/elements/section-header"
import { cn } from "@/lib/utils"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Pencil, Plus, Trash } from "lucide-react"
import ExamDetail from "./exam-detail"
import { useModal } from "@/hooks/useModal"
import GroupTabs from "./group-tab"
import { Button } from "@/components/ui/button"
import DeleteModal from "@/components/custom/delete-modal"
import { useStore } from "@/hooks/use-store"

export default function GroupTasks() {
    const data = ["Mavzu", "Vazifa", "Imtixon"]
    const navigate = useNavigate()
    const { openModal } = useModal("day")
    const { setStore } = useStore("day")
    const { openModal: openDelete } = useModal("delete")

    const { id } = useSearch({ strict: false })

    return (
        <div className="w-full">
            <div className="max-w-full mx-auto h-full">
                <SectionHeader title="Vazifalar" />
                <Card className="grid grid-cols-2 ">
                    <CardContent className="p-0">
                        <ScrollArea>
                            <div className="flex flex-col gap-2 pr-5">
                                {Array(10)
                                    .fill(0)
                                    .map((_, i) => (
                                        <div
                                            className={cn(
                                                "flex gap-2 text-xs font-light items-start",
                                            )}
                                            key={i}
                                        >
                                            <div
                                                className={cn(
                                                    "flex flex-col items-center gap-1 py-2 px-3 justify-center rounded-md bg-secondary/70",
                                                    i < 3 && i > 0 ?
                                                        "opacity-0 select-none"
                                                    :   "",
                                                )}
                                            >
                                                <p className="text-3xl">
                                                    {11 - i}
                                                </p>
                                                <p>Dushanba</p>
                                                <button
                                                    className="bg-primary/10 px-1 rounded-sm mt-1 opacity-0"
                                                    onClick={openModal}
                                                >
                                                    <Plus
                                                        className="text-primary"
                                                        size={7}
                                                    />
                                                </button>
                                            </div>
                                            <div className="flex-1 flex flex-col gap-2">
                                                <div
                                                    className={cn(
                                                        "rounded-md bg-secondary/70 flex py-3 pl-3 border cursor-pointer flex-1 transition-all duration-150 hover:scale-[101%]",
                                                        i == Number(id) ?
                                                            "border-green-500/60"
                                                        :   "border-transparent",
                                                    )}
                                                    onClick={() =>
                                                        navigate({
                                                            search: {
                                                                id: i,
                                                            } as any,
                                                        })
                                                    }
                                                >
                                                    <span
                                                        className={cn(
                                                            "flex h-[70px] w-[3px] bg-green-500 rounded-sm",
                                                            i === 2 || i === 1 ?
                                                                "bg-rose-500"
                                                            :   "",
                                                        )}
                                                    ></span>
                                                    <div className="flex flex-col px-3 gap-1 text-xs flex-1">
                                                        <div className="flex items-center text-sm">
                                                            <p className="w-16 text-muted-foreground">
                                                                {data?.[i] ||
                                                                    "Mavzu"}
                                                                :
                                                            </p>
                                                            <p className="flex-1">
                                                                Sonli
                                                                ketma-ketliklar
                                                                va ular bilan
                                                                amallar
                                                            </p>
                                                            <p>11:00 - 12:20</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-muted-foreground w-[56px]">
                                                                O'qituvchi:
                                                            </p>
                                                            <p>YUSUPOV D.T</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-muted-foreground w-[56px]">
                                                                Xona:
                                                            </p>
                                                            <p className="flex-1">
                                                                305 / A bino
                                                            </p>
                                                            <div className="flex items-center gap-2">
                                                                <Pencil
                                                                    size={16}
                                                                    className="text-primary"
                                                                    onClick={(
                                                                        e,
                                                                    ) => {
                                                                        e.stopPropagation()
                                                                        e.preventDefault()
                                                                        setStore(
                                                                            "task",
                                                                        )
                                                                        openModal()
                                                                    }}
                                                                />
                                                                <Trash
                                                                    onClick={(
                                                                        e,
                                                                    ) => {
                                                                        e.stopPropagation()
                                                                        e.preventDefault()
                                                                        openDelete()
                                                                    }}
                                                                    size={16}
                                                                    className="text-rose-500"
                                                                />
                                                            </div>
                                                        </div>
                                                        {i == 0 && (
                                                            <div className="flex items-center gap-2">
                                                                <p className="text-muted-foreground min-w-[56px]">
                                                                    Baholash:
                                                                </p>
                                                                <div className="text-green-500 flex items-center gap-2 w-full">
                                                                    <p>9/11</p>
                                                                    <div className="flex-1 bg-background rounded-md">
                                                                        <span className="w-[75%] block h-[5px] bg-green-500 rounded-md"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                {i >= 2 && (
                                                    <Button
                                                        className="w-full mb-2"
                                                        size="sm"
                                                        variant="secondary"
                                                        onClick={openModal}
                                                    >
                                                        <Plus />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <ScrollBar
                                orientation="horizontal"
                                className="sm:hidden"
                            />
                        </ScrollArea>
                    </CardContent>
                    <CardContent className="flex flex-col gap-5 p-0">
                        <ExamDetail />
                    </CardContent>
                </Card>

                <DeleteModal id={1} path="Vazifa" />
            </div>

            <GroupTabs />
        </div>
    )
}
