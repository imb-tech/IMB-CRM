import Modal from "@/components/custom/modal"
import ExamForm from "./exam-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import TaskForm from "./task-form"
import ThemeForm from "./theme-form"
import Select from "@/components/ui/select"
import { useStore } from "@/hooks/use-store"

export default function GroupTabs() {
    const { store } = useStore<string>("day")
    const [tab, setTab] = useState(store ? store : "theme")
    return (
        <Modal modalKey="day" size={tab == "theme" ? "max-w-4xl" : "max-w-4xl"}>
            <Tabs
                value={tab}
                onValueChange={(v) => setTab(v)}
            >
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
                    <ExamForm />
                </TabsContent>

                <TabsContent value="task">
                    <TaskForm />
                </TabsContent>

                <TabsContent value="theme">
                    <ThemeForm />
                </TabsContent>
            </Tabs>
        </Modal>
    )
}
