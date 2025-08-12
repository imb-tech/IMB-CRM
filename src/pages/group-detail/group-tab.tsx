import Modal from "@/components/custom/modal"
import ExamForm from "./exam-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import TaskForm from "./task-form"
import ThemeForm from "./theme-form"

export default function GroupTabs() {
    const [tab, setTab] = useState("theme")
    return (
        <Modal modalKey="day" size={tab == "theme" ? "max-w-4xl" : "max-w-4xl"}>
            <Tabs value={tab} onValueChange={(v) => setTab(v)}>
                <TabsList>
                    <TabsTrigger value="theme">Mavzu</TabsTrigger>
                    <TabsTrigger value="task">Vazifa</TabsTrigger>
                    <TabsTrigger value="exam">Imtixon</TabsTrigger>
                </TabsList>
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
