import Modal from "@/components/custom/modal"
import { Button } from "@/components/ui/button"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { useStorage } from "@/hooks/useStorage"
import PageLayout from "@/layouts/page-layout"
import LeadsMain from "@/pages/leads"
import CreateDepartment from "@/pages/leads/create-department"
import { pipelineUrl } from "@/pages/leads/lead-deal-selector"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { FolderPlus, Plus } from "lucide-react"
import { useEffect, useRef } from "react"

export const Route = createFileRoute("/_main/leads/varonka/")({
    component: RouteComponent,
})

function RouteComponent() {
    const pipeline = useStorage("pipeline")
    const { openModal } = useModal("create-pip-pipeline")
    const navigate = useNavigate()
    const { data, isSuccess, isFetched } =
        useGet<{ id: number; name: string }[]>(pipelineUrl)

    const hasLeads = isSuccess && !!data?.length

    const hasNavigated = useRef(false)

    useEffect(() => {
        if (isFetched && !!data?.length && !hasNavigated.current) {
            const availableIds = data.map((item) => item.id)
            const pipelineId =
                pipeline && availableIds.includes(Number(pipeline))
                    ? Number(pipeline)
                    : data[0].id
            hasNavigated.current = true

            navigate({
                to: "/leads/varonka/$id",
                params: { id: String(pipelineId) },
                search: { pipeline: pipelineId },
                replace: true,
            })

            localStorage.setItem("pipeline", JSON.stringify(pipelineId))
        }
    }, [isFetched, data, navigate, pipeline])

    return (
        <PageLayout
            navOnHeader={hasLeads}
            className={"overflow-x-auto !overflow-y-hidden px-1 sm:px-4 "}
        >
            {hasLeads && <LeadsMain />}

            {isFetched && !hasLeads && (
                <div
                    className="relative h-full bg-cover bg-center rounded-lg p-8 b"
                    style={{
                        backgroundImage: `url(/task/task-bg.jpg)`,
                    }}
                >
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px]" />

                    <div className="relative z-10 flex flex-col items-center justify-center h-[80%] text-center">
                        <div className="w-32 h-32 mb-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <FolderPlus className="w-16 h-16 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            Lidlar boshqaruvini boshlang!
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-md text-balance">
                            Lidlaringizni tartibli boshqarish uchun ularni
                            alohida bo'limlarga ajrating.
                        </p>
                        <Button
                            onClick={openModal}
                            className="py-3 h-12 text-[16px] px-8"
                        >
                            <Plus className="w-6 h-6 mr-2" />
                            Birinchi bo'limni yaratish
                        </Button>
                    </div>
                </div>
            )}
            <Modal
                modalKey="create-pip-pipeline"
                title={`Yangi bo'lim qo'shish`}
            >
                <CreateDepartment item={null} />
            </Modal>
        </PageLayout>
    )
}
