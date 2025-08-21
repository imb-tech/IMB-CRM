import Modal from "@/components/custom/modal"
import ExamForm from "./exam-form"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { useState } from "react"
import TaskForm from "./task-form"
import ThemeForm from "./theme-form"
import Select from "@/components/ui/select"
import { useStore } from "@/hooks/use-store"
import { useModal } from "@/hooks/useModal"

export default function GroupTabs({ refetch }: { refetch: () => void }) {
    const { store, remove } = useStore<string>("day")
    const [tab, setTab] = useState(store ? store : "theme")
    const { closeModal } = useModal("day")

    function onSuccess() {
        remove()
        closeModal()
        refetch()
    }
    return (
        <Modal modalKey="day" size={tab == "theme" ? "max-w-4xl" : "max-w-4xl"}>
            <Tabs value={tab} onValueChange={(v) => setTab(v)}>
                {store ?
                    ""
                :   <Select
                        className="w-40 h-8 sm:h-10"
                        label=""
                        options={[
                            { value: "theme", label: "Mavzu" },
                            { value: "task", label: "Vazifa" },
                            { value: "exam", label: "Imtixon" },
                        ]}
                        value={tab}
                        setValue={(value) => setTab(value)}
                    />
                }
                <input className="sr-only" autoFocus />

                <TabsContent value="exam">
                    <ExamForm onSuccess={onSuccess} />
                </TabsContent>

                <TabsContent value="task">
                    <TaskForm onSuccess={onSuccess} />
                </TabsContent>

                <TabsContent value="theme">
                    <ThemeForm onSuccess={onSuccess} />
                </TabsContent>
            </Tabs>
        </Modal>
    )
}
